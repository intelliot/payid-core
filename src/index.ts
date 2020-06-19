import { RippleAPI } from 'ripple-lib'
import { Prepare } from 'ripple-lib/dist/npm/transaction/types'

const api = new RippleAPI()

export function preparePaymentOfOneXRP(options: {
  sourceAddress: string
  destinationAddress: string
  feeXRP: string
  sequence: number
  maxLedgerVersion: number
}): Promise<Prepare> {
  return api.preparePayment(
    options.sourceAddress,
    {
      source: {
        address: options.sourceAddress,
        amount: {
          currency: 'XRP',
          value: '1',
        },
      },
      destination: {
        address: options.destinationAddress,
        minAmount: {
          currency: 'XRP',
          value: '1',
        },
      },
    },
    {
      fee: options.feeXRP,
      sequence: options.sequence,
      maxLedgerVersion: options.maxLedgerVersion,
    },
  )
}
