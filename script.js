//Pseudocode
/*Create board layout for podiums. Use different size div's for placement.
Make timer that gives certain amount of time to click event, before counting against
player. Make player1 & player2 functions. Award points for hitting the correct 'Wonk'
and take away a players chances for a wrong 'Wonk'. A hit on the wrong 'Wonk' will
deduct a 'life or chance' and a right hit will award points. Once the timer is up
it is player2's turn to 'Whack the Wonk'.
*/

var images = [
  {
    value: -1,
    url: "AbrahamLincoln.jpg",
    wonk: false
  }, {
    value: 5,
    url: "DonaldTrump.png",
    wonk: true
  }, {
    value: -2,
    url: "Frankenstein.jpg",
    wonk: false
  }, {
    value: 2,
    url: "HillaryClinton.jpg",
    wonk: false
  }, {
    value: -2,
    url: "JerryGarcia.jpg",
    wonk: false
  }
]
var podiums = $('.podiums')
// var scoreBox =
var game = {
  score: 0
}
var playerScoreBox = document.getElementById('playerScore');
var player1 = 0
var player2 = 0
var seconds = 30
var timeInterval;
var turn = 1;
var timerCount = 1000;
// var scoreBox = $('')

$('body').css('cursor', 'url(images/poop.png), auto');

$(podiums[randomInt(6)]).html('<img src="DonaldTrump.png" alt="">')

podiums.on('click', function() {
  var player;
  var _value = parseInt($(this).val());

  console.log("wonk?", $(this).data("wonk"))

  if ($(this).data("wonk")) {
    console.log('You whacked the wonk');

    if (turn === 1) {
      player1 += _value;
      displayScore(player1)
    } else {
      player2 += _value;
      displayScore(player2)
    }

// make points awarded for whacking correct wonk
// deduct points for whacking incorrect wonk
var nextPodium = randomInt(6)
console.log(nextPodium)

} else {

if (turn === 1) {
  player1 += _value;
  displayScore(player1)
  console.log(player1);
} else {
  console.log(player2);
  player2 += _value;
  displayScore(player2)
}

  console.log('You missed')
};
})

function randomInt(upTo) {
  return Math.floor(Math.random() * upTo)
}


// show point total in players score box + score +
function displayScore(player) {
  playerScoreBox.innerHTML = "Score: " + player + "<span id='playerScore'></span>";
}

// game clock time remaining
function countdown() {
  if (seconds <= 0) {
    clearInterval(timeInterval);
    alert('Player 1 went, now player 2 turn!');
    console.log("SCORE 1", player1);
    updateScore(player1);
    turn = 2;
    seconds = 30;
    refresh();

    secondInterval = setInterval(secondTimer, 1000);
  }
  var timer = $('#timer').html(seconds);
  refresh();
  seconds--;

}

// timer for reload rate to click
function secondTimer() {
  if (seconds < 1) {
    clearInterval(secondInterval);
    updateScore(player2);
    console.log("SCORE 2", player2);
    declareWinner();
  }

// timer for player turn (30 sec), tally points at end of timer
  var timer = $('#timer').html(seconds);
  refresh();
  seconds--;
}

function updateScore(player) {
  var _class = player === player1
    ? '.player1'
    : '.player2'
  var $elem = $('<span>' + player + '</span>');
  $(_class).append($elem);
}

function declareWinner() {
  if (player1 > player2) {
    alert('Player 1 wins: ' + player1 + ' score');
  } else if (player2 > player1) {
    alert('Player 2 wins: ' + player2 + ' score');
  } else if (player1 === player2) {
    alert('DRAW!!! You guys tied!');
  }
}

// make wonks appear at podiums
// make css show/hide wonk div in #
function refresh() {
  for (var i = 0; i < $('.podiums').length; i++) {
    var randomnumber = randomInt(images.length);
    $(".podiums").eq(i).html('<div><img width="100px" src="images/' + images[randomnumber].url + '"></div>');
    $(".podiums").eq(i).val(images[randomnumber].value);
    if (images[randomnumber].wonk) {
      $(".podiums").eq(i).data("wonk", "true");
    } else {
      $(".podiums").eq(i).data("wonk", "");
    }

  }
}

refresh()

$("#startButton").click(function() {
  timeInterval = setInterval(countdown, 1000)
  console.log("game started");
});
