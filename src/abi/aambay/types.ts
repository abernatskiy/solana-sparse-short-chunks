import {Codec, address, array, bool, fixedArray, i64, string, struct, sum, tuple, u128, u16, u64, u8, unit} from '@subsquid/borsh'

export interface AdminSetCoinCreatorEvent {
    timestamp: bigint
    adminSetCoinCreatorAuthority: string
    baseMint: string
    pool: string
    oldCoinCreator: string
    newCoinCreator: string
}

export const AdminSetCoinCreatorEvent: Codec<AdminSetCoinCreatorEvent> = struct({
    timestamp: i64,
    adminSetCoinCreatorAuthority: address,
    baseMint: address,
    pool: address,
    oldCoinCreator: address,
    newCoinCreator: address,
})

export interface AdminUpdateTokenIncentivesEvent {
    startTime: bigint
    endTime: bigint
    dayNumber: bigint
    tokenSupplyPerDay: bigint
    mint: string
    secondsInADay: bigint
    timestamp: bigint
}

export const AdminUpdateTokenIncentivesEvent: Codec<AdminUpdateTokenIncentivesEvent> = struct({
    startTime: i64,
    endTime: i64,
    dayNumber: u64,
    tokenSupplyPerDay: u64,
    mint: address,
    secondsInADay: i64,
    timestamp: i64,
})

export interface BondingCurve {
    virtualTokenReserves: bigint
    virtualSolReserves: bigint
    realTokenReserves: bigint
    realSolReserves: bigint
    tokenTotalSupply: bigint
    complete: boolean
    creator: string
    isMayhemMode: boolean
    isCashbackCoin: boolean
}

export const BondingCurve: Codec<BondingCurve> = struct({
    virtualTokenReserves: u64,
    virtualSolReserves: u64,
    realTokenReserves: u64,
    realSolReserves: u64,
    tokenTotalSupply: u64,
    complete: bool,
    creator: address,
    isMayhemMode: bool,
    isCashbackCoin: bool,
})

/**
 * ix_name: "buy" | "buy_exact_quote_in"
 */
export interface BuyEvent {
    timestamp: bigint
    baseAmountOut: bigint
    maxQuoteAmountIn: bigint
    userBaseTokenReserves: bigint
    userQuoteTokenReserves: bigint
    poolBaseTokenReserves: bigint
    poolQuoteTokenReserves: bigint
    quoteAmountIn: bigint
    lpFeeBasisPoints: bigint
    lpFee: bigint
    protocolFeeBasisPoints: bigint
    protocolFee: bigint
    quoteAmountInWithLpFee: bigint
    userQuoteAmountIn: bigint
    pool: string
    user: string
    userBaseTokenAccount: string
    userQuoteTokenAccount: string
    protocolFeeRecipient: string
    protocolFeeRecipientTokenAccount: string
    coinCreator: string
    coinCreatorFeeBasisPoints: bigint
    coinCreatorFee: bigint
    trackVolume: boolean
    totalUnclaimedTokens: bigint
    totalClaimedTokens: bigint
    currentSolVolume: bigint
    lastUpdateTimestamp: bigint
    minBaseAmountOut: bigint
    ixName: string
    cashbackFeeBasisPoints: bigint
    cashback: bigint
    buybackFeeBasisPoints: bigint
    buybackFee: bigint
}

/**
 * ix_name: "buy" | "buy_exact_quote_in"
 */
export const BuyEvent: Codec<BuyEvent> = struct({
    timestamp: i64,
    baseAmountOut: u64,
    maxQuoteAmountIn: u64,
    userBaseTokenReserves: u64,
    userQuoteTokenReserves: u64,
    poolBaseTokenReserves: u64,
    poolQuoteTokenReserves: u64,
    quoteAmountIn: u64,
    lpFeeBasisPoints: u64,
    lpFee: u64,
    protocolFeeBasisPoints: u64,
    protocolFee: u64,
    quoteAmountInWithLpFee: u64,
    userQuoteAmountIn: u64,
    pool: address,
    user: address,
    userBaseTokenAccount: address,
    userQuoteTokenAccount: address,
    protocolFeeRecipient: address,
    protocolFeeRecipientTokenAccount: address,
    coinCreator: address,
    coinCreatorFeeBasisPoints: u64,
    coinCreatorFee: u64,
    trackVolume: bool,
    totalUnclaimedTokens: u64,
    totalClaimedTokens: u64,
    currentSolVolume: u64,
    lastUpdateTimestamp: i64,
    minBaseAmountOut: u64,
    ixName: string,
    cashbackFeeBasisPoints: u64,
    cashback: u64,
    buybackFeeBasisPoints: u64,
    buybackFee: u64,
})

