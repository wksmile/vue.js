import _JSON$stringify from "babel-runtime/core-js/json/stringify";
export function savaToLocal(id, key, value) {
  var seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
    seller[id][key] = value;
  }
  localStorage.__seller__ = _JSON$stringify(seller);
}

export function loadFromLocal(id, key, def) {
  var seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  var ret = seller[key];
  return ret || def;
}

//# sourceMappingURL=store-compiled.js.map