var startButton = document.getElementsByClassName('start-button')[0],
    videoContainer = document.getElementsByClassName('video-container')[0],
    videoContainer2 = document.getElementsByClassName('video-container')[1],
    videoContainer3 = document.getElementsByClassName('video-container')[2],
    video = document.getElementsByClassName('video')[0],
    video2 = document.getElementsByClassName('video')[1],
    video3 = document.getElementsByClassName('video')[2],
    glasspane = document.getElementsByClassName('glasspane')[0],
    selectRope = document.getElementsByClassName('select-rope')[0],
    carScreen = document.getElementsByClassName('car-screen')[0],
    carFinished = document.querySelector('div#car-finished'),
    finishScreen = document.getElementsByClassName('finish-screen')[0],
    greenBtn = document.getElementsByClassName('btn-green')[0],
    rightAnswers = document.querySelectorAll('input[class=right]'),
    dropHitch = document.querySelector('div.drop-hitch'),
    receiver = document.querySelector('img.receiver'),
    hitch = document.querySelector('img.hitch'),
    fullySeated = document.querySelector('div.fully-seated'),
    selectChain = document.querySelector('div.select-chain'),
    selectChain2 = document.querySelector('div.select-chain-2'),
    selectChainComplete = document.querySelector('div.select-chain-complete'),
    correctRope = document.getElementById('rope').nextElementSibling.childNodes[0],
    wrongTwine = document.getElementById('twine').nextElementSibling.childNodes[0],
    rightChain = document.querySelector('div.right-chain'),
    rightChain1 = document.querySelector('div.right-chain-1'),
    modal = document.getElementById('modal');

startButton.addEventListener('click', nextPane);
function nextPane(e) {
  e.preventDefault();
  glasspane.style.display = "none";
  startButton.style.display = "none";
  videoContainer.style.display = "block";
  video.play();
};

hitch.addEventListener('dragstart', dragStart, false);
receiver.addEventListener('drop', dragDrop, false);
receiver.addEventListener("dragover", dragOver, false);
correctRope.addEventListener('click', processRope);
wrongTwine.addEventListener('click', processTwine);
rightChain.addEventListener('click', nextChain);
rightChain1.addEventListener('click', showComplete);

video.onended = function(e) {
  videoContainer.style.display = "none";
  selectRope.style.display = "block";
};

function processRope() {
  window.setTimeout(function() {
    selectRope.style.display = "none";
    carScreen.style.display = "block";
  }, 500);
}

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

  if (data === 'hitch') {
    dropHitch.style.display = "none";
    fullySeated.style.display = "block";
  }

  return false;
}

function showModal() {
  modal.style.pointerEvents = "auto";
  modal.style.opacity = "1";
  modal.style.visibility = "visible";
}

function closeModal() {
  modal.style.pointerEvents = "none";
  modal.style.opacity = "0";
  modal.style.visibility = "hidden";
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

video2.onended = function() {
  videoContainer2.style.display = "none";
  dropHitch.style.display = "block";
}

function showChains() {
  fullySeated.style.display = "none";
  selectChain.style.display = "block";
}

function nextChain() {
  setTimeout(function() {
    selectChain.style.display = "none";
    selectChain2.style.display = "block";
  }, 250);
}

function showComplete() {
  selectChain2.style.display = "none"
  selectChainComplete.style.display = "block";
}

function lastVideo() {
  selectChainComplete.style.display = "none";
  videoContainer3.style.display = "block";
  video3.play();
}