export interface ClaimCashbackEvent {
    user: string
    amount: bigint
    timestamp: bigint
    totalClaimed: bigint
    totalCashbackEarned: bigint
}

export const ClaimCashbackEvent: Codec<ClaimCashbackEvent> = struct({
    user: address,
    amount: u64,
    timestamp: i64,
    totalClaimed: u64,
    totalCashbackEarned: u64,
})

export interface ClaimTokenIncentivesEvent {
    user: string
    mint: string
    amount: bigint
    timestamp: bigint
    totalClaimedTokens: bigint
    currentSolVolume: bigint
}

export const ClaimTokenIncentivesEvent: Codec<ClaimTokenIncentivesEvent> = struct({
    user: address,
    mint: address,
    amount: u64,
    timestamp: i64,
    totalClaimedTokens: u64,
    currentSolVolume: u64,
})

export interface CloseUserVolumeAccumulatorEvent {
    user: string
    timestamp: bigint
    totalUnclaimedTokens: bigint
    totalClaimedTokens: bigint
    currentSolVolume: bigint
    lastUpdateTimestamp: bigint
}

export const CloseUserVolumeAccumulatorEvent: Codec<CloseUserVolumeAccumulatorEvent> = struct({
    user: address,
    timestamp: i64,
    totalUnclaimedTokens: u64,
    totalClaimedTokens: u64,
    currentSolVolume: u64,
    lastUpdateTimestamp: i64,
})

export interface CollectCoinCreatorFeeEvent {
    timestamp: bigint
    coinCreator: string
    coinCreatorFee: bigint
    coinCreatorVaultAta: string
    coinCreatorTokenAccount: string
}

export const CollectCoinCreatorFeeEvent: Codec<CollectCoinCreatorFeeEvent> = struct({
    timestamp: i64,
    coinCreator: address,
    coinCreatorFee: u64,
    coinCreatorVaultAta: address,
    coinCreatorTokenAccount: address,
})

export type ConfigStatus_Paused = undefined

export const ConfigStatus_Paused = unit

export type ConfigStatus_Active = undefined

export const ConfigStatus_Active = unit

export type ConfigStatus = 
    | {
        kind: 'Paused'
        value?: ConfigStatus_Paused
      }
    | {
        kind: 'Active'
        value?: ConfigStatus_Active
      }

export const ConfigStatus: Codec<ConfigStatus> = sum(1, {
    Paused: {
        discriminator: 0,
        value: ConfigStatus_Paused,
    },
    Active: {
        discriminator: 1,
        value: ConfigStatus_Active,
    },
})

export interface CreateConfigEvent {
    timestamp: bigint
    admin: string
    lpFeeBasisPoints: bigint
    protocolFeeBasisPoints: bigint
    protocolFeeRecipients: Array<string>
    coinCreatorFeeBasisPoints: bigint
    adminSetCoinCreatorAuthority: string
}

export const CreateConfigEvent: Codec<CreateConfigEvent> = struct({
    timestamp: i64,
    admin: address,
    lpFeeBasisPoints: u64,
    protocolFeeBasisPoints: u64,
    protocolFeeRecipients: fixedArray(address, 8),
    coinCreatorFeeBasisPoints: u64,
    adminSetCoinCreatorAuthority: address,
})

export interface CreatePoolEvent {
    timestamp: bigint
    index: number
    creator: string
    baseMint: string
    quoteMint: string
    baseMintDecimals: number
    quoteMintDecimals: number
    baseAmountIn: bigint
    quoteAmountIn: bigint
    poolBaseAmount: bigint
    poolQuoteAmount: bigint
    minimumLiquidity: bigint
    initialLiquidity: bigint
    lpTokenAmountOut: bigint
    poolBump: number
    pool: string
    lpMint: string
    userBaseTokenAccount: string
    userQuoteTokenAccount: string
    coinCreator: string
    isMayhemMode: boolean
}

export const CreatePoolEvent: Codec<CreatePoolEvent> = struct({
    timestamp: i64,
    index: u16,
    creator: address,
    baseMint: address,
    quoteMint: address,
    baseMintDecimals: u8,
    quoteMintDecimals: u8,
    baseAmountIn: u64,
    quoteAmountIn: u64,
    poolBaseAmount: u64,
    poolQuoteAmount: u64,
    minimumLiquidity: u64,
    initialLiquidity: u64,
    lpTokenAmountOut: u64,
    poolBump: u8,
    pool: address,
    lpMint: address,
    userBaseTokenAccount: address,
    userQuoteTokenAccount: address,
    coinCreator: address,
    isMayhemMode: bool,
})

