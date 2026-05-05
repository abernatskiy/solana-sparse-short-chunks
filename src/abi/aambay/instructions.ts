import {address, bool, fixedArray, i64, option, struct, u16, u64, unit} from '@subsquid/borsh'
import {instruction} from '../abi.support'
import {OptionBool} from './types'

/**
 * Overrides the coin creator for a canonical pump pool
 */
export interface AdminSetCoinCreator {
    coinCreator: string
}

/**
 * Overrides the coin creator for a canonical pump pool
 */
export const adminSetCoinCreator = instruction(
    {
        d8: '0xf228759149606968',
    },
    {
        adminSetCoinCreatorAuthority: 0,
        globalConfig: 1,
        pool: 2,
        eventAuthority: 3,
        program: 4,
    },
    struct({
        coinCreator: address,
    }),
)

export interface AdminUpdateTokenIncentives {
    startTime: bigint
    endTime: bigint
    secondsInADay: bigint
    dayNumber: bigint
    tokenSupplyPerDay: bigint
}

export const adminUpdateTokenIncentives = instruction(
    {
        d8: '0xd10b7357d5177ccc',
    },
    {
        admin: 0,
        globalConfig: 1,
        globalVolumeAccumulator: 2,
        mint: 3,
        globalIncentiveTokenAccount: 4,
        associatedTokenProgram: 5,
        systemProgram: 6,
        tokenProgram: 7,
        eventAuthority: 8,
        program: 9,
    },
    struct({
        startTime: i64,
        endTime: i64,
        secondsInADay: i64,
        dayNumber: u64,
        tokenSupplyPerDay: u64,
    }),
)

/**
 * For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].
 * If provided and valid, the ATA will be initialized if needed.
 */
export interface Buy {
    baseAmountOut: bigint
    maxQuoteAmountIn: bigint
    trackVolume: OptionBool
}

/**
 * For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].
 * If provided and valid, the ATA will be initialized if needed.
 */
export const buy = instruction(
    {
        d8: '0x66063d1201daebea',
    },
    {
        pool: 0,
        user: 1,
        globalConfig: 2,
        baseMint: 3,
        quoteMint: 4,
        userBaseTokenAccount: 5,
        userQuoteTokenAccount: 6,
        poolBaseTokenAccount: 7,
        poolQuoteTokenAccount: 8,
        protocolFeeRecipient: 9,
        protocolFeeRecipientTokenAccount: 10,
        baseTokenProgram: 11,
        quoteTokenProgram: 12,
        systemProgram: 13,
        associatedTokenProgram: 14,
        eventAuthority: 15,
        program: 16,
        coinCreatorVaultAta: 17,
        coinCreatorVaultAuthority: 18,
        globalVolumeAccumulator: 19,
        userVolumeAccumulator: 20,
        feeConfig: 21,
        feeProgram: 22,
    },
    struct({
        baseAmountOut: u64,
        maxQuoteAmountIn: u64,
        trackVolume: OptionBool,
    }),
)

/**
 * Given a budget of spendable_quote_in, buy at least min_base_amount_out
 * Fees will be deducted from spendable_quote_in
 * 
 * f(quote) = tokens, where tokens >= min_base_amount_out
 * 
 * Make sure the payer has enough SOL to cover creation of the following accounts (unless already created):
 * - protocol_fee_recipient_token_account: rent.minimum_balance(TokenAccount::LEN)
 * - coin_creator_vault_ata: rent.minimum_balance(TokenAccount::LEN)
 * - user_volume_accumulator: rent.minimum_balance(UserVolumeAccumulator::LEN)
 * 
 * For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].
 * If provided and valid, the ATA will be initialized if needed.
 */
export interface BuyExactQuoteIn {
    spendableQuoteIn: bigint
    minBaseAmountOut: bigint
    trackVolume: OptionBool
}

/**
 * Given a budget of spendable_quote_in, buy at least min_base_amount_out
 * Fees will be deducted from spendable_quote_in
 * 
 * f(quote) = tokens, where tokens >= min_base_amount_out
 * 
 * Make sure the payer has enough SOL to cover creation of the following accounts (unless already created):
 * - protocol_fee_recipient_token_account: rent.minimum_balance(TokenAccount::LEN)
 * - coin_creator_vault_ata: rent.minimum_balance(TokenAccount::LEN)
 * - user_volume_accumulator: rent.minimum_balance(UserVolumeAccumulator::LEN)
 * 
 * For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].
 * If provided and valid, the ATA will be initialized if needed.
 */
