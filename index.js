var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var score = 0
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var isGameStarted = false
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['red', 'green', 'black', 'yellow', 'pink', 'blue']  


$start.addEventListener('click', startGame)
$game.addEventListener('click', handlerBoxClick)
$gameTime.addEventListener('input', setGameTime)





function startGame(){
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')
    isGameStarted = true
    var interval = setInterval(function(){
    var time = parseFloat($time.textContent)
    

    if (time <= 0){
        clearInterval(interval)
        endGame()


    }
    else{
        $time.textContent = (time - 0.1).toFixed(1)
    }
}, 100)

    renderBox()
}

function setGameScore(){
    $result.textContent = score.toString()
}


function handlerBoxClick(event) {
    if(!isGameStarted){
        return
    }
    if (event.target.dataset.box){
        score++
        renderBox()

        
    }
}


function setGameTime(){
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
}


function endGame(){
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('hide')
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')

}


function renderBox() {
    console.log(getRandom(30, 100))
    $game.innerHTML = ''
   var box = document.createElement('div')
   var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var  maxTop = gameSize.height - boxSize
    var  maxLeft = gameSize.width - boxSize
    var randomColor = getRandom(0, colors.length)

   box.style.height = box.style.width = boxSize + 'px'
   box.style.position = 'absolute'
   box.style.backgroundColor = colors[randomColor]
   box.style.top = getRandom(0, maxTop) + 'px'
   box.style.left = getRandom(0, maxLeft) + 'px'
   box.style.cursor = 'pointer'
   box.setAttribute('data-box', 'true')

   $game.insertAdjacentElement('afterbegin', box)
}



function getRandom(min, max){
    return Math.floor(Math.random() *(max-min) + min)
}