var cloneDeep = require("lodash.clonedeep");

const ntnl = (options) => {
  return options
    ? (obj) => {
        return sanitize(obj, options);
      }
    : (obj) => {
        return obj;
      };
};

const isNullOrUndefined = (obj) => {
  return obj == null;
};

const setNestedObject = (nestedObj, pathArr, value) => {
  return pathArr.reduce((obj, key, idx) => {
    if (idx === pathArr.length - 1) {
      obj[key] = isNullOrUndefined(obj[key]) ? value : obj[key];
    } else {
      obj[key] = isNullOrUndefined(obj[key]) ? {} : obj[key];
      return obj[key];
    }
  }, nestedObj);
};

const sanitize = (tmp, options) => {
  var obj = cloneDeep(tmp);
  for (var prop in options) {
    if (prop.includes(".")) {
      setNestedObject(obj, prop.split("."), options[prop]);
    } else if (obj.hasOwnProperty(prop)) {
      obj[prop] = isNullOrUndefined(obj[prop]) ? options[prop] : obj[prop];
    }
  }

  return obj;
};

module.exports = ntnl;
