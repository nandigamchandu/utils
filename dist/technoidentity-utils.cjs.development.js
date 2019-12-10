'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ioTs = require('io-ts');
var Either = require('fp-ts/lib/Either');
var PathReporter = require('io-ts/lib/PathReporter');
var dateFns = require('date-fns');
var date = require('io-ts-types/lib/date');
var DateFromISOString = require('io-ts-types/lib/DateFromISOString');
var BooleanFromString = require('io-ts-types/lib/BooleanFromString');
var IntFromString = require('io-ts-types/lib/IntFromString');
var NumberFromString = require('io-ts-types/lib/NumberFromString');
var tcomb = _interopDefault(require('tcomb'));

// copied from tiny-warning package
function warn(condition, message) {
  if (condition) {
    return;
  }

  var text = "Warning: " + message; // tslint:disable-next-line no-console

  console.warn(text); // Throwing an error and catching it immediately to improve debugging.
  // A consumer can use 'pause on caught exceptions'
  // https://github.com/facebook/react/issues/4216

  try {
    throw Error(text); // tslint:disable-next-line no-empty
  } catch (x) {}
}
function debug(condition, message) {
  {
    warn(condition, message);
  }
}
function fatal(message) {
  {
    // When not in production we allow the message to pass through
    // *This block will be removed in production builds*
    throw new Error("Invariant failed: " + (message || ''));
  }
}
function error(message) {
  {
    fatal(message);
  }
} // copied from tiny-invariant package

function verify(condition, message) {
  if (!condition) {
    fatal(message);
  }
}
function assert(condition, message) {
  {
    verify(condition, message);
  }
}

