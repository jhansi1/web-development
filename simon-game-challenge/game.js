const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var isFirst = true;

function nextSequence() {
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("#level-title").html(`Level ${level}`);
    level++;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    // console.log("------------------------");
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
       /* console.log("success");
        console.log(userClickedPattern);
        console.log(gamePattern);
        console.log(currentLevel);*/
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence(), 1000);
        }

    } else {
        // console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
     
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    isFirst = true;
}

$(".btn").on("click", function() {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress", function(e) {
    if(isFirst) {
        nextSequence();
        isFirst = false;
    }
});
