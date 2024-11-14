var canvas, gameContainer, scoreContainer, ctx, audioWin, audioLose

/***  CANVAS PROPERTY */
const canvasSize = 400
const canvasBorder = "3px solid red"
const canvasBackgroundColor = "#1d1d1d"
const canvasOpacity = "0.8"
/***  SCORE PROPERTY */
var score = 0
const scoreColor = "#fff"
/***  SNACK PROPERTY */
const snackColor = "orange"
const snackSize = 20
var blockUnit = canvasSize / snackSize
var snackX = Math.trunc(Math.random() * blockUnit) * snackSize
var snackY = Math.trunc(Math.random() * blockUnit) * snackSize
/**  FOOD PROPERTY */
var rayonFood = snackSize / 2
var foodX = Math.trunc(Math.random() * blockUnit) * snackSize+ rayonFood
var foodY = Math.trunc(Math.random() * blockUnit) * snackSize+ rayonFood
/***  STEP PROPERTY */
var stepX = 0
var stepY = 0


export const SnackGame = {
    start: () => {
        SnackGame.initMedia()
        SnackGame.createCanvas()
        SnackGame.createSnack()
        SnackGame.initMoveSnack()
        setInterval(SnackGame.updateSnackPosition, 100)

    },
    createCanvas: () => {
        gameContainer = document.createElement("div")
        scoreContainer = document.createElement("div")
        scoreContainer.id = "score"
        scoreContainer.innerHTML = new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD"}).format(score)
        scoreContainer.style.color = scoreColor
        scoreContainer.style.fontSize = "50px"
        scoreContainer.style.zIndex = 1000
        scoreContainer.style.position = "fixed"

        gameContainer.id = "game-container"
        canvas = document.createElement("canvas")
        canvas.width = canvasSize
        canvas.height = canvasSize
        canvas.style.border = canvasBorder
        canvas.style.opacity = canvasOpacity
        canvas.style.backgroundColor = canvasBackgroundColor
        // canvas.style.display = "block"
        // canvas.style.marginLeft = "auto"
        // canvas.style.marginRight = "auto"
        // console.log(canvas);
        gameContainer.style.display = "flex"
        gameContainer.style.justifyContent = "center"
        gameContainer.style.alignItems = "center"

        ctx = canvas.getContext("2d")
        gameContainer.appendChild(scoreContainer)
        gameContainer.appendChild(canvas)
        document.body.appendChild(gameContainer)
    },
    initMedia: ()=>{
        audioWin = document.createElement("audio")
        audioWin.src = "/assets/media/win.mp3"
        audioLose = document.createElement("audio")
        audioLose.src = "/assets/media/lose.mp3"
    },
    createSnack: () => {
        ctx.fillStyle = snackColor
        ctx.clearRect(0, 0, canvasSize, canvasSize)
        ctx.fillRect(snackX, snackY, snackSize, snackSize)
        SnackGame.createFood()
    },
    createFood: () =>{
        ctx.beginPath();
        ctx.arc(foodX, foodY, rayonFood, 0, 2 * Math.PI);
        ctx.fillStyle = snackColor
        ctx.fill()
        ctx.closePath()
    },
    updateSnackPosition: () => {
        snackX += stepX * snackSize
        snackY += stepY * snackSize
        SnackGame.createSnack()
        SnackGame.checkClase()
    },
    initMoveSnack: () => {
        document.addEventListener("keydown", (event) => {
            console.log(event.key);
            switch (event.key) {
                case "ArrowUp":
                    stepY = -1
                    stepX = 0
                    break;
                case "ArrowDown":
                    stepY = 1
                    stepX = 0
                    break;
                case "ArrowLeft":
                    stepY = 0
                    stepX = -1
                    break;
                case "ArrowRight":
                    stepY = 0
                    stepX = 1
                    break;
                case "p":
                    stepY = 0
                    stepX = 0
                    break;
                case "P":
                    stepY = 0
                    stepX = 0
                    break;
                case " ":
                    stepY = 0
                    stepX = 0
                    break;

                default:
                    break;
            }
        })
    },
    checkClase: () =>{
        if((snackX <0 || snackX > (canvasSize - snackSize))|| (snackY < 0 || snackY > (canvasSize -snackSize)) ){
            // ERROR
            console.log("ERROR");
            audioLose.play()
            SnackGame.updateScore(score - 20)
            stepX = 0
            stepY = 0
            snackX = Math.trunc(Math.random() * blockUnit) * snackSize
            snackY = Math.trunc(Math.random() * blockUnit) * snackSize
        }else if(((foodX - rayonFood) === snackX) && ((foodY -rayonFood) === snackY)){
            // WIN
            console.log("WIN");
            SnackGame.updateScore(score + 10)
            audioWin.play()
            foodX = Math.trunc(Math.random() * blockUnit) * snackSize+ rayonFood
            foodY = Math.trunc(Math.random() * blockUnit) * snackSize+ rayonFood
        }
    },
    updateScore: (newScore)=>{
        if(newScore !== score){
            scoreContainer.innerHTML = new Intl.NumberFormat("en-US",
            {style: "currency", currency: "USD"}).format(newScore)
            score = newScore
        }
    }
}