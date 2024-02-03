let audioPlayers = document.querySelectorAll(".audio-player");
let playAllButton = document.getElementById('playAllButton');
let currentIndex = 0; // To keep track of the current audio index

audioPlayers.forEach((player) => {
  let audio = player.querySelector(".audio-element");
  let playPauseButton = player.querySelector(".playPauseButton");
  let progress = player.querySelector(".progress");

  playPauseButton.addEventListener("click", function () {
    if (audio.paused) {
      // pause all other audios and reset buttons to "Play"
      document.querySelectorAll(".audio-element").forEach((el) => {
        el.pause();
        if (el !== audio) {
          el
            .closest(".audio-player")
            .querySelector(".playPauseButton").textContent = "⏵︎";
        }
      });

      audio.play();
      playPauseButton.textContent = "⏸︎";
    } else {
      audio.pause();
      playPauseButton.textContent = "⏵︎";
    }
  });

  audio.addEventListener("timeupdate", function () {
    let position = audio.currentTime / audio.duration;
    progress.style.width = position * 100 + "%";
  });

  audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    audio.pause();
    let playPauseButton = audio.closest('.audio-player').querySelector('.playPauseButton');
    playPauseButton.textContent = "⏵︎";
});

  player.querySelector(".progress-bar").addEventListener("click", function (e) {
    let rect = this.getBoundingClientRect();
    let clickPosition = (e.clientX - rect.left) / rect.width;
    audio.currentTime = clickPosition * audio.duration;
  });
});

// Function to play an audio by index
function playAudioByIndex(index) {
  if (index >= audioPlayers.length) {
    currentIndex = 0; // Reset or stop when all audios have been played
    return;
  }

  let player = audioPlayers[index];
  let audio = player.querySelector(".audio-element");
  let playPauseButton = player.querySelector(".playPauseButton");

  // Pause currently playing audio, if any
  document.querySelectorAll(".audio-element").forEach((el) => {
    el.pause();
    el.closest(".audio-player").querySelector(".playPauseButton").textContent = "⏵︎";
  });

  // Play the selected audio
  audio.play();
  playPauseButton.textContent = "⏸︎";
  currentIndex = index; // Update the current index
}

// Listen for the Play All button click
playAllButton.addEventListener('click', function() {
  playAudioByIndex(0); // Start from the first audio
});

// Add an 'ended' event listener to each audio for auto-playing the next one
audioPlayers.forEach((player, index) => {
  let audio = player.querySelector(".audio-element");

  audio.addEventListener('ended', function() {
    // Move to next audio after one finishes
    let nextIndex = index + 1;
    playAudioByIndex(nextIndex);
  });
});
