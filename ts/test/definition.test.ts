import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "available_country",
    "accessor": "AvailableCountry",
    "op": "list",
    "method": "GET",
    "path": "/api/v3/AvailableCountries",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "countryCode": "x",
        "name": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "public_holiday",
    "accessor": "PublicHoliday",
    "op": "list",
    "method": "GET",
    "path": "/api/v3/PublicHolidays/{year}/{countryCode}",
    "args": [
      {
        "name": "country_code",
        "wire": "countryCode",
        "value": "p1"
      },
      {
        "name": "year",
        "wire": "year",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "date": "2026-01-01",
        "localName": "x",
        "name": "x",
        "countryCode": "x",
        "global": true
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
