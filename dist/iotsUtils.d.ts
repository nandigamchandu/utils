import { Either } from 'fp-ts/lib/Either';
import { Errors, ExactType, InterfaceType, IntersectionType, literal, PartialType, Props, ReadonlyType, Type } from 'io-ts';
import { ObjType } from './obj';
export declare function cast<A, O, I>(spec: Type<A, O, I>, args: I): A;
export declare const verifyCast: typeof cast;
export declare function assertCast<A, O, I>(spec: Type<A, O, I>, args: I): A | undefined;
export declare const debugCast: typeof assertCast;
export declare function rejected<T>(decoded: Either<Errors, T> | string): Promise<T>;
export declare function toPromise<T>(either: Either<Errors, T>): Promise<T>;
export declare const lit: typeof literal;
export interface GotPropsIntersection extends IntersectionType<[GotProps, GotProps, ...Array<GotProps>]> {
}
export interface GotPropsReadonly extends ReadonlyType<GotProps> {
}
export declare type GotPropsOnType = GotPropsReadonly | ExactType<any>;
export declare type GotPropsOnProps = InterfaceType<any> | PartialType<any> | ObjType<any, any, any, any>;
export declare type GotProps = GotPropsIntersection | GotPropsOnProps | GotPropsOnType;
export declare function pickProps<T extends Props, K extends keyof T>(props: T, keys: ReadonlyArray<K>): Pick<T, K>;
export declare function omitProps<T extends Props, K extends keyof T>(props: T, keys: ReadonlyArray<K>): Omit<T, K>;
//# sourceMappingURL=iotsUtils.d.ts.map