import { preparePaymentOfOneXRP } from './index'

test(`preparePaymentOfOneXRP`, async () => {
  const options = {
    sourceAddress: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    destinationAddress: 'rpZc4mVfWUif9CRoHRKKcmhu1nx2xktxBo',
    feeXRP: '0.000012',
    sequence: 1,
    maxLedgerVersion: 1000000,
  }
  const prepare = await preparePaymentOfOneXRP(options)
  expect(prepare).toEqual({
    instructions: {
      fee: '0.000012',
      maxLedgerVersion: 1000000,
      sequence: 1,
    },
    txJSON:
      '{"TransactionType":"Payment","Account":"r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59","Destination":"rpZc4mVfWUif9CRoHRKKcmhu1nx2xktxBo","Amount":"1000000","Flags":2147483648,"LastLedgerSequence":1000000,"Fee":"12","Sequence":1}',
  })
})
