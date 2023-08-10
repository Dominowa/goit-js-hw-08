import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.getElementById('vimeo-player'));
const THROTTLE_TIME = 1000;

function getCurrentTime() {
  return player.getCurrentTime();
}

function saveCurrentTime(time) {
  sessionStorage.setItem('videoplayer-current-time', time);
}

function restorePlaybackPosition() {
  const savedTime = sessionStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    player.setCurrentTime(savedTime);
  }
}

const throttledSaveCurrentTime = throttle(saveCurrentTime, THROTTLE_TIME);

player.on('timeupdate', () => {
  const currentTime = getCurrentTime();
  throttledSaveCurrentTime(currentTime);
});

window.addEventListener('DOMContentLoaded', () => {
  restorePlaybackPosition();
});