export const buyExactQuoteIn = instruction(
    {
        d8: '0xc62e1552b4d9e870',
    },
    {
        pool: 0,
        user: 1,
        globalConfig: 2,
        baseMint: 3,
        quoteMint: 4,
        userBaseTokenAccount: 5,
        userQuoteTokenAccount: 6,
        poolBaseTokenAccount: 7,
        poolQuoteTokenAccount: 8,
        protocolFeeRecipient: 9,
        protocolFeeRecipientTokenAccount: 10,
        baseTokenProgram: 11,
        quoteTokenProgram: 12,
        systemProgram: 13,
        associatedTokenProgram: 14,
        eventAuthority: 15,
        program: 16,
        coinCreatorVaultAta: 17,
        coinCreatorVaultAuthority: 18,
        globalVolumeAccumulator: 19,
        userVolumeAccumulator: 20,
        feeConfig: 21,
        feeProgram: 22,
    },
    struct({
        spendableQuoteIn: u64,
        minBaseAmountOut: u64,
        trackVolume: OptionBool,
    }),
)

export type ClaimCashback = undefined

export const claimCashback = instruction(
    {
        d8: '0x253a237ebe35e4c5',
    },
    {
        user: 0,
        userVolumeAccumulator: 1,
        quoteMint: 2,
        quoteTokenProgram: 3,
        userVolumeAccumulatorWsolTokenAccount: 4,
        userWsolTokenAccount: 5,
        systemProgram: 6,
        eventAuthority: 7,
        program: 8,
    },
    unit,
)

export type ClaimTokenIncentives = undefined

export const claimTokenIncentives = instruction(
    {
        d8: '0x1004471ccc01281b',
    },
    {
        user: 0,
        userAta: 1,
        globalVolumeAccumulator: 2,
        globalIncentiveTokenAccount: 3,
        userVolumeAccumulator: 4,
        mint: 5,
        tokenProgram: 6,
        systemProgram: 7,
        associatedTokenProgram: 8,
        eventAuthority: 9,
        program: 10,
        payer: 11,
    },
    unit,
)

export type CloseUserVolumeAccumulator = undefined

export const closeUserVolumeAccumulator = instruction(
    {
        d8: '0xf945a4da9667548a',
    },
    {
        user: 0,
        userVolumeAccumulator: 1,
        eventAuthority: 2,
        program: 3,
    },
    unit,
)

export type CollectCoinCreatorFee = undefined

export const collectCoinCreatorFee = instruction(
    {
        d8: '0xa039592ab58b2b42',
    },
    {
        quoteMint: 0,
        quoteTokenProgram: 1,
        coinCreator: 2,
        coinCreatorVaultAuthority: 3,
        coinCreatorVaultAta: 4,
        coinCreatorTokenAccount: 5,
        eventAuthority: 6,
        program: 7,
    },
    unit,
)

export interface CreateConfig {
    lpFeeBasisPoints: bigint
    protocolFeeBasisPoints: bigint
    protocolFeeRecipients: Array<string>
    coinCreatorFeeBasisPoints: bigint
    adminSetCoinCreatorAuthority: string
}

export const createConfig = instruction(
    {
        d8: '0xc9cff3724b6f2fbd',
    },
    {
        admin: 0,
        globalConfig: 1,
        systemProgram: 2,
        eventAuthority: 3,
        program: 4,
    },
    struct({
        lpFeeBasisPoints: u64,
        protocolFeeBasisPoints: u64,
        protocolFeeRecipients: fixedArray(address, 8),
        coinCreatorFeeBasisPoints: u64,
        adminSetCoinCreatorAuthority: address,
    }),
)

export interface CreatePool {
    index: number
    baseAmountIn: bigint
    quoteAmountIn: bigint
    coinCreator: string
    isMayhemMode: boolean
    isCashbackCoin: OptionBool
}

export const createPool = instruction(
    {
        d8: '0xe992d18ecf6840bc',
    },
    {
        pool: 0,
        globalConfig: 1,
        creator: 2,
        baseMint: 3,
        quoteMint: 4,
        lpMint: 5,
        userBaseTokenAccount: 6,
        userQuoteTokenAccount: 7,
        userPoolTokenAccount: 8,
        poolBaseTokenAccount: 9,
        poolQuoteTokenAccount: 10,
        systemProgram: 11,
        token2022Program: 12,
        baseTokenProgram: 13,
        quoteTokenProgram: 14,
        associatedTokenProgram: 15,
        eventAuthority: 16,
        program: 17,
    },
    struct({
        index: u16,
        baseAmountIn: u64,
        quoteAmountIn: u64,
        coinCreator: address,
        isMayhemMode: bool,
        isCashbackCoin: OptionBool,
    }),
)

