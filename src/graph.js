const BOARD_HEIGHT = 7;
const BOARD_WIDTH = 7;
const KNIGHT_MOVEMENT_ONE = 1;
const KNIGHT_MOVEMENT_TWO = 2;

export default class Graph {
  constructor() {
    this.board = this.buildBoard();
    this.nodeList = this.populateNodeList();
  }

  buildBoard() {
    //build the game board
    //because of the way arrays work, [0, 0] is in the top left and [7, 7] is in the bottom right, mirroring a chess board horizontally
    //0  1  2  3  4  5  6  7
    //|  |  |  |  |  |  |  |
    //56 57 58 59 60 61 62 63
    let board = [];
    for (let i = 0; i <= BOARD_HEIGHT; i++) {
      let row = [];
      for (let j = 0; j <= BOARD_WIDTH; j++) {
        row.push([j, i]);
      }
      board.push(row);
    }
    return board;
  }

  populateNodeList() {
    //populate the list of nodes
    //similar to the game board function
    let nodeArr = [];
    for (let i = 0; i <= BOARD_HEIGHT; i++) {
      let row = [];
      for (let j = 0; j <= BOARD_WIDTH; j++) {
        row.push(new Node([j, i]));
      }
      nodeArr.push(row);
    }
    return nodeArr;
  }

  findShortestPath(startPoint, endPoint) {
    //a BFS function to find the quickest path from any given position on the board [startPoint] to another given point [endPoint]
    let queueArr = [startPoint]; //a queue is necessary for BFS functions
    let previousArr = [
      [null, null, null, null, null, null, null, null], //this function will keep track of edges between
      [null, null, null, null, null, null, null, null], //vertices using this previousArr. each cell holds:
      [null, null, null, null, null, null, null, null], // {
      [null, null, null, null, null, null, null, null], //      position: (position of the current node)
      [null, null, null, null, null, null, null, null], //      parent: (position of the parent node)
      [null, null, null, null, null, null, null, null], // }
      [null, null, null, null, null, null, null, null], //once the endPoint is reached, the function will
      [null, null, null, null, null, null, null, null], //retrace its steps using this array
    ];
    previousArr[startPoint[1]][startPoint[0]] = {
      position: startPoint,
      parent: null
    }
    while (queueArr.length !== 0) {
      let currentPosition = queueArr.shift();
      let currentNode = this.nodeList[currentPosition[1]][currentPosition[0]]; //log the current node

      if (!currentNode.visited) {
        //if this node has already been visited, we dont need to check it again
        currentNode.visited = true; //if it hasn't, mark it as visited
        for (let index in currentNode.potentialMoves) {
          //for each neighboring node...
          let nextNode =
            this.nodeList[currentNode.potentialMoves[index][1]][
              currentNode.potentialMoves[index][0]
            ];

          if (
            previousArr[currentNode.potentialMoves[index][1]][
              currentNode.potentialMoves[index][0]
            ] === null
          ) {
            //log the neighboring node into previousArr if it doesnt already exist
            previousArr[nextNode.position[1]][nextNode.position[0]] = {
              position: nextNode.position,
              parent: currentNode.position,
            };

            if (
              currentNode.potentialMoves[index][0] === endPoint[0] &&
              currentNode.potentialMoves[index][1] === endPoint[1]
            ) {
              //if we reach the destination, clear the queue and break the loop
              queueArr = [];
              break;
            }
          }
          queueArr.push(currentNode.potentialMoves[index]);
        }
      }
    }
    console.log(previousArr);
    let pathArr = []; //this function returns an array of the path to the destination
    let currentItem = previousArr[endPoint[1]][endPoint[0]];
    console.log(currentItem);
    while (
      currentItem.position[0] !== startPoint[0] ||
      currentItem.position[1] !== startPoint[1]
    ) {
      pathArr.push(currentItem.position);
      currentItem = previousArr[currentItem.parent[1]][currentItem.parent[0]];
    }
    pathArr.push(startPoint);
    return pathArr.reverse(); //want the array to be startPoint => endPoint
  }
}

class Node {
  constructor(position) {
    this.position = position;
    this.potentialMoves = this.calculatePotentialMoves();
    this.visited = false;
  }

  calculatePotentialMoves() {
    let potentialMoves = [];
    if (0 <= this.position[0] - KNIGHT_MOVEMENT_ONE) {
      if (0 <= this.position[1] - KNIGHT_MOVEMENT_TWO) {
        potentialMoves.push([
          this.position[0] - KNIGHT_MOVEMENT_ONE,
          this.position[1] - KNIGHT_MOVEMENT_TWO,
        ]);
      }
      if (this.position[1] + KNIGHT_MOVEMENT_TWO <= BOARD_HEIGHT) {
        potentialMoves.push([
          this.position[0] - KNIGHT_MOVEMENT_ONE,
          this.position[1] + KNIGHT_MOVEMENT_TWO,
        ]);
      }
    }

    if (this.position[0] + KNIGHT_MOVEMENT_ONE <= BOARD_WIDTH) {
      if (0 <= this.position[1] - KNIGHT_MOVEMENT_TWO) {
        potentialMoves.push([
          this.position[0] + KNIGHT_MOVEMENT_ONE,
          this.position[1] - KNIGHT_MOVEMENT_TWO,
        ]);
      }
      if (this.position[1] + KNIGHT_MOVEMENT_TWO <= BOARD_HEIGHT) {
        potentialMoves.push([
          this.position[0] + KNIGHT_MOVEMENT_ONE,
          this.position[1] + KNIGHT_MOVEMENT_TWO,
        ]);
      }
    }

    if (0 <= this.position[0] - KNIGHT_MOVEMENT_TWO) {
      if (0 <= this.position[1] - KNIGHT_MOVEMENT_ONE) {
        potentialMoves.push([
          this.position[0] - KNIGHT_MOVEMENT_TWO,
          this.position[1] - KNIGHT_MOVEMENT_ONE,
        ]);
      }
      if (this.position[1] + KNIGHT_MOVEMENT_ONE <= BOARD_HEIGHT) {
        potentialMoves.push([
          this.position[0] - KNIGHT_MOVEMENT_TWO,
          this.position[1] + KNIGHT_MOVEMENT_ONE,
        ]);
      }
    }

    if (this.position[0] + KNIGHT_MOVEMENT_TWO <= BOARD_WIDTH) {
      if (0 <= this.position[1] - KNIGHT_MOVEMENT_ONE) {
        potentialMoves.push([
          this.position[0] + KNIGHT_MOVEMENT_TWO,
          this.position[1] - KNIGHT_MOVEMENT_ONE,
        ]);
      }
      if (this.position[1] + KNIGHT_MOVEMENT_ONE <= BOARD_HEIGHT) {
        potentialMoves.push([
          this.position[0] + KNIGHT_MOVEMENT_TWO,
          this.position[1] + KNIGHT_MOVEMENT_ONE,
        ]);
      }
    }
    return potentialMoves;
  }
}