export interface DepositEvent {
    timestamp: bigint
    lpTokenAmountOut: bigint
    maxBaseAmountIn: bigint
    maxQuoteAmountIn: bigint
    userBaseTokenReserves: bigint
    userQuoteTokenReserves: bigint
    poolBaseTokenReserves: bigint
    poolQuoteTokenReserves: bigint
    baseAmountIn: bigint
    quoteAmountIn: bigint
    lpMintSupply: bigint
    pool: string
    user: string
    userBaseTokenAccount: string
    userQuoteTokenAccount: string
    userPoolTokenAccount: string
}

export const DepositEvent: Codec<DepositEvent> = struct({
    timestamp: i64,
    lpTokenAmountOut: u64,
    maxBaseAmountIn: u64,
    maxQuoteAmountIn: u64,
    userBaseTokenReserves: u64,
    userQuoteTokenReserves: u64,
    poolBaseTokenReserves: u64,
    poolQuoteTokenReserves: u64,
    baseAmountIn: u64,
    quoteAmountIn: u64,
    lpMintSupply: u64,
    pool: address,
    user: address,
    userBaseTokenAccount: address,
    userQuoteTokenAccount: address,
    userPoolTokenAccount: address,
})

export interface DisableEvent {
    timestamp: bigint
    admin: string
    disableCreatePool: boolean
    disableDeposit: boolean
    disableWithdraw: boolean
    disableBuy: boolean
    disableSell: boolean
}

export const DisableEvent: Codec<DisableEvent> = struct({
    timestamp: i64,
    admin: address,
    disableCreatePool: bool,
    disableDeposit: bool,
    disableWithdraw: bool,
    disableBuy: bool,
    disableSell: bool,
})

export interface ExtendAccountEvent {
    timestamp: bigint
    account: string
    user: string
    currentSize: bigint
    newSize: bigint
}

export const ExtendAccountEvent: Codec<ExtendAccountEvent> = struct({
    timestamp: i64,
    account: address,
    user: address,
    currentSize: u64,
    newSize: u64,
})

export interface Fees {
    lpFeeBps: bigint
    protocolFeeBps: bigint
    creatorFeeBps: bigint
}

export const Fees: Codec<Fees> = struct({
    lpFeeBps: u64,
    protocolFeeBps: u64,
    creatorFeeBps: u64,
})

export interface FeeTier {
    marketCapLamportsThreshold: bigint
    fees: Fees
}

export const FeeTier: Codec<FeeTier> = struct({
    marketCapLamportsThreshold: u128,
    fees: Fees,
})

export interface FeeConfig {
    bump: number
    admin: string
    flatFees: Fees
    feeTiers: Array<FeeTier>
}

export const FeeConfig: Codec<FeeConfig> = struct({
    bump: u8,
    admin: address,
    flatFees: Fees,
    feeTiers: array(FeeTier),
})

export interface GlobalConfig {
    admin: string
    lpFeeBasisPoints: bigint
    protocolFeeBasisPoints: bigint
    disableFlags: number
    protocolFeeRecipients: Array<string>
    coinCreatorFeeBasisPoints: bigint
    adminSetCoinCreatorAuthority: string
    whitelistPda: string
    reservedFeeRecipient: string
    mayhemModeEnabled: boolean
    reservedFeeRecipients: Array<string>
    isCashbackEnabled: boolean
    buybackFeeRecipients: Array<string>
    buybackBasisPoints: bigint
}

export const GlobalConfig: Codec<GlobalConfig> = struct({
    admin: address,
    lpFeeBasisPoints: u64,
    protocolFeeBasisPoints: u64,
    disableFlags: u8,
    protocolFeeRecipients: fixedArray(address, 8),
    coinCreatorFeeBasisPoints: u64,
    adminSetCoinCreatorAuthority: address,
    whitelistPda: address,
    reservedFeeRecipient: address,
    mayhemModeEnabled: bool,
    reservedFeeRecipients: fixedArray(address, 7),
    isCashbackEnabled: bool,
    buybackFeeRecipients: fixedArray(address, 8),
    buybackBasisPoints: u64,
})

export interface GlobalVolumeAccumulator {
    startTime: bigint
    endTime: bigint
    secondsInADay: bigint
    mint: string
    totalTokenSupply: Array<bigint>
    solVolumes: Array<bigint>
}

