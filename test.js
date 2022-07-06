function Foo() {
  getName = function () {
    alert(1);
  };
  return this;
}
var getName;

function getName() {
  alert(5);
};
Foo.getName = function () {
  alert(2);
};
Foo.prototype.getName = function (alert(3););
getName = function () {
  alert(4);
};

getName();
Foo().getName();
new new Foo().getName();

// // 4
// // 1
// // 3

// 两个数组的有序归并
// const a = [[1,2],[0,3,5],[-1,4]] => [-1, 0, 1, 2, 3, 4, 5]

const mergeArray = (arrays) => {
  return arrays.reduce((collection, arr) => {
    return mergeTowArray(collection, arr)
  }, [])
}

const mergeTowArray = (arr1, arr2) => {
  const collection = []
  while (arr1.length && arr2.length) {
    if (arr1[0] > arr2[0]) {
      collection.push(arr2.shift())
    } else {
      collection.push(arr1.shift())
    }
  }
  if (arr1.length > 0) return collection.concat(arr1)
  if (arr2.length > 0) return collection.concat(arr2)
}


console.log(mergeArray([[1,2],[0,3,5],[-1,4]]))

