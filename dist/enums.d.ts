import { Type } from 'io-ts';
export declare class EnumType<D extends string[], A> extends Type<A> {
    readonly keys: D;
    readonly _tag: 'EnumType';
    constructor(keys: D, name: string, is: EnumType<D, A>['is'], validate: EnumType<D, A>['validate'], encode: EnumType<D, A>['encode']);
}
export interface EnumC<D extends string[]> extends EnumType<D, D[number]> {
}
export declare function enums<T extends string[]>(name: string | undefined, ...keys: T): EnumC<T>;
export declare function enumerate<T extends string[]>(...keys: T): EnumC<T>;
//# sourceMappingURL=enums.d.ts.map