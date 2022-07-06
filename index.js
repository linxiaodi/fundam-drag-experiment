// Given an object, then convert it to a new object structure
// For example:
const entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
      },
    },
    d: {
      xx: 'adxx',
    },
    e: 'ae',
  },
};
// When we invoke the "convertObject" method and pass the parameter "entry" object: convertObject(entry)
// The result is:
// {
//   'a.b.c.dd': 'abcdd',
//   'a.d.xx': 'adxx',
//   'a.e': 'ae',
// };
// Please complete the convertObject method
function convertObject(o) {
  const dfs = (o, parentsKeys = []) => {
    if (typeof o === 'object') {
      let collection = {}
      for (let k of Object.keys(o)) {
        collection = {
          ...collection,
          ...dfs(o[k], parentsKeys.concat(k))
        }
      }
      return collection
    } else {
      return {
        [parentsKeys.join(',')]: o
      }
    }
  }
  return dfs(o)
}


console.log(convertObject(entry));