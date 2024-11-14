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

export const calculateTotal = (inputArray: number[]): number => {
  return inputArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue; // Explicit return inside the function body
  }, 0);
};

export const convertStringArrayToNumberArray = (inputArray: string[]): number[]=> {
  if (!inputArray.length) throw new Error("Item prices not found");
  const prices = inputArray.map(text => parseFloat(text.replace('$', '')));
  return prices;
}
