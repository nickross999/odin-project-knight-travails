import "./styles.css"
import Graph from "./graph.js"

let startingPosition = null;
let endingPosition = null;
let instructions = document.querySelector("#instructions");
let path = document.querySelector("#path");
let findPathButton = document.querySelector("#find-path-btn");
let resetButton = document.querySelector("#reset-btn");

let chessBoard = document.querySelector("#chess-board");
for (let i = 0; i !== 64; i++) {
    let row = Math.floor(i / 8)
    let newDiv = document.createElement("div");
    newDiv.addEventListener("click", addPosition);
    newDiv.value = [i % 8, 7 - row];
    if (i % 2 === 0 && (row + 1) % 2 !== 0) {
        newDiv.classList.add("black");
    } else if (i % 2 !== 0 && (row + 1) % 2 === 0) {
        newDiv.classList.add("black");
    }
    chessBoard.append(newDiv);
}

findPathButton.addEventListener("click", () => {
    findPathButton.attributes.setNamedItem(document.createAttribute("disabled"));
    let graph = new Graph();
    let pathArr = graph.findShortestPath(startingPosition, endingPosition);
    for (let i = 0; i < pathArr.length; i++) {
        if (i === pathArr.length - 1) {
            path.textContent += `[${pathArr[i]}]`;
        } else {
            if (i !== 7 && i !== 0) {
                let chessSquares = document.querySelectorAll("#chess-board div");
                for (let j = 0; j < chessSquares.length; j++) {
                    if (chessSquares[j].value[0] == pathArr[i][0] && chessSquares[j].value[1] === pathArr[i][1]) {
                        chessSquares[j].classList.add("stop");
                    }
                }
            }
            path.textContent += `[${pathArr[i]}] => `;
        }
    }
})

resetButton.addEventListener("click", () => {
    startingPosition = null;
    endingPosition = null;
    instructions.textContent = "Click a square to choose the starting position.";
    path.textContent = "";
    let boardSquares = document.querySelectorAll("#chess-board div");
    boardSquares.forEach(square => {
        square.classList.remove("start", "end", "path", "stop");
    })
})

function addPosition(e) {
    if (startingPosition === null) {
        startingPosition = e.target.value;
        e.target.classList.add("start");
        instructions.textContent = "Click a square to set the ending position.";
    } else if (endingPosition === null) {
        endingPosition = e.target.value;
        e.target.classList.add("end");
        instructions.textContent = "Press the 'Find Path' button.";
        findPathButton.attributes.removeNamedItem("disabled");
    }
}