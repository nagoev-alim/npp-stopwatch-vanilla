// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import { capitalStr } from './modules/capitalStr.js';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='stopwatch'>
    <h1>StopWatch</h1>
    <div class='stopwatch__header h1'>
      ${['minutes', 'seconds'].map((el, idx) => `<span data-${el}>00</span>${idx === 0 ? ':' : ''}`).join('')}
    </div>
    <div class='stopwatch__footer'>
      ${['start', 'pause', 'reset'].map(el => `<button class='button button--${el}' data-${el}>${capitalStr(el)}</button>`).join('')}
    </div>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// Query Selector
const DOM = {
  buttons: {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-pause]'),
    reset: document.querySelector('[data-reset]'),
  },
  timer: {
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

const PROPS = {
  time: 0,
  flag: false,
  interval: null,
};

// Functions
const onStart = () => {
  if (PROPS.flag) {
    return;
  }

  PROPS.flag = true;
  PROPS.interval = setInterval(() => {
    PROPS.time++;
    const minutes = Math.floor(PROPS.time / 60);
    const seconds = PROPS.time % 60;
    DOM.timer.minutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
    DOM.timer.seconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }, 1000);
};
const onStop = () => {
  if (!PROPS.flag) {
    return;
  }
  PROPS.flag = false;
  clearInterval(PROPS.interval);
};
const onReset = () => {
  onStop();
  PROPS.time = 0;
  DOM.timer.minutes.textContent = DOM.timer.seconds.textContent = '00';
};
// Events
DOM.buttons.start.addEventListener('click', onStart);
DOM.buttons.stop.addEventListener('click', onStop);
DOM.buttons.reset.addEventListener('click', onReset);
