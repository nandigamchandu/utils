import { BrandC, Mixed, TypeOf } from 'io-ts';
export declare function id<T extends Mixed>(inner: T, name?: string): BrandC<T, {
    readonly id: symbol;
}>;
export declare const IntID: BrandC<BrandC<import("io-ts").NumberC, import("io-ts").IntBrand>, {
    readonly id: symbol;
}>;
export declare type IntID = TypeOf<typeof IntID>;
export declare const StrID: BrandC<import("io-ts").StringC, {
    readonly id: symbol;
}>;
export declare type StrID = TypeOf<typeof IntID>;
//# sourceMappingURL=id.d.ts.map