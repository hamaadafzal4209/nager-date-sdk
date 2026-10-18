export interface AvailableCountry {
    countryCode?: string;
    name?: string;
}
export interface AvailableCountryListMatch {
    countryCode?: string;
    name?: string;
}
export interface PublicHoliday {
    countryCode?: string;
    date?: string;
    global?: boolean;
    localName?: string;
    name?: string;
}
export interface PublicHolidayListMatch {
    country_code: string;
    year: number;
}
