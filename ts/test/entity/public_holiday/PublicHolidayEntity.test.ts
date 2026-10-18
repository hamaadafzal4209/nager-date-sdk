

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HolidaysSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PublicHolidayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOLIDAYS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOLIDAYS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HolidaysSDK.test()
    const ent = testsdk.PublicHoliday()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HolidaysSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PublicHoliday().list({"country_code":1,"year":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOLIDAYS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public_holiday.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"t":"`$STRING`","key$":"countryCode","index$":0},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":1},"global":{"a":true,"h":"Global","n":"global","r":false,"t":"`$BOOLEAN`","key$":"global","index$":2},"localName":{"a":true,"h":"Local Name","n":"localName","r":false,"t":"`$STRING`","key$":"localName","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":4}},"name":"public_holiday","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v3/PublicHolidays/{year}/{countryCode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"country_code","or":"countryCode","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"year","or":"year","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v3/PublicHolidays/{year}/{countryCode}","q":{"exist":["country_code","year"]},"r":{"param":{"countryCode":"country_code"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v3"},{"lit":"PublicHolidays"},{"var":"year"},{"var":"country_code"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"public_holiday","name__orig":"public_holiday","Name":"PublicHoliday","name_":"public_holiday","name-":"public-holiday","NAME":"PUBLIC_HOLIDAY","index$":1}, {"active":true,"entity":"public_holiday","key$":"BasicPublicHolidayFlow","kind":"basic","name":"BasicPublicHolidayFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"country_code":"country_code01","year":"year01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"public_holiday_ref01"}}]}]}, 'PublicHoliday', {"GET /api/v3/PublicHolidays/{year}/{countryCode}":{"protocol":"http","parameters":[{"name":"year","in":"path","required":true,"schema":{"type":"integer"},"index$":0},{"name":"countryCode","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let public_holiday_ref01_data = Object.values(setup.data.existing.public_holiday)[0] as any

    // LIST
    const public_holiday_ref01_ent = client.PublicHoliday()
    const public_holiday_ref01_match: any = {}
    public_holiday_ref01_match['country_code'] = setup.idmap['country_code01']
    public_holiday_ref01_match['year'] = setup.idmap['year01']

    const public_holiday_ref01_list = (await public_holiday_ref01_ent.list(public_holiday_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public_holiday/PublicHolidayTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HolidaysSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['public_holiday01','public_holiday02','public_holiday03','country_code01','year01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOLIDAYS_TEST_PUBLIC_HOLIDAY_ENTID': idmap,
    'HOLIDAYS_TEST_LIVE': 'FALSE',
    'HOLIDAYS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HOLIDAYS_TEST_PUBLIC_HOLIDAY_ENTID']

  const live = 'TRUE' === env.HOLIDAYS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOLIDAYS_TEST_PUBLIC_HOLIDAY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HolidaysSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HOLIDAYS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
