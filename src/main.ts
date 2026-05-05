import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/solana-objects'
import {DataSourceBuilder} from '@subsquid/solana-stream'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import assert from 'assert'
import * as tokenProgram from './abi/token-program'
import * as aambay from './abi/aambay'
import {Exchange} from './model'

// First we create a DataSource - component,
// that defines where to get the data and what data should we get.
const dataSource = new DataSourceBuilder()
  // Provide a Subsquid Network Portal URL.
  .setPortal({
    url: 'https://portal.sqd.dev/datasets/solana-mainnet',
    http: {
      retryAttempts: Infinity
    }
  })
  // Make sure that this block is above the first block
  // of the solana-mainnet dataset!
  // Find out the current first slot from
  //   curl https://portal.sqd.dev/datasets/solana-mainnet/metadata
  .setBlockRange({from: 400021385})
  .setFields({
    block: { // block header fields
      timestamp: true
    },
    transaction: { // transaction fields
      signatures: true
    },
    instruction: { // instruction fields
      programId: true,
      accounts: true,
      data: true
    },
    tokenBalance: { // token balance record fields
      preAmount: true,
      postAmount: true,
      preOwner: true,
      postOwner: true
    }
  })
  // By default, block can be skipped if it doesn't contain explicitly requested items.
  //
  // We request items via `.addXxx()` methods.
  //
  // Each `.addXxx()` method accepts item selection criteria
  // and also allows to request related items.
  //
  .addInstruction({
    // select instructions, that:
    where: {
      programId: [aambay.programId], // where executed by Whirlpool program
      d8: [aambay.instructions.createPool.d8], // have first 8 bytes of .data equal to swap descriptor
      isCommitted: true // where successfully committed
    },
    // for each instruction selected above
    // make sure to also include:
    include: {
      transactionTokenBalances: true, // all token balance records of executed transaction
    }
  })
  .build()

const database = new TypeormDatabase({supportHotBlocks: true})

run(dataSource, database, async ctx => {
  let blocks = ctx.blocks.map(augmentBlock)

  let exchanges: Exchange[] = []

  console.log(`Got ${ctx.blocks.length} blocks`)
/*
  for (let block of blocks) {
    for (let ins of block.instructions) {
      if (ins.programId === aambay.programId && ins.d8 === whirlpool.instructions.swap.d8) {
        let exchange = new Exchange({
          id: ins.id,
          slot: block.header.number,
          tx: ins.getTransaction().signatures[0],
          timestamp: new Date(block.header.timestamp * 1000)
        })

        assert(ins.inner.length == 2)
        let srcTransfer = tokenProgram.instructions.transfer.decode(ins.inner[0])
        let destTransfer = tokenProgram.instructions.transfer.decode(ins.inner[1])

        let srcBalance = ins.getTransaction().tokenBalances.find(tb => tb.account == srcTransfer.accounts.source)
        let destBalance = ins.getTransaction().tokenBalances.find(tb => tb.account === destTransfer.accounts.destination)

        let srcMint = ins.getTransaction().tokenBalances.find(tb => tb.account === srcTransfer.accounts.destination)?.preMint
        let destMint = ins.getTransaction().tokenBalances.find(tb => tb.account === destTransfer.accounts.source)?.preMint

        assert(srcMint)
        assert(destMint)

        exchange.fromToken = srcMint
        exchange.fromOwner = srcBalance?.preOwner || srcTransfer.accounts.source
        exchange.fromAmount = srcTransfer.data.amount

        exchange.toToken = destMint
        exchange.toOwner = destBalance?.postOwner || destBalance?.preOwner || destTransfer.accounts.destination
        exchange.toAmount = destTransfer.data.amount

        exchanges.push(exchange)
      }
    }
  }
*/
//  await ctx.store.insert(exchanges)
})
