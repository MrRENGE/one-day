function solveNQueens(n: number): string[][] {
  let res: string[][][] = [];
  let board: string[][] = [];

  // 初始化棋盘
  for (let i = 0; i < n; i++) {
    let a = [];
    a.length = n;
    a.fill('.');
    board[i] = a;
  }

  function backtrack(board: string[][], row: number) {
    // 当前棋盘布局完成，压入 res 中 退出
    if (row === board.length) {
      res.push(JSON.parse(JSON.stringify(board)));
      return;
    }

    let colSize = board[row].length;
    for (let col = 0; col < colSize; col++) {
      if (!isValid(board, row, col)) {
        continue;
      }

      // 做选择
      board[row][col] = 'Q';
      // 进入下一决策树
      backtrack(board, row + 1);
      // 撤销
      board[row][col] = '.'
    }
  }

  function isValid(board: string[][], row: number, col: number): boolean {
    // 检查row之前的所有col列是否存在皇后
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') {
        return false
      }
    }

    // 检测右上方是否存在皇后
    for (let i = row - 1, j = col + 1; i >= 0 && j >= 0; i--, j++) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }

    // 检测左上方是否存在皇后
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }

    return true;
  }

  backtrack(board, 0)

  return res.map((item) => {
    return item.map((options) => {
      return options.join('');
    })
  });
};