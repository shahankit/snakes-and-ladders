export default class SLBoard {
  constructor(boardData, reversed = false) {
    this.boardData = boardData.slice();
    this.reversed = reversed;
    // if (reversed) {
    //   const reversedBoard = this.boardData.slice(1).reverse();
    //   this.boardData = [0, ...reversedBoard];
    // }

    this.boardPathLengthData = [];
  }

  getMininumPathFromIndex(startIndex) {
    if (this.boardPathLengthData[startIndex]) {
      return this.boardPathLengthData[startIndex];
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

    const firstIndex = reversed ? startIndex - 1 : startIndex + 1;
    const lastIndex = reversed ? startIndex - 7 : startIndex + 7;

    for (
      let edgeIndex = firstIndex;
      edgeIndex !== lastIndex;
      reversed ? (edgeIndex -= 1) : (edgeIndex += 1)
    ) {
      const isInvalidIndex = reversed ? edgeIndex < destinationIndex : edgeIndex > destinationIndex;
      if (isInvalidIndex) {
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

    const diceValue = reversed ? (startIndex - minEdgeIndex) : (minEdgeIndex - startIndex);
    return [diceValue, ...minPath];
  }

  getCalculatedPathBoard() {
    if (this.boardPathLengthData.length === 0) {
      const reversed = this.reversed;
      const startIndex = reversed ? this.boardData.length - 1 : 0;

      const minPathFromStartIndex = this.getMininumPathFromIndex(startIndex);
      this.boardPathLengthData[startIndex] = minPathFromStartIndex;

      // const reversed = this.reversed;
      // if (reversed) {
      //   const boardPathLengthDataReversed = this.boardPathLengthData.slice(1).reverse();
      //   this.boardPathLengthData = [
      //     minPathFromZero,
      //     ...boardPathLengthDataReversed
      //   ];
      // }
    }

    return this.boardPathLengthData;
  }
}
