/////////
/// 1 ///
////////

// Write three functions that compute the sum of the numbers in a given list using a for-loop, a while-loop, and recursion.

// for loop
const getSumForLoop = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

// while-loop
const getSumWhileLoop = (arr) => {
  let sum = 0;
  while (arr.length) {
    sum += arr.shift();
  }
  return sum;
};

// recursion
const getSumRecursion = (arr) => {
  let sum = 0;
  if (arr.length) {
    sum += arr.shift();
    return sum + getSumRecursion(arr);
  } else {
    return 0;
  }
};

console.log(getSumForLoop([2, 4, 5, 12, 42, 53]))
console.log(getSumWhileLoop([2, 4, 5, 12, 42, 53]))
console.log(getSumRecursion([2, 4, 5, 12, 42, 53]))

/////////
/// 2 ///
////////

// Write a function that combines two lists by alternatingly taking elements. For example: given the two lists [a, b, c] and [1, 2, 3], the function should return [a, 1, b, 2, c, 3].

const combineArr = (arr1, arr2) => {
  let resultArr = [];
  for (let i = 0; i < arr1.length; i++) {
    resultArr.push(arr1[i]);
    resultArr.push(arr2[i]);
  }
  return resultArr;
};

console.log(combineArr(['a', 'b', 'c'], [1, 2, 3]));

/////////
/// 3 ///
/////////

// Write a function that computes the list of the first 100 Fibonacci numbers. By definition, the first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two. As an example, here are the first 10 Fibonnaci numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, and 34.

const fibonacci = (n) => {
  let arr = [0, 1];
  let tempSum;
  for (let f = 0; f < n - 2; f++) {
    for (let i = arr.length - 1; i > arr.length - 2 ; i--) {
      tempSum = arr[i] + arr[i - 1];
      arr.push(tempSum);
    }
  }
  return arr;
};

console.log(fibonacci(100));

/////////
/// 4 ///
/////////

// Write a function that given a list of non negative integers, arranges them such that they form the largest possible number. For example, given [50, 2, 1, 9], the largest formed number is 95021.

const largestPossibleNum = (arr) => {
  let resultArr = arr.sort().reverse().join('');
  return resultArr;
}

console.log(largestPossibleNum([50, 2, 1, 9]))


/////////
/// 5 ///
/////////

// Write a program that outputs all possibilities to put + or - or nothing between the numbers 1, 2, ..., 9 (in this order) such that the result is always 100. For example: 1 + 2 + 34 – 5 + 67 – 8 + 9 = 100.

const bigO = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log("Hello", arr[i] + ' ' + arr[j]);
    }
  }
}

console.log(bigO([0,1,2,3,4,5,6,7]))