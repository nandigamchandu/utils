import { ExactC, IntersectionC, Mixed, PartialC, Props, ReadonlyC, Type, TypeC, TypeOf } from 'io-ts';
declare type OptSpec<Opt extends Props> = ReadonlyC<PartialC<Opt>>;
declare type ReqSpec<Req extends Props> = ReadonlyC<TypeC<Req>>;
declare type ObjSpec<Opt extends Props, Req extends Props> = IntersectionC<[OptSpec<Opt>, ReqSpec<Req>]>;
declare type ExactObjSpec<Opt extends Props, Req extends Props> = ExactC<IntersectionC<[OptSpec<Opt>, ReqSpec<Req>]>>;
export declare class ObjType<Opt extends Props, Req extends Props, A, O = A, I = unknown> extends Type<A, O, I> {
    readonly optional: Opt;
    readonly required: Req;
    readonly props: Opt & Req;
    readonly _tag: 'ObjType';
    constructor(optional: Opt, required: Req, props: Opt & Req, spec: Type<A, O, I>, name: string);
}
export interface ObjC<Opt extends Props, Req extends Props> extends ObjType<Opt, Req, ObjSpec<Opt, Req>['_A'], ObjSpec<Opt, Req>['_O'], ObjSpec<Opt, Req>['_I']> {
}
export declare type ObjPropsOf<Opt extends Props, Req extends Props> = ObjC<Opt, Req>['props'];
export declare type ObjReqOf<Opt extends Props, Req extends Props> = ObjC<Opt, Req>['required'];
export declare type ObjOptOf<Opt extends Props, Req extends Props> = ObjC<Opt, Req>['optional'];
export declare type ObjTypeOf<Opt extends Props, Req extends Props> = ObjC<Opt, Req>['_A'];
export declare type ObjOutPutOf<Opt extends Props, Req extends Props> = ObjC<Opt, Req>['_O'];
export declare type ObjInputOf<Opt extends Props, Req extends Props> = ObjC<Opt, Req>['_I'];
export declare type AnyObj = Mixed & ObjC<any, any>;
export interface ExactObjC<Opt extends Props, Req extends Props> extends ObjType<Opt, Req, ExactObjSpec<Opt, Req>['_A'], ExactObjSpec<Opt, Req>['_O'], ExactObjSpec<Opt, Req>['_I']> {
}
export declare function obj<Opt extends Props, Req extends Props>(optional: Opt, required: Req, name?: string): ObjC<Opt, Req>;
export declare function exactObj<Opt extends Props, Req extends Props>(optional: Opt, required: Req, name?: string): ObjC<Opt, Req>;
export declare function req<Req extends Props>(required: Req, name?: string): ObjC<{}, Req>;
export declare function opt<Opt extends Props>(optional: Opt, name?: string): ObjC<Opt, {}>;
export declare function getProps<Spec extends AnyObj>(spec: AnyObj): Spec['props'];
export declare function getProp<Spec extends AnyObj, K extends keyof TypeOf<Spec>>(spec: Spec, prop: K): Spec['props'][K];
export {};
//# sourceMappingURL=obj.d.ts.map