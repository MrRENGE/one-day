// function nextGreaterElements(nums: number[]): number[] {
//   let res:number[] = [] , queue:number[] = [] ;
//   res.fill(-1);
//   for (let i = nums.length-1; i >= 0; i--) {
//     while(queue.length && queue[queue.length-1]<=nums[i]) {
//       queue.pop();
//     }

//     if (queue.length===0) {
//       for (let j = 0; j<i; j++) {
//         if (nums[i]<nums[j]) {
//           res[i] = nums[j]
//           break;
//         }
//       }
      
//     } else {
//       res[i] = queue[queue.length-1]
//     }

//     queue.push(nums[i])
//   }

//   return res;
// };

//  最优方式解，
function nextGreaterElements(nums: number[]): number[] {
  let res:number[] = [] , queue:number[] = [] ;
  res.length = nums.length;
  res.fill(-1);
  for (let i = 2*(nums.length)-1; i >= 0; i--) {
    while(queue.length && queue[queue.length-1]<=nums[i % nums.length]) {
      queue.pop();
    }

    res[i%nums.length] = queue.length ? queue[queue.length-1] : -1;

    queue.push(nums[i % nums.length])
  }

  return res;
};