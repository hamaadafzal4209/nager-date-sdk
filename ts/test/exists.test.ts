
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HolidaysSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HolidaysSDK.test()
    equal(testsdk instanceof HolidaysSDK, true,
      'HolidaysSDK.test() must return a client synchronously')
  })

})
