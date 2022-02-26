// arr = [1,2,3,4,5,6,7,8,9] target = 10
		
// 	function add(){}

// 	add(arr, target) // [[1,9], [2,8], [3,7]]

function add (arr: Array<number>, target: number) : Array<number> {
  let result: Array<number> = [];
  let lastIndex = arr.length-1; 


  for(let i=0; i<arr.length; i++) {
    for (let j=lastIndex; j>0; j--) {
      if (target-arr[i] > arr[j]) {
        j--
      } else if (target-arr[i] === arr[j]) {
        
      }
    }
   
  }

  return result;
}




