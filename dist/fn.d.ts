import { Type } from 'io-ts';
export declare class FnType<F extends Function> extends Type<F> {
    readonly _tag: 'FnType';
    constructor();
}
export interface FnC<F extends Function> extends FnType<F> {
}
export declare function fn<F extends Function>(): FnC<F>;
//# sourceMappingURL=fn.d.ts.map