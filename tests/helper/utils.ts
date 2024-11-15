/**
 * Sorts a string array and compares it with original array to check if they match
 * @param {string[]} inputArray - Array of string to be sorted and compared
 * @param {string} ascendingOrDescending - Sorting order 'ascending' or 'descending'
 * @returns {boolean} - returns 'true' if original array matches with sorted array, otherwise returns 'false'
 * @throws {Error} - throws an error is the sorting mode is invalid
 */
export const sortAndCompareStringArray = (inputArray: string[], ascendingOrDescending: string): boolean => {
   const arrayCopy = [...inputArray];
   let sortedArray: string[];
   if (ascendingOrDescending === 'ascending') {
     sortedArray = arrayCopy.sort((a, b) => a.localeCompare(b));
   } else if (ascendingOrDescending === 'descending') {
     sortedArray = arrayCopy.sort((a, b) => b.localeCompare(a));
   } else {
     throw new Error('Invalid sorting order. Use "ascending" or "descending".');
   }
   const compareResult = inputArray.every((value, index) => value === sortedArray[index]);
   return compareResult;
 };

 /**
 * Sorts a number array and compares it with original array to check if they match
 * @param {number[]} inputArray - Array of number to be sorted and compared
 * @param {string} ascendingOrDescending - Sorting order 'ascending' or 'descending'
 * @returns {boolean} - returns 'true' if original array matches with sorted array, otherwise returns 'false'
 * @throws {Error} - throws an error is the sorting mode is invalid
 */
export const sortAndCompareNumberArray = (inputArray:number[],ascendingOrDescending:string):boolean =>{
   const arrayCopy = [...inputArray];
   let sortedArray: number[];
   if (ascendingOrDescending === 'ascending') {
     sortedArray = arrayCopy.sort((a, b) => a-b);
   } else if (ascendingOrDescending === 'descending') {
     sortedArray = arrayCopy.sort((a, b) => b-a);
   } else {
     throw new Error('Invalid sorting order. Use "ascending" or "descending".');
   }
   const compareResult = inputArray.every((value, index) => value === sortedArray[index]);
   return compareResult;
}

 /**
 * Calculates the total sum of all numbers in the array
 * @param {number[]} inputArray - Array of number to sum
 * @returns {number} - total number
 */
export const calculateTotal = (inputArray: number[]): number => {
  return inputArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue; // Explicit return inside the function body
  }, 0);
};

 /**
 * Converts an array of strings representing prices to array of number
 * @param {string[]} inputArray - Array of strings representing prices
 * @returns {number[]} - Array of numbers
 * @throws {Error} - throws an error if the input error is empty
 */
export const convertStringArrayToNumberArray = (inputArray: string[]): number[]=> {
  if (!inputArray.length) throw new Error("Item prices not found");
  const prices = inputArray.map(text => parseFloat(text.replace('$', '')));
  return prices;
}
