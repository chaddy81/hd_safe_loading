/* use strict; */

var startButton = document.getElementsByClassName('start-button')[0],
    videoContainer = document.getElementsByClassName('video-container')[0],
    videoContainer2 = document.getElementsByClassName('video-container')[1],
    video = document.getElementsByClassName('video')[0],
    video2 = document.getElementsByClassName('video')[1],
    glasspane = document.getElementsByClassName('glasspane')[0],
    selectRope = document.getElementsByClassName('select-rope')[0],
    carScreen = document.getElementsByClassName('car-screen')[0],
    carFinished = document.querySelector('div#car-finished'),
    finishScreen = document.getElementsByClassName('finish-screen')[0],
    greenBtn = document.getElementsByClassName('btn-green')[0],
    rightAnswers = document.querySelectorAll('input[class=right]');
    modal = document.getElementById('modal');

startButton.onclick = function(e) {
  e.preventDefault();
  glasspane.style.display = "none";
  startButton.style.display = "none";
  videoContainer.style.display = "block";
  video.play();
};

video.onended = function(e) {
  videoContainer.style.display = "none";
  selectRope.style.display = "block";
};

var correctRope = document.getElementById('rope').nextElementSibling.childNodes[0];
correctRope.addEventListener('click', processRope);

function processRope() {
  window.setTimeout(function() {
    selectRope.style.display = "none";
    carScreen.style.display = "block";
  }, 500);
}

var wrongTwine = document.getElementById('twine').nextElementSibling.childNodes[0];
wrongTwine.addEventListener('click', processTwine);

function processTwine() {
  window.setTimeout(function() {
    alert('Sorry, please try again.');
    document.getElementById('twine').checked = false;
  }, 250);
}

function dragOver(ev) {
  // prevent default to allow drop
  ev.preventDefault();
}

function dragStart(ev) {
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData("text", ev.target.getAttribute('class'));
  return true;
}

function dragDrop(ev) {
  var data = ev.dataTransfer.getData("text");
  ev.stopPropagation();

  if (data === 'trailer') {
    selectRope.style.display = "none";
    finishScreen.style.display = "block";
  }

  return false;
}

function showModal() {
  modal.style.pointerEvents = "auto";
  modal.style.opacity = "1";
}

function closeModal() {
  modal.style.pointerEvents = "none";
  modal.style.opacity = "0";
}

function getRightAnswers(e) {
  var answers = document.querySelectorAll('input[class=right]:checked');
  if(answers.length == 6) {
    carScreen.style.display = "none";
    carFinished.style.display = "block";
  }
}

[].forEach.call(rightAnswers, function(answer) {
  answer.addEventListener("click", getRightAnswers);
});

function nextVideo() {
  carFinished.style.display = "none";
  videoContainer2.style.display = "block";
  video2.play();
};