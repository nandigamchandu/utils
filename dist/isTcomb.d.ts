import { Constructor, Dict, Enums, Interface, Intersection, Irreducible, List, Maybe, Struct, Tuple, Type, Union } from 'tcomb';
export declare function isType<T>(spec: Constructor<T>): spec is Type<T>;
export declare function isStruct<T>(spec: Type<T>): spec is Struct<T>;
export declare function isInterface<T>(spec: Type<T>): spec is Interface<T>;
export declare function isIntersection<T>(spec: Type<T>): spec is Intersection<T>;
export declare function isMaybe<T>(spec: Type<void | T>): spec is Maybe<T>;
export declare function isUnion<T>(spec: Type<T>): spec is Union<T>;
export declare function isEnums(spec: Type<string>): spec is Enums;
export declare function isTuple<T>(spec: Type<T>): spec is Tuple<T>;
export declare function isList<T>(spec: Type<T[]>): spec is List<T>;
export declare function isDict<T>(spec: Type<{
    [key: string]: T;
}>): spec is Dict<T>;
export declare function isIrreducible<T>(spec: Type<T>): spec is Irreducible<T>;
export declare function isInteger(spec: Type<any>): boolean;
//# sourceMappingURL=isTcomb.d.ts.map