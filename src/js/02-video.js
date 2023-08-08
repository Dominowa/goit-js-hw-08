import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

function getCurrentTime() {
  return player.getCurrentTime();
}

function saveCurrentTime(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

function restorePlaybackPosition() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    player.setCurrentTime(savedTime);
  }
}

const player = new Vimeo(document.getElementById('vimeo-player'));

const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);

player.on('timeupdate', () => {
  const currentTime = getCurrentTime();
  throttledSaveCurrentTime(currentTime);
});

window.addEventListener('DOMContentLoaded', () => {
  restorePlaybackPosition();
});
