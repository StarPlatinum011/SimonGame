let userClickedPattern = [];
const gamePattern=[];
const buttonColors = ["red", "green", "blue", "yellow"];

let level = 0;
let started = false;

// check if the key is pressed or not 
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("LEVEL : "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").on('click', function() {

    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("LEVEL : "+level);

    //generation of random 0-3
    let randNumber = Math.floor(Math.random()*4);
    //store random color from array
    const randomChosenColor = buttonColors[randNumber];
    //add into new array
    gamePattern.push(randomChosenColor);
    console.log('this is : ', gamePattern);

    //creating animation on the boxes
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);   

    playSound(randomChosenColor);
}

function playSound(name) {
    //audio creation for the animation
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");

    //remove the gray animation on after click with delay
    setTimeout(() => {
        $('.'+currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {

    alert(currentLevel);

    //check if the user and generated last input are same
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success...");

        // now check if they have same pattern (length)
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Failed...")
    }
}


