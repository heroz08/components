function setPrefix(type) {
  return `[object ${type}]`;
}

function getPrototype(v, suffix){
  return Object.prototype.toString.apply(v) === setPrefix(suffix)
}

export function isStr(v) {
  return getPrototype(v, 'String')
}
export function isNum(v) {
  return getPrototype(v, 'Number');

}
export function isObj(v) {
  return getPrototype(v, 'Object');
}
export function isArr(v) {
  return getPrototype(v, 'Array');
}
export function isBoolean(v) {
  return getPrototype(v, 'Boolean');
}
export function isFn(v) {
  return getPrototype(v, 'Function');
}
export function isNull(v) {
  return getPrototype(v, 'Null') || v === '';
}
export function isUndefined(v) {
  return getPrototype(v, 'Undefined');
}
export function isBlob(v) {
  return getPrototype(v, 'Blob');
}
export function isFormData(v) {
  return getPrototype(v, 'FormData');
}
export function isFunc(v) {
  return getPrototype(v, 'Function');
}
export function isNAN(v) {
  return isNum(v) && String(v) === 'NaN';
}

export function isNullObj(v) {
  return isObj(v) && (Object.keys(v).length === 0);
}

export function isNullArr(v) {
  return isArr(v) && (v.length === 0);
}

export function hasValue(v) {
  return !isUndefined(v) && !isNull(v);
}

export function objHasData(v) {
  return hasValue(v) && !isNullObj(v);
}

export function arrHasData(v) {
  return hasValue(v) && !isNullArr(v);
}

export function hasData(v) {
  if (isArr(v)) return arrHasData(v);
  if (isObj(v)) return objHasData(v);
  return hasValue(v);
}

export function isCoverNum(v) {
  if (isNum(v)) {
    return true;
  }
  if (isStr(v)) {
    const res = Number(v);
    return !isNAN(res);
  }
  return false;
}