var interval = function interval(_interval, f) {
  if (f === void 0) {
    f = nop;
  }

  try {
    return Promise.resolve(new Promise(function (resolve) {
      return setInterval(function () {
        return resolve(f());
      }, _interval);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
}; // tslint:disable-next-line: typedef

var timeout = function timeout(delay, f) {
  if (f === void 0) {
    f = nop;
  }

  try {
    return Promise.resolve(new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve(f());
      }, delay);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
function freeze(v) {
  return  Object.freeze(v) ;
}
function jsonStringify(obj) {
  return JSON.stringify(obj, null, 2);
}
function nop() {
  return undefined;
}

function rangeInternal(start, stop, step) {
  if (step === void 0) {
    step = 1;
  }

  assert(step > 0);
  var result = [];

  for (var i = start; i < stop; i += step) {
    result.push(i);
  }

  return result;
}

function range(start, stop, step) {
  return stop ? rangeInternal(start, stop, step) : rangeInternal(0, start);
}
function repeatedly(n, f) {
  var result = [];

  for (var i = 0; i < n; i++) {
    result.push(f(i));
  }

  return result;
}
var buildArray = repeatedly;
function keys(obj) {
  return Object.keys(obj);
}
function buildObject(obj, f) {
  var result = {};

  for (var _iterator = keys(obj), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var k = _ref;
    var v = f(obj[k], k);

    if (v !== undefined) {
      result[k] = v;
    }
  }

  return result;
}
function today() {
  return dateFns.startOfDay(new Date());
}
var ISODate =
/*#__PURE__*/
ioTs.union([date.date, DateFromISOString.DateFromISOString]);
function pick(obj, ks) {
  var result = {};

  for (var _iterator2 = keys(obj), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var k = _ref2;

    if (ks.includes(k)) {
      result[k] = obj[k];
    }
  }

  return result;
}
function omit(obj, ks) {
  var result = {};

  for (var _iterator3 = keys(obj), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
    var _ref3;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref3 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref3 = _i3.value;
    }

    var k = _ref3;

    if (!ks.includes(k)) {
      result[k] = obj[k];
    }
  }

  return result;
}

var toPromise = function toPromise(either) {
  try {
    return Promise.resolve(Either.isRight(either) ? either.right : rejected(either));
  } catch (e) {
    return Promise.reject(e);
  }
}; // export function opt<P extends Props>(
//   props: P,
//   name?: string,
// ): ReadonlyC<PartialC<P>> {
//   return readonly(partial(props), name)
// }
// export function req<P extends Props>(
//   props: P,
//   name?: string,
// ): ReadonlyC<TypeC<P>> {
//   return readonly(type(props), name)
// }
// export function props<O extends Props, R extends Props>(
//   optional: O,
//   required: R,
//   name?: string,
// ): IntersectionC<[ReadonlyC<PartialC<O>>, ReadonlyC<TypeC<R>>]> {
//   return intersection(
//     [readonly(partial(optional)), readonly(type(required))],
//     name,
//   )
// }

var rejected = function rejected(decoded) {
  try {
    return Promise.reject(new Error(ioTs.string.is(decoded) ? decoded : PathReporter.PathReporter.report(decoded).join('\n')));
  } catch (e) {
    return Promise.reject(e);
  }
};
function cast(spec, args) {
  var decoded = spec.decode(args);
  return Either.isRight(decoded) ? decoded.right : fatal(PathReporter.PathReporter.report(decoded).join('\n'));
}
var verifyCast = cast;
function assertCast(spec, args) {
  var decoded = spec.decode(args);
  assert(spec.is(args), PathReporter.PathReporter.report(decoded).join('\n'));
  return Either.isRight(decoded) ? decoded.right : undefined;
}
var debugCast = assertCast;
var lit = ioTs.literal; // export function getProps<T extends Mixed>(codec: T & GotProps): Props {
//   switch (codec._tag) {
//     case 'ReadonlyType':
//     case 'ExactType':
//       return getProps(codec.type)
//     case 'InterfaceType':
//     case 'ObjType':
//     case 'PartialType':
//       return codec.props
//     case 'IntersectionType':
//       return codec.types.reduce<Props>(
//         (props, type) => ({ ...props, ...getProps(type as any) }),
//         {},
//       )
//   }
// }
// export function getProp<T extends Mixed>(
//   codec: T & GotProps,
//   key: string,
// ): Mixed | undefined {
//   switch (codec._tag) {
//     case 'ReadonlyType':
//     case 'ExactType':
//       return getProp(codec.type, key)
//     case 'InterfaceType':
//     case 'ObjType':
//     case 'PartialType':
//       return codec.props[key]
//     case 'IntersectionType':
//       for (const t of codec.types) {
//         const result: Mixed | undefined = getProp(t as any, key)
//         if (result !== undefined) {
//           return result
//         }
//       }
//       return undefined
//   }
// }

function pickProps(props, keys) {
  return pick(props, keys);
}
function omitProps(props, keys) {
  return omit(props, keys);
}

// TODO: revisit replacing tuple once ts 3.7 releases with circular references support

function tupleChecked(argSpecs, resultSpec, f) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    cast(argSpecs, args);
    return cast(resultSpec, f.apply(void 0, args));
  };
}
function checked(codecs, resultSpec, f) {
  return tupleChecked(ioTs.tuple(codecs), resultSpec, f);
}
function tupleCheckedAsync(argSpecs, resultSpec, f) {
  return function () {
    try {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      cast(argSpecs, args);
      return Promise.resolve(f.apply(void 0, args)).then(function (_f) {
        return cast(resultSpec, _f);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function checkedAsync(codecs, resultSpec, f) {
  return tupleCheckedAsync(ioTs.tuple(codecs), resultSpec, f);
}

function toInt(from) {
  return cast(IntFromString.IntFromString, from);
}
function toBoolean(from) {
  return cast(BooleanFromString.BooleanFromString, from);
}
function toNumber(from) {
  return cast(NumberFromString.NumberFromString, from);
}
function toDate(from) {
  return cast(DateFromISOString.DateFromISOString, from);
}

var DateOnly =
/*#__PURE__*/
ioTs.brand(date.date, function (n) {
  return date.date.is(n);
}, 'DateOnly');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var EnumType =
/*#__PURE__*/
function (_Type) {
  _inheritsLoose(EnumType, _Type);

  function EnumType(keys, name, is, validate, encode) {
    var _this;

    _this = _Type.call(this, name, is, validate, encode) || this;
    _this.keys = keys;
    _this._tag = 'EnumType';
    return _this;
  }

  return EnumType;
}(ioTs.Type);
function enums(name) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  function is(u) {
    return ioTs.string.is(u) && keys.includes(u);
  }

  return new EnumType(keys, name || "Enum<" + keys.join(' | ') + ">", is, function (u, c) {
    return is(u) ? ioTs.success(u) : ioTs.failure(u, c);
  }, ioTs.identity);
}
function enumerate() {
  for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    keys[_key2] = arguments[_key2];
  }

  return enums.apply(void 0, [undefined].concat(keys));
}

//   ? {} extends Req
//     ? Opt
//     : Req
//   : Opt & Req

var ObjType =
/*#__PURE__*/
function (_Type) {
  _inheritsLoose(ObjType, _Type);

  function ObjType(optional, required, props, spec, name) {
    var _this;

    _this = _Type.call(this, name, spec.is, spec.validate, spec.encode) || this;
    _this.optional = optional;
    _this.required = required;
    _this.props = props;
    _this._tag = 'ObjType';
    return _this;
  }

  return ObjType;
}(ioTs.Type);

function newObj(optional, required, name) {
  var spec = ioTs.intersection([ioTs.readonly(ioTs.partial(optional)), ioTs.readonly(ioTs.type(required))]);
  return new ObjType(optional, required, _extends({}, optional, {}, required), spec, name || spec.name);
} // @TODO: need ability to distinguish ObjType from Exact ObjType


function newExactObj(optional, required, name) {
  var spec = ioTs.exact(ioTs.intersection([ioTs.readonly(ioTs.partial(optional)), ioTs.readonly(ioTs.type(required))]));
  return new ObjType(optional, required, _extends({}, optional, {}, required), spec, name || spec.name);
}

function obj(optional, required, name) {
  return newObj(optional, required, name);
}
function exactObj(optional, required, name) {
  return newExactObj(optional, required, name);
}
function req(required, name) {
  return obj({}, required, name);
}
function opt(optional, name) {
  return obj(optional, {}, name);
}
function getProps(spec) {
  return spec.props;
}
function getProp(spec, prop) {
  return spec.props[prop];
}

function empty(spec) {
  if (spec.name === 'Int' || spec instanceof ioTs.NumberType) {
    return 0;
  }

  if (spec instanceof ioTs.StringType) {
    return '';
  }

  if (spec instanceof ioTs.BooleanType) {
    return false;
  }

  if (spec.name === 'Date') {
    return today();
  }

  if (spec.name === 'DateFromISOString') {
    return today();
  }

  if (spec instanceof ioTs.KeyofType) {
    return keys(spec.keys)[0];
  }

  if (spec instanceof EnumType) {
    return spec.keys[0];
  }

  if (spec instanceof ioTs.LiteralType) {
    return spec.value;
  }

  if (spec instanceof ioTs.NullType) {
    // tslint:disable-next-line: no-null-keyword
    return null;
  }

  if (spec instanceof ioTs.UndefinedType || spec instanceof ioTs.VoidType) {
    return undefined;
  }

  if (spec instanceof ioTs.UnknownType) {
    return '';
  }

  if (spec instanceof ioTs.InterfaceType || spec instanceof ioTs.PartialType || spec instanceof ObjType) {
    return buildObject(spec.props, empty);
  }

  if (spec instanceof ioTs.ExactType || spec instanceof ioTs.ReadonlyType || spec instanceof ioTs.RefinementType) {
    return empty(spec.type);
  }

  if (spec instanceof ioTs.ReadonlyArrayType || spec instanceof ioTs.ArrayType || spec instanceof ioTs.AnyArrayType) {
    return [];
  }

  if (spec instanceof ioTs.IntersectionType) {
    return spec.types.map(empty).reduce(function (acc, x) {
      return _extends({}, acc, {}, x);
    });
  }

  if (spec instanceof ioTs.UnionType) {
    return empty(spec.types[0]);
  }

  if (spec instanceof ioTs.TupleType) {
    return spec.types.map(empty);
  }

  throw new Error("Unsupported type: " + spec.name);
}

function isType(spec) {
  return tcomb.isType(spec);
}
function isStruct(spec) {
  return spec.meta.kind === 'struct';
}
function isInterface(spec) {
  return spec.meta.kind === 'interface';
}
function isIntersection(spec) {
  return spec.meta.kind === 'intersection';
}
function isMaybe(spec) {
  return spec.meta.kind === 'maybe';
}
function isUnion(spec) {
  return spec.meta.kind === 'union';
}
function isEnums(spec) {
  return spec.meta.kind === 'enums';
}
function isTuple(spec) {
  return spec.meta.kind === 'tuple';
} // tslint:disable-next-line: readonly-array

function isList(spec) {
  return spec.meta.kind === 'list';
} // tslint:disable-next-line: readonly-keyword

function isDict(spec) {
  return spec.meta.kind === 'dict';
}
function isIrreducible(spec) {
  return spec.meta.kind === 'irreducible';
}
function isInteger(spec) {
  return spec.meta.kind === 'subtype' && spec.meta.name === 'Integer';
}

function emptyFromIrreducible(rt) {
  verify(rt.meta.kind === 'irreducible', 'rt must be irreducible');

  switch (rt.meta.name) {
    case 'Number':
      return 0;

    case 'Any':
    case 'String':
      return '';

    case 'Boolean':
      return false;

    case 'Date':
      return new Date();

    case 'Function':
      return nop;

    case 'RegExp':
      return /(?:)/;

    case 'Nil':
      return undefined;

    case 'Error':
      return new Error('empty error');

    case 'Object':
      return {};

    case 'Array':
      return [];

    default:
      throw new Error("Unsupported tcomb type: " + rt.meta.kind + ": " + rt.meta.name);
  }
}

function emptyFromRT(rt) {
  if (!isType(rt)) {
    throw new Error('I have no idea about what do with a function');
  }

  verify(rt && rt.meta && rt.meta.kind);

  if (isInteger(rt)) {
    return 0;
  }

  if (isStruct(rt)) {
    return rt(buildObject(rt.meta.props, emptyFromRT));
  }

  if (isInterface(rt)) {
    return buildObject(rt.meta.props, emptyFromRT);
  }

  if (isList(rt)) {
    return [];
  }

  if (isDict(rt)) {
    return {};
  }

  if (isIntersection(rt)) {
    return rt.meta.types.map(emptyFromRT).reduce(function (acc, x) {
      return _extends({}, acc, {}, x);
    });
  }

  if (isMaybe(rt)) {
    return emptyFromRT(rt.meta.type); // may be return undefined?
  }

  if (isUnion(rt)) {
    return emptyFromRT(rt.meta.types[0]);
  }

  if (isEnums(rt)) {
    return keys(rt.meta.map)[0];
  } // case 'subtype':
  //   return empty(rt.meta.type) // this is hard, how to satisfy predicate?
  // case 'func':
  //   return nop // need function returning value of correct type


  if (isTuple(rt)) {
    return rt.meta.types.map(emptyFromRT);
  }

  if (isIrreducible(rt)) {
    return emptyFromIrreducible(rt);
  }

  throw new Error("Unsupported tcomb type: " + rt.meta.kind);
}

function emptyFromPrimitiveValue(v) {
  if (ioTs.number.is(v)) {
    return 0;
  }

  if (ioTs.string.is(v)) {
    return '';
  }

  if (ioTs.boolean.is(v)) {
    return false;
  } // tslint:disable-next-line: no-null-keyword


  if (v == null) {
    return v;
  }

  if (date.date.is(v)) {
    return today();
  }

  warn(false, "Unsupported value " + v);
}

function emptyFromObjectValue(value) {
  return buildObject(value, emptyFromValue);
}

var emptyFromValue = function emptyFromValue(value) {
  if (ioTs.Array.is(value)) {
    return [];
  }

  if (ioTs.UnknownRecord.is(value)) {
    return emptyFromObjectValue(value);
  }

  return emptyFromPrimitiveValue(value);
};

var FnType =
/*#__PURE__*/
function (_Type) {
  _inheritsLoose(FnType, _Type);

  function FnType() {
    var _this;

    _this = _Type.call(this, 'FnType', function (u) {
      return typeof u === 'function';
    }, function (u, c) {
      return _this.is(u) ? ioTs.success(u) : ioTs.failure(u, c);
    }, ioTs.identity) || this;
    _this._tag = 'FnType';
    return _this;
  }

  return FnType;
}(ioTs.Type);
function fn() {
  return new FnType();
}

function id(inner, name) {
  return ioTs.brand(inner, function (n) {
    return inner.is(n);
  }, name || "id<" + inner.name);
}
var IntID =
/*#__PURE__*/
id(ioTs.Int, 'IntID');
var StrID =
/*#__PURE__*/
id(ioTs.string, 'StrID');

var Positive =
/*#__PURE__*/
tcomb.refinement(tcomb.Number, function (n) {
  return n >= 0;
}, 'Positive');
var Negative =
/*#__PURE__*/
tcomb.refinement(tcomb.Number, function (n) {
  return n <= 0;
}, 'Negative');
function Min(min) {
  return tcomb.refinement(tcomb.Number, function (n) {
    return n >= min;
  }, 'Min');
}
function Max(max) {
  return tcomb.refinement(tcomb.Number, function (n) {
    return n <= max;
  }, 'Max');
}
var PositiveInt =
/*#__PURE__*/
tcomb.refinement(tcomb.Integer, function (n) {
  return n >= 0;
}, 'PositiveInt');
var NegativeInt =
/*#__PURE__*/
tcomb.refinement(tcomb.Integer, function (n) {
  return n <= 0;
}, 'NegativeInt');
function MinInt(min) {
  return tcomb.refinement(tcomb.Integer, function (n) {
    return n >= min;
  }, 'MinInt');
}
function MaxInt(max) {
  return tcomb.refinement(tcomb.Integer, function (n) {
    return n <= max;
  }, 'MaxInt');
} // eslint-disable-next-line

var rEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i; // eslint-disable-next-line

var rUrl = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
var Email =
/*#__PURE__*/
tcomb.refinement(tcomb.String, function (s) {
  return rEmail.test(s);
}, 'Email');
var Url =
/*#__PURE__*/
tcomb.refinement(tcomb.String, function (s) {
  return rUrl.test(s);
}, 'Url');
var Lower =
/*#__PURE__*/
tcomb.refinement(tcomb.String, function (s) {
  return s.toLowerCase() === s;
}, 'Lowercase');
var Upper =
/*#__PURE__*/
tcomb.refinement(tcomb.String, function (s) {
  return s.toUpperCase() === s;
}, 'Uppercase');
function Length(len) {
  return tcomb.refinement(tcomb.String, function (s) {
    return s.length === len;
  }, 'StringLength');
}
function MinStringLength(min) {
  return tcomb.refinement(tcomb.String, function (s) {
    return s.length >= min;
  }, 'MinStringLength');
}
function MaxStringLength(max) {
  return tcomb.refinement(tcomb.String, function (s) {
    return s.length <= max;
  }, 'MaxStringLength');
}
function Literal(literal) {
  return tcomb.refinement(tcomb.String, function (s) {
    return s === literal;
  });
}
function MinDate(min) {
  return tcomb.refinement(tcomb.Date, function (d) {
    return dateFns.compareAsc(min, d) <= 0;
  }, 'MinDate');
}
function MaxDate(max) {
  return tcomb.refinement(tcomb.Date, function (d) {
    return dateFns.compareAsc(max, d) >= 0;
  }, 'MaxDate');
}
function ArrayMinLength(min) {
  return tcomb.refinement(tcomb.Array, function (arr) {
    return arr.length >= min;
  }, 'ArrayMinLength');
}
function ArrayMaxLength(max) {
  return tcomb.refinement(tcomb.Array, function (arr) {
    return arr.length <= max;
  }, 'ArrayMaxLength');
}

function rtFromObjectSpec(spec, options) {
  if (options === void 0) {
    options = {
      strict: false
    };
  }

  return tcomb.struct(buildObject(spec.props, rtFromSpec), {
    name: spec.name,
    strict: options.strict
  });
}

function rtFromSpec(spec) {
  if (spec.name === 'Int') {
    return tcomb.Integer;
  }

  if (spec instanceof ioTs.NumberType) {
    return tcomb.Number;
  }

  if (spec instanceof ioTs.StringType) {
    return tcomb.String;
  }

  if (spec instanceof ioTs.LiteralType) {
    return Literal(spec.value);
  }

  if (spec instanceof ioTs.BooleanType) {
    return tcomb.Boolean;
  }

  if (spec.name === 'Date') {
    return tcomb.Date;
  }

  if (spec.name === 'DateFromISOString') {
    return tcomb.Date;
  }

  if (spec instanceof ioTs.KeyofType) {
    return tcomb.enums(spec.keys);
  }

  if (spec instanceof EnumType) {
    return tcomb.enums.of(spec.keys);
  } // TODO: literal type?


  if (spec instanceof ioTs.NullType || spec instanceof ioTs.UndefinedType || spec instanceof ioTs.VoidType) {
    return tcomb.Nil;
  }

  if (spec instanceof ioTs.UnknownType) {
    return tcomb.Any; // this looks wrong, but is it?
  }

  if (spec instanceof ObjType) {
    // @TODO: strict: true if Exact ObjType
    tcomb.struct(buildObject(spec.props, rtFromSpec), {
      name: spec.name
    });
  }

  if (spec instanceof ioTs.InterfaceType) {
    return rtFromObjectSpec(spec);
  }

  if (spec instanceof ioTs.PartialType) {
    return tcomb.struct(buildObject(spec.props, function (p) {
      return tcomb.maybe(rtFromSpec(p));
    }), {
      name: spec.name
    });
  }

  if (spec instanceof ioTs.ReadonlyType) {
    return rtFromSpec(spec.type);
  }

  if (spec instanceof ioTs.ExactType) {
    return rtFromObjectSpec(spec.type, {
      strict: true
    });
  }

  if (spec instanceof ioTs.RefinementType) {
    return tcomb.refinement(rtFromSpec(spec.type), spec.predicate);
  }

  if (spec instanceof ioTs.ArrayType || spec instanceof ioTs.ReadonlyArrayType) {
    return tcomb.list(rtFromSpec(spec.type));
  }

  if (spec instanceof ioTs.AnyArrayType) {
    return tcomb.list(tcomb.Any);
  }

  if (spec instanceof ioTs.IntersectionType) {
    return tcomb.intersection(spec.types.map(rtFromSpec));
  }

  if (spec instanceof ioTs.UnionType) {
    return tcomb.union(spec.types.map(rtFromSpec));
  }

  if (spec instanceof ioTs.TupleType) {
    return tcomb.tuple(spec.types.map(rtFromSpec));
  }

  throw new Error("Unsupported " + spec.name);
}

function rtFromPrimitiveValue(value) {
  if (tcomb.Integer.is(value)) {
    return tcomb.Integer;
  }

  if (tcomb.Number.is(value)) {
    return tcomb.Number;
  }

  if (tcomb.String.is(value)) {
    return tcomb.String;
  }

  if (tcomb.Boolean.is(value)) {
    return tcomb.Boolean;
  }

  if (tcomb.RegExp.is(value)) {
    return tcomb.RegExp;
  }

  if (tcomb.Function.is(value)) {
    return tcomb.Function;
  }

  if (tcomb.Error.is(value)) {
    return tcomb.Error;
  }

  if (tcomb.Nil.is(value)) {
    return tcomb.Nil;
  }

  throw new Error("Unsupported #{value}");
}

function rtFromArrayValue(value) {
  return value[0] !== undefined ? tcomb.list(rtFromValue(value[0])) : tcomb.list(tcomb.Any);
}

function rtFromObjectValue(value) {
  return tcomb.struct(buildObject(value, rtFromValue));
}

function rtFromValue(value) {
  if (tcomb.Array.is(value)) {
    return rtFromArrayValue(value);
  }

  if (tcomb.Object.is(value)) {
    return rtFromObjectValue(value);
  }

  return rtFromPrimitiveValue(value);
}

function capitalize(arg) {
  return arg.length === 0 ? '' : arg[0].toUpperCase() + arg.slice(1);
}
function toLower(arg, delimiter) {
  if (arg.length === 0) {
    return '';
  }

  var result = arg[0].toLowerCase(); // tslint:disable-next-line: no-loop-statement

  for (var i = 1; i < arg.length; i += 1) {
    if (arg[i] === arg[i].toUpperCase()) {
      result += "" + delimiter + arg[i].toLowerCase();
    } else {
      result += arg[i];
    }
  }

  return result;
}
function camelCaseToHyphenated(arg) {
  return toLower(arg, '-');
}
function camelCaseToSpaced(arg) {
  return toLower(arg, ' ');
}
var camelCaseToPhrase = function camelCaseToPhrase(arg) {
  return capitalize(toLower(arg, ' '));
};
function chop(arg, delimiter) {
  if (delimiter === void 0) {
    delimiter = '/';
  }

  return arg.length === 0 ? '' : arg.endsWith(delimiter) ? arg.slice(0, arg.length - 1) : arg;
}
function extractSegment(arg, fromIndex, upto) {
  if (arg.length === 0) {
    return '';
  }

  var p = arg.slice(fromIndex);
  var s = p.indexOf(upto);
  return s === -1 ? p.trim() : p.slice(0, s).trim();
}
function capitalizeAll(str, delimiter, joinDelimiter) {
  if (delimiter === void 0) {
    delimiter = ' ';
  }

  if (joinDelimiter === void 0) {
    joinDelimiter = ' ';
  }

  return str.split(delimiter).map(capitalize).join(joinDelimiter);
}

var TimeOnly =
/*#__PURE__*/
ioTs.brand(date.date, function (n) {
  return date.date.is(n);
}, 'TimeOnly');

function objPick(spec, keys, name) {
  return obj(pick(spec.optional, keys), pick(spec.required, keys), name);
}
function objOmit(spec, keys, name) {
  return obj(omit(spec.optional, keys), omit(spec.required, keys), name);
} // export function propsPick<
//   Opt extends Props,
//   Req extends Props,
//   KP extends keyof Opt,
//   KR extends keyof Req
// >(
//   { optional, required }: ObjC<Opt, Req>,
//   optKeys: readonly KP[] = [],
//   reqKeys: readonly KR[] = [],
//   name?: string,
// ): ObjC<Pick<Opt, KP>, Pick<Req, KR>> {
//   return obj(pick(optional, optKeys), pick(required, reqKeys), name)
// }
// export function propsOmit<
//   Opt extends Props,
//   Req extends Props,
//   KP extends keyof Opt,
//   KR extends keyof Req
// >(
//   { optional, required }: ObjC<Opt, Req>,
//   optKeys: readonly KP[] = [],
//   reqKeys: readonly KR[] = [],
//   name?: string,
// ): ObjC<Omit<Opt, KP>, Omit<Req, KR>> {
//   return obj(omit(optional, optKeys), omit(required, reqKeys), name)
// }

function objCombine(p, p2, name) {
  return obj(_extends({}, p.optional, {}, p2.optional), _extends({}, p.required, {}, p2.required), name);
}
function toOpt(spec, name) {
  return opt(spec.props, name);
}
function toReq(spec, name) {
  return req(spec.props, name);
}
function toExact(spec, name) {
  return exactObj(spec.optional, spec.required, name);
}
function pickBy(spec) {
  function isSpec(names) {
    return function (spec) {
      return names.includes(spec.name) ? spec : undefined;
    };
  }

  for (var _len = arguments.length, picks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    picks[_key - 1] = arguments[_key];
  }

  return obj(buildObject(spec.required, isSpec(picks.map(function (s) {
    return s.name;
  }))), buildObject(spec.optional, isSpec(picks.map(function (s) {
    return s.name;
  }))));
}
function pickStrings(spec) {
  return pickBy(spec, ioTs.string);
}
function pickNumbers(spec) {
  return pickBy(spec, ioTs.number);
}
function pickInts(spec) {
  return pickBy(spec, ioTs.Int);
}
function pickNumeric(spec) {
  return pickBy(spec, ioTs.number, ioTs.Int);
}
function pickStringly(spec) {
  return pickBy(spec, ioTs.Int, ioTs.number, ioTs.string, ioTs.boolean);
}

Object.keys(ioTs).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return ioTs[k];
    }
  });
});
Object.keys(Either).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return Either[k];
    }
  });
});
Object.keys(date).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return date[k];
    }
  });
});
Object.keys(DateFromISOString).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return DateFromISOString[k];
    }
  });
});
Object.keys(BooleanFromString).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return BooleanFromString[k];
    }
  });
});
Object.keys(IntFromString).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return IntFromString[k];
    }
  });
});
Object.keys(NumberFromString).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return NumberFromString[k];
    }
  });
});
Object.defineProperty(exports, 'PathReporter', {
  enumerable: true,
  get: function () {
    return PathReporter.PathReporter;
  }
});
exports.ArrayMaxLength = ArrayMaxLength;
exports.ArrayMinLength = ArrayMinLength;
exports.DateOnly = DateOnly;
exports.Email = Email;
exports.EnumType = EnumType;
exports.FnType = FnType;
exports.ISODate = ISODate;
exports.IntID = IntID;
exports.Length = Length;
exports.Literal = Literal;
exports.Lower = Lower;
exports.Max = Max;
exports.MaxDate = MaxDate;
exports.MaxInt = MaxInt;
exports.MaxStringLength = MaxStringLength;
exports.Min = Min;
exports.MinDate = MinDate;
exports.MinInt = MinInt;
exports.MinStringLength = MinStringLength;
exports.Negative = Negative;
exports.NegativeInt = NegativeInt;
exports.ObjType = ObjType;
exports.Positive = Positive;
exports.PositiveInt = PositiveInt;
exports.StrID = StrID;
exports.TimeOnly = TimeOnly;
exports.Upper = Upper;
exports.Url = Url;
exports.assert = assert;
exports.assertCast = assertCast;
exports.buildArray = buildArray;
exports.buildObject = buildObject;
exports.camelCaseToHyphenated = camelCaseToHyphenated;
exports.camelCaseToPhrase = camelCaseToPhrase;
exports.camelCaseToSpaced = camelCaseToSpaced;
exports.capitalize = capitalize;
exports.capitalizeAll = capitalizeAll;
exports.cast = cast;
exports.checked = checked;
exports.checkedAsync = checkedAsync;
exports.chop = chop;
exports.debug = debug;
exports.debugCast = debugCast;
exports.empty = empty;
exports.emptyFromRT = emptyFromRT;
exports.emptyFromValue = emptyFromValue;
exports.enumerate = enumerate;
exports.enums = enums;
exports.error = error;
exports.exactObj = exactObj;
exports.extractSegment = extractSegment;
exports.fatal = fatal;
exports.fn = fn;
exports.freeze = freeze;
exports.getProp = getProp;
exports.getProps = getProps;
exports.id = id;
exports.interval = interval;
exports.isDict = isDict;
exports.isEnums = isEnums;
exports.isInteger = isInteger;
exports.isInterface = isInterface;
exports.isIntersection = isIntersection;
exports.isIrreducible = isIrreducible;
exports.isList = isList;
exports.isMaybe = isMaybe;
exports.isStruct = isStruct;
exports.isTuple = isTuple;
exports.isType = isType;
exports.isUnion = isUnion;
exports.jsonStringify = jsonStringify;
exports.keys = keys;
exports.lit = lit;
exports.nop = nop;
exports.obj = obj;
exports.objCombine = objCombine;
exports.objOmit = objOmit;
exports.objPick = objPick;
exports.omit = omit;
exports.omitProps = omitProps;
exports.opt = opt;
exports.pick = pick;
exports.pickBy = pickBy;
exports.pickInts = pickInts;
exports.pickNumbers = pickNumbers;
exports.pickNumeric = pickNumeric;
exports.pickProps = pickProps;
exports.pickStringly = pickStringly;
exports.pickStrings = pickStrings;
exports.range = range;
exports.rejected = rejected;
exports.repeatedly = repeatedly;
exports.req = req;
exports.rtFromSpec = rtFromSpec;
exports.rtFromValue = rtFromValue;
exports.timeout = timeout;
exports.toBoolean = toBoolean;
exports.toDate = toDate;
exports.toExact = toExact;
exports.toInt = toInt;
exports.toLower = toLower;
exports.toNumber = toNumber;
exports.toOpt = toOpt;
exports.toPromise = toPromise;
exports.toReq = toReq;
exports.today = today;
exports.tupleChecked = tupleChecked;
exports.tupleCheckedAsync = tupleCheckedAsync;
exports.verify = verify;
exports.verifyCast = verifyCast;
exports.warn = warn;
//# sourceMappingURL=technoidentity-utils.cjs.development.js.map