export const GlobalVolumeAccumulator: Codec<GlobalVolumeAccumulator> = struct({
    startTime: i64,
    endTime: i64,
    secondsInADay: i64,
    mint: address,
    totalTokenSupply: fixedArray(u64, 30),
    solVolumes: fixedArray(u64, 30),
})

export interface InitUserVolumeAccumulatorEvent {
    payer: string
    user: string
    timestamp: bigint
}

export const InitUserVolumeAccumulatorEvent: Codec<InitUserVolumeAccumulatorEvent> = struct({
    payer: address,
    user: address,
    timestamp: i64,
})

export interface MigratePoolCoinCreatorEvent {
    timestamp: bigint
    baseMint: string
    pool: string
    sharingConfig: string
    oldCoinCreator: string
    newCoinCreator: string
}

export const MigratePoolCoinCreatorEvent: Codec<MigratePoolCoinCreatorEvent> = struct({
    timestamp: i64,
    baseMint: address,
    pool: address,
    sharingConfig: address,
    oldCoinCreator: address,
    newCoinCreator: address,
})

export type OptionBool = [
    boolean,
]

export const OptionBool: Codec<OptionBool> = tuple([
    bool,
])

export interface Pool {
    poolBump: number
    index: number
    creator: string
    baseMint: string
    quoteMint: string
    lpMint: string
    poolBaseTokenAccount: string
    poolQuoteTokenAccount: string
    lpSupply: bigint
    coinCreator: string
    isMayhemMode: boolean
    isCashbackCoin: boolean
}

export const Pool: Codec<Pool> = struct({
    poolBump: u8,
    index: u16,
    creator: address,
    baseMint: address,
    quoteMint: address,
    lpMint: address,
    poolBaseTokenAccount: address,
    poolQuoteTokenAccount: address,
    lpSupply: u64,
    coinCreator: address,
    isMayhemMode: bool,
    isCashbackCoin: bool,
})

export interface ReservedFeeRecipientsEvent {
    timestamp: bigint
    reservedFeeRecipient: string
    reservedFeeRecipients: Array<string>
}

export const ReservedFeeRecipientsEvent: Codec<ReservedFeeRecipientsEvent> = struct({
    timestamp: i64,
    reservedFeeRecipient: address,
    reservedFeeRecipients: fixedArray(address, 7),
})

export interface SellEvent {
    timestamp: bigint
    baseAmountIn: bigint
    minQuoteAmountOut: bigint
    userBaseTokenReserves: bigint
    userQuoteTokenReserves: bigint
    poolBaseTokenReserves: bigint
    poolQuoteTokenReserves: bigint
    quoteAmountOut: bigint
    lpFeeBasisPoints: bigint
    lpFee: bigint
    protocolFeeBasisPoints: bigint
    protocolFee: bigint
    quoteAmountOutWithoutLpFee: bigint
    userQuoteAmountOut: bigint
    pool: string
    user: string
    userBaseTokenAccount: string
    userQuoteTokenAccount: string
    protocolFeeRecipient: string
    protocolFeeRecipientTokenAccount: string
    coinCreator: string
    coinCreatorFeeBasisPoints: bigint
    coinCreatorFee: bigint
    cashbackFeeBasisPoints: bigint
    cashback: bigint
    buybackFeeBasisPoints: bigint
    buybackFee: bigint
}

export const SellEvent: Codec<SellEvent> = struct({
    timestamp: i64,
    baseAmountIn: u64,
    minQuoteAmountOut: u64,
    userBaseTokenReserves: u64,
    userQuoteTokenReserves: u64,
    poolBaseTokenReserves: u64,
    poolQuoteTokenReserves: u64,
    quoteAmountOut: u64,
    lpFeeBasisPoints: u64,
    lpFee: u64,
    protocolFeeBasisPoints: u64,
    protocolFee: u64,
    quoteAmountOutWithoutLpFee: u64,
    userQuoteAmountOut: u64,
    pool: address,
    user: address,
    userBaseTokenAccount: address,
    userQuoteTokenAccount: address,
    protocolFeeRecipient: address,
    protocolFeeRecipientTokenAccount: address,
    coinCreator: address,
    coinCreatorFeeBasisPoints: u64,
    coinCreatorFee: u64,
    cashbackFeeBasisPoints: u64,
    cashback: u64,
    buybackFeeBasisPoints: u64,
    buybackFee: u64,
})

export interface SetBondingCurveCoinCreatorEvent {
    timestamp: bigint
    baseMint: string
    pool: string
    bondingCurve: string
    coinCreator: string
}

