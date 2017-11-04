export default class SLBoard {
  constructor(boardData) {
    this.boardData = boardData;
    this.boardPathLengthData = [];
  }

  getMininumPathFromIndex(startIndex) {
    if (this.boardPathLengthData[startIndex]) {
      return this.boardPathLengthData[startIndex];
    }

    const boardLength = this.boardData.length;
    if (startIndex === (boardLength - 1)) {
      return [];
    }

    let minPathThrowCount = Number.MAX_SAFE_INTEGER;
    let minPath = [];
    let minEdgeIndex = -1;

    for (let edgeIndex = startIndex + 6; edgeIndex > startIndex; edgeIndex -= 1) {
      if (edgeIndex >= boardLength) {
        continue;
      }

      const boardValue = this.boardData[edgeIndex];
      const isSnake = boardValue < 0;
      const isLadder = boardValue > 0;

      let finalIndex = edgeIndex;

      if (isSnake) {
        continue;
      } else if (isLadder) {
        finalIndex = boardValue;
      }

      const path = this.getMininumPathFromIndex(finalIndex);
      this.boardPathLengthData[finalIndex] = path;
      this.boardPathLengthData[edgeIndex] = path;

      const pathThrowCount = path.length;
      if (pathThrowCount < minPathThrowCount) {
        minPathThrowCount = pathThrowCount;
        minPath = path;
        minEdgeIndex = edgeIndex;
      }
    }

    if (minPathThrowCount === Number.MAX_SAFE_INTEGER) {
      throw new Error(`Invalid board configuration. No available path from ${startIndex}`);
    }

    return [(minEdgeIndex - startIndex), ...minPath];
  }

  getCalculatedPathBoard() {
    if (this.boardPathLengthData.length === 0) {
      const minIndexFromtZero = this.getMininumPathFromIndex(0);
      this.boardPathLengthData[0] = minIndexFromtZero;
    }

    return this.boardPathLengthData;
  }
}
