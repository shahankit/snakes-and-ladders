const VALID_INDICES = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];

export default class SLBoard {
  constructor(boardData, reversed = false) {
    this.boardData = boardData.slice();
    this.reversed = reversed;

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
      this.boardPathLengthData[finalIndex] = path;
      this.boardPathLengthData[edgeIndex] = path;

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
    if (this.boardPathLengthData.length === 0) {
      const reversed = this.reversed;
      const startIndex = reversed ? this.boardData.length - 1 : 0;

      const minPathFromStartIndex = this.getMininumPathFromIndex(startIndex);
      this.boardPathLengthData[startIndex] = minPathFromStartIndex;
    }

    return this.boardPathLengthData;
  }
}
