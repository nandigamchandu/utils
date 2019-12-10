import { TypeOf } from 'io-ts';
import { NonUndefined } from 'utility-types';
export declare function freeze<T>(v: T): Readonly<T>;
export declare function jsonStringify(obj: object): string;
export declare function nop(..._: any[]): any;
export declare function range(start: number, stop?: number, step?: number): ReadonlyArray<number>;
export declare function repeatedly<T>(n: number, f: (index: number) => T): ReadonlyArray<T>;
export declare const buildArray: typeof repeatedly;
export declare function keys<T extends Object>(obj: T): ReadonlyArray<keyof T>;
export declare function buildObject<T extends {}, R>(obj: T, f: (value: T[typeof key], key: keyof T) => R): Record<keyof T, NonUndefined<R>>;
export declare function today(): Date;
export declare function timeout<T>(delay: number, f?: () => T): Promise<T>;
export declare function interval<T>(interval: number, f?: () => T): Promise<T>;
export declare const ISODate: import("io-ts").UnionC<[import("io-ts-types/lib/date").DateC, import("io-ts-types/lib/DateFromISOString").DateFromISOStringC]>;
export declare type ISODate = TypeOf<typeof ISODate>;
export declare function pick<T extends {}, K extends keyof T>(obj: T, ks: ReadonlyArray<K>): Pick<T, K>;
export declare function omit<T extends {}, K extends keyof T>(obj: T, ks: ReadonlyArray<K>): Omit<T, K>;
//# sourceMappingURL=common.d.ts.map