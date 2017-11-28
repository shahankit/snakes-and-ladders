const VALID_INDICES = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];
// const VALID_INDICES = [1, 2];

export default class SLBoard {
  constructor(boardData, reversed = false, boardLength) {
    this.boardLength = boardLength;
    this.boardData = Object.assign({}, boardData);

    this.reversed = reversed;

    this.boardPathLength = [];
  }

  getValidIndices(index) {
    const allIndices = VALID_INDICES.map(item => index - item);
    const validIndices = [];

    allIndices.forEach((item) => {
      if (item < 1) {
        return;
      }

      const jumpIndex = this.boardData[item];
      const isSnake = jumpIndex < item;

      if (isSnake) {
        return;
      }

      const isLadder = jumpIndex > item;
      if (isLadder) {
        validIndices.push(jumpIndex);
      }

      validIndices.push(item);
    });

    return validIndices;
  }

  getMinimumPathArray() {
    const boardLength = this.boardLength;

    const indexStack = [{
      fromIndex: boardLength,
      toIndex: boardLength,
      diceValue: 0
    }];

    while (indexStack.length > 0) {
      const selectedIndexInfo = indexStack.pop();

      const { fromIndex, toIndex, diceValue } = selectedIndexInfo;

      // set path/pathLength for fromIndex
      // // if path from toIndex does not exists, the skip
      // // if fromIndex == boardLength, set as [] (basecase)
      // // if ladder exists from fromIndex to toIndex, set as pathLength[toIndex]
      // // if pathLength[fromIndex] does not exist, set as 1 + pathLength[toIndex]
      // // if pathLength[fromIndex] > (1 + pathLength[toIndex]), set as 1 + pathLength[toIndex]

      let pathLengthUpdated = false;

      // set path/pathLength for fromIndex
      if (fromIndex === boardLength) {
        // if fromIndex == boardLength, set as [] (basecase)
        this.boardPathLength[fromIndex] = [];
        pathLengthUpdated = true;
      } else if (!this.boardPathLength[toIndex]) {
        // if path from toIndex does not exists, the skip
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
        if (jumpIndex > parseInt(key) && jumpIndex === fromIndex) {
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
      if (this.boardData[fromIndex] < fromIndex) {
        // snake exists from fromIndex
        const snakeIndex = this.boardData[fromIndex];
        newToIndex = snakeIndex;
      } else {
        newToIndex = fromIndex;
      }

      const childNodes = VALID_INDICES.map(indexOffset => fromIndex - indexOffset).filter(item => item > -1);
      childNodes.forEach((nodeIndex) => {
        indexStack.unshift({
          fromIndex: nodeIndex,
          toIndex: newToIndex,
          diceValue: fromIndex - nodeIndex
        });
      });
    }

    return this.boardPathLength;
  }

  getMininumPathFromIndex(startIndex) {
    if (this.boardPathLength[startIndex]) {
      return this.boardPathLength[startIndex];
    }

    const boardLength = this.boardData.length;
    const reversed = this.reversed;
    const destinationIndex = reversed ? 1 : boardLength - 2;
    if (startIndex === destinationIndex) {
      return [];
    }

    let minPathThrowCount = Number.MAX_SAFE_INTEGER;
    let minPath = [];
    let minEdgeIndex = -1;

    const nextEdgeIndices = VALID_INDICES.map(
      offset => (reversed ? startIndex - offset : startIndex + offset)
    );

    nextEdgeIndices.forEach((edgeIndex) => {
      const isInvalidIndex = reversed ? edgeIndex < destinationIndex : edgeIndex > destinationIndex;
      if (isInvalidIndex) {
        return;
      }

      const boardValue = this.boardData[edgeIndex];
      const isSnake = boardValue < 0;
      const isLadder = boardValue > 0;

      let finalIndex = edgeIndex;

      if (isSnake) {
        return;
      } else if (isLadder) {
        finalIndex = boardValue;
      }

      const path = this.getMininumPathFromIndex(finalIndex);
      this.boardPathLength[finalIndex] = path;
      this.boardPathLength[edgeIndex] = path;

      const diceValue = reversed ? startIndex - edgeIndex : edgeIndex - startIndex;
      const pathThrowCount = path.length + Math.ceil(diceValue / 6);
      if (pathThrowCount < minPathThrowCount) {
        minPathThrowCount = pathThrowCount;
        minPath = path;
        minEdgeIndex = edgeIndex;
      }
    });

    if (minPathThrowCount === Number.MAX_SAFE_INTEGER) {
      throw new Error(`Invalid board configuration. No available path from ${startIndex}`);
    }

    const diceValue = reversed ? startIndex - minEdgeIndex : minEdgeIndex - startIndex;
    const diceValueArray = [];
    for (let i = diceValue - 6; i > 0; i -= 6) {
      diceValueArray.push(6);
    }
    diceValueArray.push(diceValue % 6);
    return [...diceValueArray, ...minPath];
  }

  getCalculatedPathBoard() {
    if (this.boardPathLength.length === 0) {
      const reversed = this.reversed;
      const startIndex = reversed ? this.boardData.length - 1 : 0;

      const minPathFromStartIndex = this.getMininumPathFromIndex(startIndex);
      this.boardPathLength[startIndex] = minPathFromStartIndex;
    }

    return this.boardPathLength;
  }
}
