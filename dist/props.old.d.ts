import { IntersectionC, OutputOf, PartialC, Props, ReadonlyC, Type, TypeC, TypeOf } from 'io-ts';
declare class PropsBase<P extends Props, A, O, I> extends Type<A, O, I> {
    readonly _P: P;
}
export declare type AnyPropsBase<P extends Props = any> = PropsBase<P, any, any, any>;
export declare type PropsOf<T extends AnyPropsBase> = T['_P'];
declare class ReqType<R extends Props, A, O, I> extends PropsBase<R, A, O, I> {
    readonly props: R;
    readonly _tag: 'ReqType';
    constructor(props: R, spec: Type<A, O, I>, name: string);
}
declare type SR<R extends Props> = ReadonlyC<TypeC<R>>;
declare type AR<R extends Props> = TypeOf<SR<R>>;
declare type OR<R extends Props> = OutputOf<SR<R>>;
export interface ReqTypeC<R extends Props> extends ReqType<R, AR<R>, OR<R>, unknown> {
}
export declare function req<R extends Props>(required: R, name?: string): ReqTypeC<R>;
export declare class OptType<P extends Props, A, O, I> extends PropsBase<P, A, O, I> {
    readonly props: P;
    readonly _tag: 'OptType';
    constructor(props: P, spec: Type<A, O, I>, name: string);
}
declare type SP<P extends Props> = ReadonlyC<PartialC<P>>;
declare type AP<P extends Props> = TypeOf<SP<P>>;
declare type OP<P extends Props> = OutputOf<SP<P>>;
export interface OptTypeC<P extends Props> extends OptType<P, AP<P>, OP<P>, unknown> {
}
export declare function opt<R extends Props>(optional: R, name?: string): OptTypeC<R>;
export declare class BothType<R extends Props, P extends Props, A, O, I> extends PropsBase<R & P, A, O, I> {
    readonly required: R;
    readonly optional: P;
    readonly _tag: 'BothType';
    constructor(required: R, optional: P, spec: Type<A, O, I>, name: string);
    readonly props: R & P;
}
declare type SI<R extends Props, P extends Props> = IntersectionC<[SR<R>, SP<P>]>;
declare type AI<R extends Props, P extends Props> = TypeOf<SI<R, P>>;
declare type OI<R extends Props, P extends Props> = OutputOf<SI<R, P>>;
export interface BothTypeC<R extends Props, P extends Props> extends BothType<R, P, AI<R, P>, OI<R, P>, unknown> {
}
export declare function both<R extends Props, P extends Props>(required: R, optional: P, name?: string): BothTypeC<R, P>;
export declare function bothPick<R extends Props, P extends Props, KR extends keyof R, KP extends keyof P>({ required, optional }: BothTypeC<R, P>, reqKeys: readonly KR[], optKeys: readonly KP[]): BothTypeC<Pick<R, KR>, Pick<P, KP>>;
export declare function bothOmit<R extends Props, P extends Props, KR extends keyof R, KP extends keyof P>({ required, optional }: BothTypeC<R, P>, reqKeys: readonly KR[], optKeys: readonly KP[]): BothTypeC<Omit<R, KR>, Omit<P, KP>>;
export declare function reqPick<R extends Props, KR extends keyof R>({ props }: ReqTypeC<R>, reqKeys: readonly KR[]): ReqTypeC<Pick<R, KR>>;
export declare function reqOmit<R extends Props, KR extends keyof R>({ props }: ReqTypeC<R>, reqKeys: readonly KR[]): ReqTypeC<Omit<R, KR>>;
export declare function optPick<P extends Props, KP extends keyof P>({ props }: OptTypeC<P>, optKeys: readonly KP[]): OptTypeC<Pick<P, KP>>;
export declare function optOmit<P extends Props, KP extends keyof P>({ props }: OptTypeC<P>, optKeys: readonly KP[]): OptTypeC<Omit<P, KP>>;
export declare function reqOptToBoth<R extends Props, P extends Props>(req: ReqTypeC<R>, opt: OptTypeC<P>): BothTypeC<R, P>;
export declare function reqCombine<R extends Props, R2 extends Props>(r: ReqTypeC<R>, r2: ReqTypeC<R2>): ReqTypeC<R & R2>;
export declare function optCombine<P extends Props, P2 extends Props>(o: OptTypeC<P>, o2: OptTypeC<P2>): OptTypeC<P & P2>;
export declare function bothCombine<R extends Props, R2 extends Props, P extends Props, P2 extends Props>(p: BothTypeC<R, P>, p2: BothTypeC<R2, P2>): BothTypeC<R & R2, P & P2>;
export declare function isOpt(spec: AnyPropsBase): spec is OptTypeC<any>;
export declare function isReq(spec: AnyPropsBase): spec is ReqTypeC<any>;
export declare function isBoth(spec: AnyPropsBase): spec is BothTypeC<any, any>;
export declare function getProps<Spec extends AnyPropsBase>(spec: Spec): PropsOf<typeof spec>;
export declare function getReqProps<Spec extends AnyPropsBase>(spec: Spec): PropsOf<typeof spec>;
export declare function getOptProps<Spec extends AnyPropsBase>(spec: Spec): PropsOf<typeof spec>;
export declare function toOpt<Spec extends AnyPropsBase>(spec: Spec): OptTypeC<PropsOf<typeof spec>>;
export declare function toReq<Spec extends AnyPropsBase>(spec: Spec): ReqTypeC<PropsOf<typeof spec>>;
export {};
//# sourceMappingURL=props.old.d.ts.map