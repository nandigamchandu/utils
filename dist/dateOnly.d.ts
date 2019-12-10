import { BrandC, Branded } from 'io-ts';
import { DateC } from 'io-ts-types/lib/date';
export interface DateOnlyBrand {
    readonly DateOnly: unique symbol;
}
export declare const DateOnly: BrandC<DateC, DateOnlyBrand>;
export declare type DateOnly = Branded<Date, DateOnlyBrand>;
//# sourceMappingURL=dateOnly.d.ts.map