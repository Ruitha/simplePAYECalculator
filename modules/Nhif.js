export const nhifContribution = [
  ["ksh150", 5999],
  ["ksh300", [6000, 7999]],
  ["ksh400", [8000, 11999]],
  ["ksh500", [12000, 14999]],
  ["ksh600", [15000, 19999]],
  ["ksh750", [20000, 24999]],
  ["ksh850", [25000, 29999]],
  ["ksh900", [30000, 34999]],
  ["ksh950", [35000, 39999]],
  ["ksh1000", [40000, 44999]],
  ["ksh1100", [45000, 49999]],
  ["ksh1200", [50000, 59999]],
  ["ksh1300", [60000, 69999]],
  ["ksh1400", [70000, 79999]],
  ["ksh1500", [80000, 89999]],
  ["ksh1600", [90000, 99999]],
  ["ksh1700", 100000],
  ["self", 500],
];

const NhifArray = [
  5999,
  6000,
  7999,
  8000,
  11999,
  12000,
  14999,
  15000,
  19999,
  20000,
  24999,
  25000,
  29999,
  30000,
  34999,
  35000,
  39999,
  40000,
  44999,
  45000,
  49999,
  50000,
  59999,
  60000,
  6999,
  70000,
  79999,
  80000,
  89999,
  90000,
  99999,
  100000,
  "self",
];
const contributions = [
  150, 300, 400, 500, 600, 750, 850, 900, 950, 1000, 1100, 1200, 1300, 1400,
  1500, 1600, 1700, 500,
];

var NhifArray2 = [
  [
    5999, 6000, 7999, 8000, 11999, 12000, 14999, 15000, 19999, 20000, 24999,
    25000, 29999, 30000, 34999, 35000, 39999, 40000, 44999, 45000, 49999, 50000,
    59999, 60000, 6999, 70000, 79999, 80000, 89999, 90000, 99999, 100000, 500,
  ],
  [
    150, 300, 400, 500, 600, 750, 850, 900, 950, 1000, 1100, 1200, 1300, 1400,
    1500, 1600, 1700, 500,
  ],
];

const array = [500, 700, 300, 100, 800, 700];

let salary = 40000;
console.table(nhifContribution[1][1]);

for (let i = 0; i < nhifContribution.length; i++) {
  // get the size of the inner array
  var innerArrayLength = nhifContribution[i].length;
  // loop the inner array
  console.log(nhifContribution[i]);
  for (let j = 0; j < innerArrayLength; j++) {}
}

// For tyhis value the multidimesional array member is the one we are loopgn through anf then pick the range of the value fronm the values given in the array. To check the value, we use a multidimesional for loop tecnique to do this.
// Let this be the last pointer tothe function in the array and the rest be the absolute numbers from which we shall compile int he coming object

// For whenthe lat Item is in the array the other functionwill return the object object of the  sais function with which it was called
