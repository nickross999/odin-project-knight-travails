import "./styles.css"
import Graph from "./graph.js"

let chessBoard = document.querySelector("#chess-board");
for (let i = 0; i !== 64; i++) {
    let row = Math.floor(i / 8) + 1
    let newDiv = document.createElement("div");
    if (i % 2 === 0 && row % 2 !== 0) {
        newDiv.classList.add("black");
    } else if (i % 2 !== 0 && row % 2 === 0) {
        newDiv.classList.add("black");
    }
    chessBoard.append(newDiv);
}

let graph = new Graph();
console.log(graph.findShortestPath([0,0], [7,7]))