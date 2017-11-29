const VALID_INDICES = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];
// const VALID_INDICES = [1, 2, 3];

export default class SLBoard {
  constructor(boardData, reversed = false, boardLength) {
    this.boardLength = boardLength;
    this.reversed = reversed;
    this.boardData = Object.assign({}, boardData);

    this.boardPathLength = [];
  }

  static isLadder(fromIndex, toIndex, reversed) {
    return reversed ? toIndex < fromIndex : toIndex > fromIndex;
  }

  static isSnake(fromIndex, toIndex, reversed) {
    return reversed ? toIndex > fromIndex : toIndex < fromIndex;
  }

  getMinimumPathArray() {
    const boardLength = this.boardLength;
    const reversed = this.reversed;

    const winningPosition = reversed ? 1 : boardLength;

    const indexStack = [{
      fromIndex: winningPosition,
      toIndex: winningPosition,
      diceValue: 0
    }];

    while (indexStack.length > 0) {
      const selectedIndexInfo = indexStack.pop();

      const { fromIndex, toIndex, diceValue } = selectedIndexInfo;

      // set path/pathLength for fromIndex
      // // if path from toIndex does not exists, the skip
      // // if fromIndex == winningPosition, set as [] (basecase)
      // // if ladder exists from fromIndex to toIndex, set as pathLength[toIndex]
      // // if pathLength[fromIndex] does not exist, set as 1 + pathLength[toIndex]
      // // if pathLength[fromIndex] > (1 + pathLength[toIndex]), set as 1 + pathLength[toIndex]

      let pathLengthUpdated = false;

      // set path/pathLength for fromIndex
      if (fromIndex === winningPosition) {
        // if fromIndex == winningPosition, set as [] (basecase)
        this.boardPathLength[fromIndex] = [];
        pathLengthUpdated = true;
      } else if (!this.boardPathLength[toIndex]) {
        // if path from toIndex does not exists, the skip. Never try to find something from unknown.
        continue;
      } else if (this.boardData[fromIndex] === toIndex) {
        // if ladder exists from fromIndex to toIndex, set as pathLength[toIndex]
        this.boardPathLength[fromIndex] = this.boardPathLength[toIndex];
        pathLengthUpdated = true;
      } else if (!this.boardPathLength[fromIndex]) {
        // if pathLength[fromIndex] does not exist, set as 1 + pathLength[toIndex]
        this.boardPathLength[fromIndex] = [diceValue, ...this.boardPathLength[toIndex]];
        pathLengthUpdated = true;
      } else if (this.boardPathLength[fromIndex].length > (1 + this.boardPathLength[toIndex].length)) {
        // if pathLength[fromIndex] > (1 + pathLength[toIndex]), set as 1 + pathLength[toIndex]
        this.boardPathLength[fromIndex] = [diceValue, ...this.boardPathLength[toIndex]];
        pathLengthUpdated = true;
      }

      if (!pathLengthUpdated) {
        continue;
      }

      // add any nodes which have ladder to fromIndex (unshift)
      const ladderNodes = [];
      Object.keys(this.boardData).forEach((key) => {
        const jumpIndex = this.boardData[key];
        const isLadder = SLBoard.isLadder(parseInt(key), jumpIndex, reversed);
        if (isLadder && jumpIndex === fromIndex) {
          ladderNodes.push(parseInt(key));
        }
      });
      ladderNodes.forEach((nodeIndex) => {
        indexStack.unshift({
          fromIndex: nodeIndex,
          toIndex: fromIndex,
          diceValue: 0
        });
      });

      // add children nodes of fromIndex
      // // if no snake from fromIndex, add children nodes with toIndex as selectedIndex (unshift)
      // // else add children nodes with toIndex as snakeIndex (unshift)
      let newToIndex = -1;
      const isSnake = SLBoard.isSnake(fromIndex, this.boardData[fromIndex], reversed);
      if (isSnake) {
        // snake exists from fromIndex
        const snakeIndex = this.boardData[fromIndex];
        newToIndex = snakeIndex;
      } else {
        newToIndex = fromIndex;
      }

      const childNodes =
        VALID_INDICES
          .map(indexOffset => (reversed ? fromIndex + indexOffset : fromIndex - indexOffset))
          .filter(item => (reversed ? item <= (boardLength + 1) : item >= 0));
      childNodes.forEach((nodeIndex) => {
        indexStack.unshift({
          fromIndex: nodeIndex,
          toIndex: newToIndex,
          diceValue: reversed ? nodeIndex - fromIndex : fromIndex - nodeIndex
        });
      });
    }

    return this.boardPathLength;
  }
}