export interface Deposit {
    lpTokenAmountOut: bigint
    maxBaseAmountIn: bigint
    maxQuoteAmountIn: bigint
}

export const deposit = instruction(
    {
        d8: '0xf223c68952e1f2b6',
    },
    {
        pool: 0,
        globalConfig: 1,
        user: 2,
        baseMint: 3,
        quoteMint: 4,
        lpMint: 5,
        userBaseTokenAccount: 6,
        userQuoteTokenAccount: 7,
        userPoolTokenAccount: 8,
        poolBaseTokenAccount: 9,
        poolQuoteTokenAccount: 10,
        tokenProgram: 11,
        token2022Program: 12,
        eventAuthority: 13,
        program: 14,
    },
    struct({
        lpTokenAmountOut: u64,
        maxBaseAmountIn: u64,
        maxQuoteAmountIn: u64,
    }),
)

export interface Disable {
    disableCreatePool: boolean
    disableDeposit: boolean
    disableWithdraw: boolean
    disableBuy: boolean
    disableSell: boolean
}

export const disable = instruction(
    {
        d8: '0xb9adbb5ad80feee9',
    },
    {
        admin: 0,
        globalConfig: 1,
        eventAuthority: 2,
        program: 3,
    },
    struct({
        disableCreatePool: bool,
        disableDeposit: bool,
        disableWithdraw: bool,
        disableBuy: bool,
        disableSell: bool,
    }),
)

export type ExtendAccount = undefined

export const extendAccount = instruction(
    {
        d8: '0xea66c2cb96483ee5',
    },
    {
        account: 0,
        user: 1,
        systemProgram: 2,
        eventAuthority: 3,
        program: 4,
    },
    unit,
)

export type InitUserVolumeAccumulator = undefined

export const initUserVolumeAccumulator = instruction(
    {
        d8: '0x5e06ca73ff60e8b7',
    },
    {
        payer: 0,
        user: 1,
        userVolumeAccumulator: 2,
        systemProgram: 3,
        eventAuthority: 4,
        program: 5,
    },
    unit,
)

/**
 * Migrate Pool Coin Creator to Sharing Config
 */
export type MigratePoolCoinCreator = undefined

/**
 * Migrate Pool Coin Creator to Sharing Config
 */
export const migratePoolCoinCreator = instruction(
    {
        d8: '0xd0089f044aaf103a',
    },
    {
        pool: 0,
        sharingConfig: 1,
        eventAuthority: 2,
        program: 3,
    },
    unit,
)

export interface Sell {
    baseAmountIn: bigint
    minQuoteAmountOut: bigint
}

export const sell = instruction(
    {
        d8: '0x33e685a4017f83ad',
    },
    {
        pool: 0,
        user: 1,
        globalConfig: 2,
        baseMint: 3,
        quoteMint: 4,
        userBaseTokenAccount: 5,
        userQuoteTokenAccount: 6,
        poolBaseTokenAccount: 7,
        poolQuoteTokenAccount: 8,
        protocolFeeRecipient: 9,
        protocolFeeRecipientTokenAccount: 10,
        baseTokenProgram: 11,
        quoteTokenProgram: 12,
        systemProgram: 13,
        associatedTokenProgram: 14,
        eventAuthority: 15,
        program: 16,
        coinCreatorVaultAta: 17,
        coinCreatorVaultAuthority: 18,
        feeConfig: 19,
        feeProgram: 20,
    },
    struct({
        baseAmountIn: u64,
        minQuoteAmountOut: u64,
    }),
)

/**
 * Sets Pool::coin_creator from Metaplex metadata creator or BondingCurve::creator
 */
export type SetCoinCreator = undefined

/**
 * Sets Pool::coin_creator from Metaplex metadata creator or BondingCurve::creator
 */
export const setCoinCreator = instruction(
    {
        d8: '0xd295802dbc3a4eaf',
    },
    {
        pool: 0,
        metadata: 1,
        bondingCurve: 2,
        eventAuthority: 3,
        program: 4,
    },
    unit,
)

export interface SetReservedFeeRecipients {
    whitelistPda: string
}

