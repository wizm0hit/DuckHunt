let ducks = [];
let duckCount = 1;

const duckLeft = "./assets/images/duck-left.gif";
const duckRight = "./assets/images/duck-right.gif";
const duckFall = "./assets/images/duck_fall.png";
let duckImageNames = [duckLeft, duckRight, duckFall];
let duckWidth = 96;
let duckHeight = 93;
let duckVelocityX = 5;
let duckVelocityY = 5;

let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight * 3/4;

let score = 0;

let flapSound = null;
let quackInterval = null;

window.onresize = function() {
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight * 3/4;
};

window.onload = function() {
    setTimeout(addDucks, 2000);
    setInterval(moveDucks, 1000/60);
};

function startAmbientAudio() {
    if (!flapSound) {
        flapSound = new Audio("./assets/audio/duck-flappingg.mp3");
        flapSound.loop = true;
    }
    flapSound.play().catch(e => console.log("Audio waiting for user interaction..."));

    if (!quackInterval) {
        quackInterval = setInterval(() => {
            if (ducks.length > 0) {
                let quackSound = new Audio("./assets/audio/duck-quack.mp3");
                quackSound.play();
            }
        }, 2500);
    }
}

function stopAmbientAudio() {
    if (flapSound) {
        flapSound.pause();
    }
    if (quackInterval) {
        clearInterval(quackInterval);
        quackInterval = null;
    }
}

function addDucks() {
    ducks = [];
    duckCount = Math.floor(Math.random() * 2) + 1;
    
    startAmbientAudio();

    for (let i = 0; i < duckCount; i++) {

        let directionIndex = Math.floor(Math.random() * 2); 
        let duckImageName = duckImageNames[directionIndex];

        let duckImage = document.createElement("img");
        duckImage.src = duckImageName;
        duckImage.width = duckWidth;
        duckImage.height = duckHeight;
        duckImage.draggable = false;
        duckImage.style.position = "absolute";
        
        duckImage.onmousedown = function(event) {
            let padding = 15; 
            let rect = this.getBoundingClientRect();
            
            let clickX = event.clientX - rect.left;
            let clickY = event.clientY - rect.top;

            if (
                clickX >= padding && 
                clickX <= (duckWidth - padding) &&
                clickY >= padding && 
                clickY <= (duckHeight - padding)
            ) {
                this.onmousedown = null; 
                
                let duckShotSound = new Audio("./assets/audio/duck-shot.mp3");
                duckShotSound.play();
                score++;
                document.getElementById("score").innerHTML = String(score);
                
                duckImage.src = duckFall;
                
                ducks = ducks.filter(d => d.image !== this);

                setTimeout(() => {
                    if (duckImage.parentNode) {
                        document.body.removeChild(duckImage);
                    }
                    
                    if (ducks.length === 0) {
                        stopAmbientAudio();
                        addDog();
                    }
                }, 1000);
            }
        };
        document.body.appendChild(duckImage);

        let actualVelocityX = (directionIndex === 0) ? -duckVelocityX : duckVelocityX;

        let duck = {
            image: duckImage,
            x: randomPosition(gameWidth - duckWidth),
            y: randomPosition(gameHeight - duckHeight),
            velocityX: actualVelocityX,
            velocityY: duckVelocityY
        };

        duck.image.style.left = String(duck.x) + "px";
        duck.image.style.top = String(duck.y) + "px";

        ducks.push(duck);
    }
}

function moveDucks() {
    for (let i = 0; i < ducks.length; i++) {
        let duck = ducks[i];
        
        duck.x += duck.velocityX;
        if (duck.x < 0 || duck.x > gameWidth - duckWidth) {
            duck.x -= duck.velocityX;
            duck.velocityX = -duck.velocityX;
            
            if (duck.velocityX < 0) {
                duck.image.src = duckImageNames[0];
            } else {
                duck.image.src = duckImageNames[1];
            }
        }
        
        duck.y += duck.velocityY;
        if (duck.y < 0 || duck.y > gameHeight - duckHeight) {
            duck.y -= duck.velocityY;
            duck.velocityY = -duck.velocityY;
        }

        duck.image.style.left = String(duck.x) + "px";
        duck.image.style.top = String(duck.y) + "px";
    }
}

function addDog() {
    let dogImage = document.createElement("img");
    if (duckCount === 1) {
        dogImage.src = "./assets/images/dog-duck1.png";
        dogImage.width = 172;
    } else {
        dogImage.src = "./assets/images/dog-duck2.png";
        dogImage.width = 224;
    }
    dogImage.height = 152;
    dogImage.draggable = false;

    dogImage.style.position = "fixed";
    dogImage.style.bottom = "0px";
    dogImage.style.left = "50%";
    dogImage.style.transform = "translateX(-50%)";
    document.body.appendChild(dogImage);

    let dogScoreSound = new Audio("./assets/audio/dog-score.mp3");
    dogScoreSound.play();

    setTimeout(function() {
        if (dogImage.parentNode) {
            document.body.removeChild(dogImage);
        }
        addDucks();
    }, 5000);
}

function randomPosition(limit) {
    return Math.max(0, Math.floor(Math.random() * limit));
}