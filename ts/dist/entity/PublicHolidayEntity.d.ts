import { HolidaysEntityBase } from '../HolidaysEntityBase';
import type { HolidaysSDK } from '../HolidaysSDK';
import type { Control } from '../types';
import type { PublicHoliday, PublicHolidayListMatch } from '../HolidaysTypes';
declare class PublicHolidayEntity extends HolidaysEntityBase<PublicHoliday> {
    constructor(client: HolidaysSDK, entopts: any);
    make(this: PublicHolidayEntity): PublicHolidayEntity;
    list(this: any, reqmatch?: PublicHolidayListMatch, ctrl?: Control): Promise<PublicHolidayEntity[]>;
}
export { PublicHolidayEntity };
