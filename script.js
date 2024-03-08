let grid = [];
let score = 0;
let gameOver = false;

document.addEventListener("DOMContentLoaded", () => {
    setup();
    document.addEventListener("keydown", keyPressed);
    document.getElementById("resetButton").addEventListener("click", resetGame);
});

function setup() {
    createGrid();
    addNewTile();
    addNewTile();
    updateGrid();
    updateScore();
    gameOver = false;
    document.getElementById("message").innerText = "";
}

function createGrid() {
    for (let i = 0; i < 4; i++) {
        grid[i] = [];
        for (let j = 0; j < 4; j++) {
            grid[i][j] = 0;
        }
    }
}

function addNewTile() {
    let availableSpots = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                availableSpots.push({ x: i, y: j });
            }
        }
    }
    if (availableSpots.length > 0) {
        let spot = random(availableSpots);
        grid[spot.x][spot.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateGrid() {
    let gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let tile = grid[i][j];
            let tileDiv = document.createElement("div");
            tileDiv.className = "tile";
            if (tile !== 0) {
                tileDiv.innerText = tile;
                tileDiv.style.backgroundColor = getTileColor(tile);
            }
            gridContainer.appendChild(tileDiv);
        }
    }
}

function getTileColor(value) {
    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#edc850";
        case 1024: return "#edc53f";
        case 2048: return "#edc22e";
        default: return "#ccc0b3";
    }
}

function keyPressed(event) {
    if (gameOver) {
        return;
    }

    let moved = false;

    if (event.key === "ArrowUp" || event.key === "w") {
        moved = moveUp();
    } else if (event.key === "ArrowDown" || event.key === "s") {
        moved = moveDown();
    } else if (event.key === "ArrowLeft" || event.key === "a") {
        moved = moveLeft();
    } else if (event.key === "ArrowRight" || event.key === "d") {
        moved = moveRight();
    }

    if (moved) {
        addNewTile();
        updateGrid();
        updateScore();
        checkGameOver();
    }
}

function moveUp() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (grid[i][j] !== 0) {
                let currentValue = grid[i][j];
                let row = i - 1;
                while (row >= 0 && grid[row][j] === 0) {
                    grid[row][j] = currentValue;
                    grid[row + 1][j] = 0;
                    row--;
                    moved = true;
                }
                if (row >= 0 && grid[row][j] === currentValue) {
                    grid[row][j] *= 2;
                    grid[i][j] = 0;
                    score += grid[row][j];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (grid[i][j] !== 0) {
                let currentValue = grid[i][j];
                let row = i + 1;
                while (row < 4 && grid[row][j] === 0) {
                    grid[row][j] = currentValue;
                    grid[row - 1][j] = 0;
                    row++;
                    moved = true;
                }
                if (row < 4 && grid[row][j] === currentValue) {
                    grid[row][j] *= 2;
                    grid[i][j] = 0;
                    score += grid[row][j];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (grid[i][j] !== 0) {
                let currentValue = grid[i][j];
                let col = j - 1;
                while (col >= 0 && grid[i][col] === 0) {
                    grid[i][col] = currentValue;
                    grid[i][col + 1] = 0;
                    col--;
                    moved = true;
                }
                if (col >= 0 && grid[i][col] === currentValue) {
                    grid[i][col] *= 2;
                    grid[i][j] = 0;
                    score += grid[i][col];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (grid[i][j] !== 0) {
                let currentValue = grid[i][j];
                let col = j + 1;
                while (col < 4 && grid[i][col] === 0) {
                    grid[i][col] = currentValue;
                    grid[i][col - 1] = 0;
                    col++;
                    moved = true;
                }
                if (col < 4 && grid[i][col] === currentValue) {
                    grid[i][col] *= 2;
                    grid[i][j] = 0;
                    score += grid[i][col];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function updateScore() {
    document.getElementById("scoreValue").innerText = score;
}

function resetGame() {
    grid = [];
    score = 0;
    setup();
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function checkGameOver() {
    let gameCleared = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 2048) {
                gameCleared = true;
                break;
            }
        }
    }

    if (gameCleared) {
        document.getElementById("message").innerText = "Level cleared! Your code2 is: YEAR BEEN -BUBU YEAR AN";
        gameOver = true;
    } else {
        // Check if any empty spots or adjacent tiles with the same value
        gameOver = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) {
                    gameOver = false;
                    break;
                }
                if (i + 1 < 4 && grid[i][j] === grid[i + 1][j]) {
                    gameOver = false;
                    break;
                }
                if (j + 1 < 4 && grid[i][j] === grid[i][j + 1]) {
                    gameOver = false;
                    break;
                }
            }
        }
    }

    if (gameOver) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }
}
