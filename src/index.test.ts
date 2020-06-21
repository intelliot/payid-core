import { isValidPayId } from './index'

test(`isValidPayId - invalid PayID`, async () => {
  // GIVEN an invalid PayID
  const invalidPayID = 'xpring.money/georgewashington' // Does not start with '$'

  // WHEN checking for PayID syntactical validity
  const validity = isValidPayId(invalidPayID)

  // THEN the PayID is found to be invalid
  expect(validity).toEqual(false)
})