export const setReservedFeeRecipients = instruction(
    {
        d8: '0x6faca2e87259d58e',
    },
    {
        globalConfig: 0,
        admin: 1,
        eventAuthority: 2,
        program: 3,
    },
    struct({
        whitelistPda: address,
    }),
)

export type SyncUserVolumeAccumulator = undefined

export const syncUserVolumeAccumulator = instruction(
    {
        d8: '0x561fc057a3574fee',
    },
    {
        user: 0,
        globalVolumeAccumulator: 1,
        userVolumeAccumulator: 2,
        eventAuthority: 3,
        program: 4,
    },
    unit,
)

export interface ToggleCashbackEnabled {
    enabled: boolean
}

export const toggleCashbackEnabled = instruction(
    {
        d8: '0x7367e0ffbd5956c3',
    },
    {
        admin: 0,
        globalConfig: 1,
        eventAuthority: 2,
        program: 3,
    },
    struct({
        enabled: bool,
    }),
)

export interface ToggleMayhemMode {
    enabled: boolean
}

export const toggleMayhemMode = instruction(
    {
        d8: '0x01096fd0641fffa3',
    },
    {
        admin: 0,
        globalConfig: 1,
        eventAuthority: 2,
        program: 3,
    },
    struct({
        enabled: bool,
    }),
)

/**
 * Transfer creator fees to pump creator vault
 * If coin creator fees are currently below rent.minimum_balance(TokenAccount::LEN)
 * The transfer will be skipped
 */
export type TransferCreatorFeesToPump = undefined

/**
 * Transfer creator fees to pump creator vault
 * If coin creator fees are currently below rent.minimum_balance(TokenAccount::LEN)
 * The transfer will be skipped
 */
export const transferCreatorFeesToPump = instruction(
    {
        d8: '0x8b348655e4e56cf1',
    },
    {
        /**
         * Pump Canonical Pool are quoted in wSOL
         */
        wsolMint: 0,
        tokenProgram: 1,
        systemProgram: 2,
        associatedTokenProgram: 3,
        coinCreator: 4,
        coinCreatorVaultAuthority: 5,
        coinCreatorVaultAta: 6,
        pumpCreatorVault: 7,
        eventAuthority: 8,
        program: 9,
    },
    unit,
)

export type UpdateAdmin = undefined

export const updateAdmin = instruction(
    {
        d8: '0xa1b028d53cb8b3e4',
    },
    {
        admin: 0,
        globalConfig: 1,
        newAdmin: 2,
        eventAuthority: 3,
        program: 4,
    },
    unit,
)

export interface UpdateBuybackConfig {
    buybackBasisPoints?: bigint | undefined
}

export const updateBuybackConfig = instruction(
    {
        d8: '0xfbe0ab92a01a71e9',
    },
    {
        admin: 0,
        globalConfig: 1,
        eventAuthority: 2,
        program: 3,
    },
    struct({
        buybackBasisPoints: option(u64),
    }),
)

export interface UpdateFeeConfig {
    lpFeeBasisPoints: bigint
    protocolFeeBasisPoints: bigint
    protocolFeeRecipients: Array<string>
    coinCreatorFeeBasisPoints: bigint
    adminSetCoinCreatorAuthority: string
}

export const updateFeeConfig = instruction(
    {
        d8: '0x68b867f258976b14',
    },
    {
        admin: 0,
        globalConfig: 1,
        eventAuthority: 2,
        program: 3,
    },
    struct({
        lpFeeBasisPoints: u64,
        protocolFeeBasisPoints: u64,
        protocolFeeRecipients: fixedArray(address, 8),
        coinCreatorFeeBasisPoints: u64,
        adminSetCoinCreatorAuthority: address,
    }),
)

export interface Withdraw {
    lpTokenAmountIn: bigint
    minBaseAmountOut: bigint
    minQuoteAmountOut: bigint
}

export const withdraw = instruction(
    {
        d8: '0xb712469c946da122',
    },
    {
        pool: 0,
        globalConfig: 1,
        user: 2,
        baseMint: 3,
        quoteMint: 4,
        lpMint: 5,
        userBaseTokenAccount: 6,
        userQuoteTokenAccount: 7,
        userPoolTokenAccount: 8,
        poolBaseTokenAccount: 9,
        poolQuoteTokenAccount: 10,
        tokenProgram: 11,
        token2022Program: 12,
        eventAuthority: 13,
        program: 14,
    },
    struct({
        lpTokenAmountIn: u64,
        minBaseAmountOut: u64,
        minQuoteAmountOut: u64,
    }),
)