export const SetBondingCurveCoinCreatorEvent: Codec<SetBondingCurveCoinCreatorEvent> = struct({
    timestamp: i64,
    baseMint: address,
    pool: address,
    bondingCurve: address,
    coinCreator: address,
})

export interface SetMetaplexCoinCreatorEvent {
    timestamp: bigint
    baseMint: string
    pool: string
    metadata: string
    coinCreator: string
}

export const SetMetaplexCoinCreatorEvent: Codec<SetMetaplexCoinCreatorEvent> = struct({
    timestamp: i64,
    baseMint: address,
    pool: address,
    metadata: address,
    coinCreator: address,
})

export interface Shareholder {
    address: string
    shareBps: number
}

export const Shareholder: Codec<Shareholder> = struct({
    address: address,
    shareBps: u16,
})

export interface SharingConfig {
    bump: number
    version: number
    status: ConfigStatus
    mint: string
    admin: string
    adminRevoked: boolean
    shareholders: Array<Shareholder>
}

export const SharingConfig: Codec<SharingConfig> = struct({
    bump: u8,
    version: u8,
    status: ConfigStatus,
    mint: address,
    admin: address,
    adminRevoked: bool,
    shareholders: array(Shareholder),
})

export interface SyncUserVolumeAccumulatorEvent {
    user: string
    totalClaimedTokensBefore: bigint
    totalClaimedTokensAfter: bigint
    timestamp: bigint
}

export const SyncUserVolumeAccumulatorEvent: Codec<SyncUserVolumeAccumulatorEvent> = struct({
    user: address,
    totalClaimedTokensBefore: u64,
    totalClaimedTokensAfter: u64,
    timestamp: i64,
})

export interface UpdateAdminEvent {
    timestamp: bigint
    admin: string
    newAdmin: string
}

export const UpdateAdminEvent: Codec<UpdateAdminEvent> = struct({
    timestamp: i64,
    admin: address,
    newAdmin: address,
})

export interface UpdateFeeConfigEvent {
    timestamp: bigint
    admin: string
    lpFeeBasisPoints: bigint
    protocolFeeBasisPoints: bigint
    protocolFeeRecipients: Array<string>
    coinCreatorFeeBasisPoints: bigint
    adminSetCoinCreatorAuthority: string
}

export const UpdateFeeConfigEvent: Codec<UpdateFeeConfigEvent> = struct({
    timestamp: i64,
    admin: address,
    lpFeeBasisPoints: u64,
    protocolFeeBasisPoints: u64,
    protocolFeeRecipients: fixedArray(address, 8),
    coinCreatorFeeBasisPoints: u64,
    adminSetCoinCreatorAuthority: address,
})

export interface UserVolumeAccumulator {
    user: string
    needsClaim: boolean
    totalUnclaimedTokens: bigint
    totalClaimedTokens: bigint
    currentSolVolume: bigint
    lastUpdateTimestamp: bigint
    hasTotalClaimedTokens: boolean
    cashbackEarned: bigint
    totalCashbackClaimed: bigint
}

export const UserVolumeAccumulator: Codec<UserVolumeAccumulator> = struct({
    user: address,
    needsClaim: bool,
    totalUnclaimedTokens: u64,
    totalClaimedTokens: u64,
    currentSolVolume: u64,
    lastUpdateTimestamp: i64,
    hasTotalClaimedTokens: bool,
    cashbackEarned: u64,
    totalCashbackClaimed: u64,
})

export interface WithdrawEvent {
    timestamp: bigint
    lpTokenAmountIn: bigint
    minBaseAmountOut: bigint
    minQuoteAmountOut: bigint
    userBaseTokenReserves: bigint
    userQuoteTokenReserves: bigint
    poolBaseTokenReserves: bigint
    poolQuoteTokenReserves: bigint
    baseAmountOut: bigint
    quoteAmountOut: bigint
    lpMintSupply: bigint
    pool: string
    user: string
    userBaseTokenAccount: string
    userQuoteTokenAccount: string
    userPoolTokenAccount: string
}

export const WithdrawEvent: Codec<WithdrawEvent> = struct({
    timestamp: i64,
    lpTokenAmountIn: u64,
    minBaseAmountOut: u64,
    minQuoteAmountOut: u64,
    userBaseTokenReserves: u64,
    userQuoteTokenReserves: u64,
    poolBaseTokenReserves: u64,
    poolQuoteTokenReserves: u64,
    baseAmountOut: u64,
    quoteAmountOut: u64,
    lpMintSupply: u64,
    pool: address,
    user: address,
    userBaseTokenAccount: address,
    userQuoteTokenAccount: address,
    userPoolTokenAccount: address,
})
