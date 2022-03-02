function isValidSerialization(preorder: string): boolean {
  let result = true;
  let quen = preorder.split(',');
  
  let temp = 2;


  if (quen.length>1 && quen[0]==='#') {
      return result = false;
  }

  while(quen.length && result) {
    let node = quen.shift();
    if (node === '#') {
      temp = temp - 1;
    } else {
      temp = temp + 1;
    }

    if (temp<0) {
      result = false;
    }

  }


  return result && temp === 0;
};