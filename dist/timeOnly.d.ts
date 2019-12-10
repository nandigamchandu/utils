import { BrandC, Branded } from 'io-ts';
import { DateC } from 'io-ts-types/lib/date';
export interface TimeOnlyBrand {
    readonly TimeOnly: unique symbol;
}
export declare const TimeOnly: BrandC<DateC, TimeOnlyBrand>;
export declare type TimeOnly = Branded<Date, TimeOnlyBrand>;
//# sourceMappingURL=timeOnly.d.ts.map