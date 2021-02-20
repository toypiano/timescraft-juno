import state, {
  clearSavedState,
  resetPlayState,
  resetState,
} from './js/state.js';
import { startQuiz, evaluateAnswer, setNextQuestion } from './js/quiz.js';
import { goTo } from './js/router.js';
import {
  closeMenu,
  openMenu,
  loadSound,
  openConfirmation,
  showResetMessage,
} from './js/helpers.js';

// (pre)load audio files
const { hitSound, openingMusic } = loadSound();

//=====================================
// Event Handlers
//=====================================

/**
 * Select answer to move to next question if correct
 * @param {number} delay - delay until showing next question
 */
async function handleAnswerButtonClick(e) {
  // wait for pass/fail animation sequence to end
  hitSound.play();
  await evaluateAnswer(e);
  setNextQuestion();
}

function handleSelectButtonClick() {
  // get selected table from data attribute
  const table = this.dataset.table;

  startQuiz(table);
}

function handleAgainButtonClick() {
  startQuiz();
}

function handleMainButtonClick() {
  resetPlayState();
  goTo('start');
}

function handleMenuButtonClick() {
  if (state.isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

async function handleResetButtonClick() {
  openConfirmation();
}

async function handleConfirmResetButtonClick() {
  clearSavedState();
  resetState();
  await showResetMessage();
  handleMainButtonClick();
}

function handleCancelResetButtonClick() {
  $('.menu-main').removeClass('hidden');
  $('.reset-confirm').addClass('hidden');
}

//=====================================
// Event Bindings
//=====================================

// Start
$('.table-select > button').each(function (i, button) {
  $(button).on('click', handleSelectButtonClick);
});

// Play
$('.answer-buttons').children().on('click', handleAnswerButtonClick);

// Menu
$('.menu-btn').on('click', handleMenuButtonClick);
$('.btn-resume').on('click', closeMenu);
$('.btn-reset').on('click', handleResetButtonClick);

// Reset confirmation
$('.btn-confirm-yes').on('click', handleConfirmResetButtonClick);
$('.btn-confirm-no').on('click', handleCancelResetButtonClick);

// Results
$('.btn-again').on('click', handleAgainButtonClick);
$('.btn-main').on('click', handleMainButtonClick);

//=====================================
// Run Main
//=====================================
goTo('start');

//TODO: add stats menu button
//TODO: menu button only works on second click when game is restarted after clicking on "Main"
