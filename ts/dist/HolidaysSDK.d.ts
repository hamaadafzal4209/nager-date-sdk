import { AvailableCountryEntity } from './entity/AvailableCountryEntity';
import { PublicHolidayEntity } from './entity/PublicHolidayEntity';
export type * from './HolidaysTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { HolidaysEntityBase } from './HolidaysEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class HolidaysSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AvailableCountry(entopts?: Record<string, any>): AvailableCountryEntity;
    PublicHoliday(entopts?: Record<string, any>): PublicHolidayEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): HolidaysSDK;
    tester(testopts?: any, sdkopts?: any): HolidaysSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof HolidaysSDK;
export { stdutil, config, BaseFeature, HolidaysEntityBase, HolidaysSDK, SDK, };
export type { DirectResult };
