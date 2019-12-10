import { BooleanC, BrandC, IntBrand, Mixed, NumberC, Props, StringC } from 'io-ts';
import { PickByValue } from 'utility-types';
import { ExactObjC, ObjC, ObjOptOf, ObjPropsOf, ObjReqOf } from './obj';
export declare function objPick<Opt extends Props, Req extends Props, K extends keyof ObjC<Opt, Req>['props']>(spec: ObjC<Opt, Req>, keys: readonly K[], name?: string): ObjC<Pick<Opt, Extract<keyof ObjOptOf<Opt, Req>, K>>, Pick<Req, Extract<keyof ObjReqOf<Opt, Req>, K>>>;
export declare function objOmit<Opt extends Props, Req extends Props, K extends keyof ObjPropsOf<Opt, Req>>(spec: ObjC<Opt, Req>, keys: readonly K[], name?: string): ObjC<Omit<Opt, Extract<keyof ObjC<Opt, Req>['optional'], K>>, Omit<Req, Extract<keyof ObjC<Opt, Req>['required'], K>>>;
export declare function objCombine<Opt extends Props, Req extends Props, Opt2 extends Props, Req2 extends Props>(p: ObjC<Opt, Req>, p2: ObjC<Opt2, Req2>, name?: string): ObjC<Opt & Opt2, Req & Req2>;
export declare function toOpt<Opt extends Props, Req extends Props>(spec: ObjC<Opt, Req>, name?: string): ObjC<Req & Opt, {}>;
export declare function toReq<Opt extends Props, Req extends Props>(spec: ObjC<Opt, Req>, name?: string): ObjC<{}, Req & Opt>;
export declare function toExact<Opt extends Props, Req extends Props>(spec: ObjC<Opt, Req>, name?: string): ExactObjC<Opt, Req>;
export declare type ObjCPickBy<Opt extends Props, Req extends Props, ValueType> = ObjC<PickByValue<ObjC<Opt, Req>['required'], ValueType>, PickByValue<ObjC<Opt, Req>['optional'], ValueType>>;
export declare function pickBy<Opt extends Props, Req extends Props, Picks extends Mixed[]>(spec: ObjC<Opt, Req>, ...picks: Picks): ObjCPickBy<Opt, Req, typeof picks[number]>;
export declare function pickStrings<Opt extends Props, Req extends Props>(spec: ObjC<Opt, Req>): ObjCPickBy<Opt, Req, StringC>;
export declare function pickNumbers<Opt extends Props, Req extends Props>(spec: ObjC<Opt, Req>): ObjCPickBy<Opt, Req, NumberC>;
export declare function pickInts<Opt extends Props, Req extends Props>(spec: ObjC<Opt, Req>): ObjCPickBy<Opt, Req, BrandC<NumberC, IntBrand>>;
export declare function pickNumeric<Opt extends Props, Req extends Props>(spec: ObjC<Opt, Req>): ObjCPickBy<Opt, Req, NumberC | BrandC<NumberC, IntBrand>>;
export declare function pickStringly<Opt extends Props, Req extends Props>(spec: ObjC<Opt, Req>): ObjCPickBy<Opt, Req, NumberC | BrandC<NumberC, IntBrand> | StringC | BooleanC>;
//# sourceMappingURL=objUtils.d.ts.map