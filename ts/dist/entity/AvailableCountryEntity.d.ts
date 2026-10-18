import { HolidaysEntityBase } from '../HolidaysEntityBase';
import type { HolidaysSDK } from '../HolidaysSDK';
import type { Control } from '../types';
import type { AvailableCountry, AvailableCountryListMatch } from '../HolidaysTypes';
declare class AvailableCountryEntity extends HolidaysEntityBase<AvailableCountry> {
    constructor(client: HolidaysSDK, entopts: any);
    make(this: AvailableCountryEntity): AvailableCountryEntity;
    list(this: any, reqmatch?: AvailableCountryListMatch, ctrl?: Control): Promise<AvailableCountryEntity[]>;
}
export { AvailableCountryEntity };
