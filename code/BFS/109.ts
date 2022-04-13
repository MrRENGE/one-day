// 图的 BFS， 广度搜索模型
function openLock(deadends: string[], target: string): number {
  // 用于存储即将遍历的位置
  let quen: string[] = [];
  let visited: string[] = [];
  quen.push('0000');
  visited.push('0000');

  let step = 0;

  function up(data: string, index:number):string {
    let temp = data.split('');
    if (temp[index]=='9') {
      temp[index] = '0'
    } else {
      temp[index] = String(Number(temp[index]) + 1)
    }
    return  temp.join('');
  }

  function donw(data: string, index: number):string {
    let temp = data.split('');
    if (temp[index] == '0') {
      temp[index] = '9';
    } else {
      temp[index] = String(Number(temp[index]) - 1)
    }

    return  temp.join('');
  }

  while(quen.length) {

    let quenSize = quen.length;

    for (let i = 0; i < quenSize; i++) {
      let s = quen.shift();
     
      if (deadends.includes(s)) {
        continue;
      }

      if (s===target) {
        return step;
      }
      

      for (let j = 0; j < 4; j++) {
          let updata = up(s,j);
          if (!visited.includes(updata)) {
            quen.push(updata);
            visited.push(updata);
          }

          let donwData = donw(s,j);
          if (!visited.includes(donwData)) {
            quen.push(donwData);
            visited.push(donwData);
          }
      }
    }

    step++;
  }


  return -1;


};


//************************************************************************************************************************** */
// 图的 BFS， 广度搜索模型
function openLock(deadends: string[], target: string): number {
  // 用于存储即将遍历的位置
  let quen: Set<string> = new Set();
  let quen2: Set<string> = new Set();
  let visited: Set<string> = new Set();
  let deads: Set<string> = new Set();
  for (let item in deadends) {
    deads.add(item);
  }

  quen.add('0000');
  quen2.add(target);

  visited.add('0000');

  let step = 0;

  function up(data: string, index:number):string {
    let temp = data.split('');
    if (temp[index]=='9') {
      temp[index] = '0'
    } else {
      temp[index] = String(Number(temp[index]) + 1)
    }
    return  temp.join('');
  }

  function donw(data: string, index: number):string {
    let temp = data.split('');
    if (temp[index] == '0') {
      temp[index] = '9';
    } else {
      temp[index] = String(Number(temp[index]) - 1)
    }

    return  temp.join('');
  }

  while(quen.size && quen2.size ) {

    let temp: Set<string> = new Set();

    for (let item of quen) {
      
      if (deadends.includes(item)) {
        continue;
      }

      if (quen2.has(item)) {
        return step;
      }

      visited.add(item);

      for (let j = 0; j < 4; j++) {
          let updata = up(item,j);
          if (!visited.has(updata)) {
            temp.add(updata);
          }

          let donwData = donw(item, j);
          if (!visited.has(donwData)) {
            temp.add(donwData);
          }
      }
    }

    step++;

    quen = quen2;
    quen2 = temp;
  }


  return -1;


};