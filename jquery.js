 
var playing = false;
var score;
var livesleft;
var fallstep;
var downfall;
var fruits = ['apple', 'Banana', 'Grapes', 'mango', 'Orange', 'papaya', 'pear', 'pineapple', 'watermelon'];
$ (function() {
    //click start/reset button
    $("#start-reset").click(function() {
        // Check if we are on a playing mode
        if (playing) {
            // Reload the page
            location.reload();
    } else {
        // Turn to playing mode
        playing = true;
        //Change Start Game to Reset Game
        $(this).text("Reset Game");
        // Reset the score
        score = 0;
        $("#scorevalue").html(score);
        
        // Fill the lives box with 3 hearts and show it 
        $("#lives").show();
        livesleft = 3;
        Addlives();
        $('#gameover').hide();
        gameAction();
    }
}); 


function gameAction() {
        
        $("#fruit1").show();
    
        //pick a random fruit
        pickFruit();

        // Fruit emerges from a random position
        $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});

        // generate a random fruit falling step
        fallstep =  1 + Math.round(5 * Math.random());

        // Move the fruit down every 10ms
        downfall = setInterval(function() {
            $("#fruit1").css('top', $("#fruit1").position().top + fallstep);

            // Check if the fruit passes the screen without being sliced
        if ($("#fruit1").position().top > $("#screen").height()) {
            if (livesleft > 1) {
                $("#fruit1").show();
    
                //pick a random fruit
                pickFruit();

                // Fruit emerges from a random position
                $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});

                // generate a random fruit falling step
                fallstep = 1 * Math.round(5 * Math.random());
                
                // Reduce hearts
                livesleft--;
                
                //Populate the with correct amount of hearts
                Addlives();
                
            } else {
                playing = false;
                $('#start-reset').html('Start Game');
                $('#gameover').show();
                $('#lives').hide();
                $('#gameover').html('<p>GAME OVER!</p><p>YOUR SCORE IS '+ score +'</p>');

                stopDownfall();
            }  
        }

        }, 10);
}

 //Slice the fruit
 $('#fruit1').mouseover(function () {
    score++;
    $('#scorevalue').html(score);
    $('#slice')[0].play();
    //stop the fruit
    clearInterval(downfall);
    //Explode the fruit
    $('#fruit1').hide('explode', 500);
    // send new fruit
    setTimeout(gameAction, 500);
});
       

//Functions

   function Addlives() {
    $("#lives").empty();
    for (i = 0; i < livesleft; i++) {
        $("#lives").append(' <img src="images/life.png" class="life"> ');
    }
}

function pickFruit() {
  // get a fruit attribute from its source(randomly)
    $("#fruit1").attr('src', 'images/'+ fruits[Math.round(5*Math.random())] +'.png');
}
});

function stopDownfall() {
    clearInterval(downfall);
    $('#fruit1').hide();
    downfall = null;
}
