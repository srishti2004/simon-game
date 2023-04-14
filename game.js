
var buttonColours = ["red", "blue", "green", "yellow" ];
var gamePattern =[];
var userClickedPattern =[];
var started = false;
var level = 0;


$(document).on("keydown" ,function(){

    if(!started ){
            $("#level-title").text("Level " + level);
            nextSequence();
          started = true;
           
        }
    })



$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   
   playSound(userChosenColour);

   animatePress(userChosenColour);

   Checkanswer((userClickedPattern.length)-1);
   
   
});

function nextSequence() {

    userClickedPattern =[];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

     var selectedbtn = $("#" + randomChosenColour);
     $(selectedbtn).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

     playSound(randomChosenColour);
     
    
  
}
//playing sound by click
function playSound(name) {
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

//animating to user clicks

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")},100);
}

function Checkanswer(currentlevel) {
if(gamePattern[currentlevel] == userClickedPattern[currentlevel]){
    
          if(gamePattern.length == userClickedPattern.length){

           setTimeout(function() {
            nextSequence()
           },1000);
           
        }
    }       
else{
       
        playSound("wrong");
        $("body").addClass("game-over");
       setTimeout(function() {
        $("body").removeClass("game-over");
       }, 200);
       $("h1").text("Game Over, Press Any Key to Restart");
       startover();
    }

}

function startover() {
   level = 0;
   started = false;
   gamePattern =[]; 
}

