// Typed models for the Holidays SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AvailableCountry {
  countryCode?: string
  name?: string
}

export interface AvailableCountryListMatch {
  countryCode?: string
  name?: string
}

export interface PublicHoliday {
  countryCode?: string
  date?: string
  global?: boolean
  localName?: string
  name?: string
}

export interface PublicHolidayListMatch {
  country_code: string
  year: number
}

