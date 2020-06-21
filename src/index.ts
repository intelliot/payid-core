import fetch from 'node-fetch'

export interface PayIdComponents {
  host: string
  path: string // starting with a leading `/`
}

/**
 * Parse a PayID into PayIdComponents.
 *
 * @param payId the PayID to parse
 * @returns the PayIdComponents if the PayID is syntactically valid, otherwise `undefined`
 */
export function parsePayId(payId: string): PayIdComponents | undefined {

  // Ensure `payId` contains only ASCII characters
  if (/^[\x00-\x7F]+$/u.test(payId) === false) {
    return undefined
  }

  // Split on the last occurrence of '$'
  const lastDollarIndex = payId.lastIndexOf('$')
  if (lastDollarIndex === -1) {
    return undefined
  }

  const path = payId.slice(0, lastDollarIndex)
  const host = payId.slice(lastDollarIndex + 1)

  // Validate the host and path have values
  if (host.length === 0 || path.length === 0) {
    return undefined
  }

  return {
    host,
    path: `/${path}`
  }
}

/**
 * Check whether a string is syntactically a valid PayID.
 *
 * @param payId the PayID to check
 * @returns `true` if the PayID is valid, otherwise `false`
 */
export function isValidPayId(payId: string): boolean {
  return !!parsePayId(payId)
}

/**
 * Payment Network strings.
 *
 * The general standard form of the `Accept:` header for cryptocurrencies is:
 *
 *     application/{payment-network}-{environment}+json
 *
 * The special value `payid` asks the server to return ALL of the addresses associated with the PayID.
 *
 * @see https://payid.org/whitepaper.pdf
 */
export type PaymentNetwork = XRPLPaymentNetwork | BTCPaymentNetwork | ETHPaymentNetwork | ILPPaymentNetwork | 'ach' | 'payid' | string

export type XRPLPaymentNetwork = 'xrpl-testnet' | 'xrpl-devnet' | 'xrpl-mainnet'

export type BTCPaymentNetwork = 'btc-testnet' | 'btc-mainnet'

export type ETHPaymentNetwork = 'eth-rinkeby' | 'eth-ropsten' | 'eth-mainnet'

export type ILPPaymentNetwork = 'interledger-mainnet' | 'interledger-testnet'

// TODO
export interface AddressDetails {
  address: string
  tag?: string // required if set. In other words, the sender MUST use this as the payment's destination tag
}

export interface PaymentInformation {
  addressDetailsType: AddressDetailsType
  addressDetails: CryptoAddressDetails | AchAddressDetails
  proofOfControlSignature?: string
  payId?: string
  memo?: string
}

export type AddressDetailsType = 'CryptoAddressDetails' | 'AchAddressDetails' | string

export interface CryptoAddressDetails {
  address: string
  tag?: string
}

export interface AchAddressDetails {
  accountNumber: string
  routingNumber: string
}

export interface OptionalInsecureFlag {
  usedInsecureHttp?: boolean
}

export interface ResolvePayIdOptions {
  network: PaymentNetwork
  useInsecureHttp?: boolean
}

/**
 * Retrieve one or more addresses associated with a PayID.
 *
 * By default, this retrieves all of a PayID's addresses by passing the `payid` network in the header of the request.
 *
 * To retrieve an address for a particular payment network, set `options.network` to the desired PaymentNetwork.
 *
 * @param payId The PayID to resolve for one or more addresses
 * @param options Options object
 * @param options.network The network to retrieve an address for
 * @param options.useInsecureHttp If `true`, `http` will be used. Use for testing purposes only. Defaults to `false`
 */
export async function resolvePayId(payId: string, options: ResolvePayIdOptions = {network: 'payid'}): Promise<PaymentInformation & OptionalInsecureFlag> {
  const payIdComponents = parsePayId(payId)
  if (!payIdComponents) {
    // Syntactically invalid PayID
    throw new Error('Invalid PayID')
  }

  const basePath = options.useInsecureHttp ? `http://${payIdComponents.host}` : `https://${payIdComponents.host}`

  const headers = {
    Accept: `application/${options.network}+json`,
    'PayID-Version': '1.0'
  }

  const response = await fetch(basePath + payIdComponents.path, {headers})

  if (response.ok) {
    // response.status >= 200 && response.status < 300
    const json = await response.json()
    if (options.useInsecureHttp) {
      return Object.assign({}, json, {usedInsecureHttp: true})
    }
    return json
  }

  throw new Error(response.statusText)
}
