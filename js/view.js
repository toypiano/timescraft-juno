export function showScreen(to) {
  switch (to) {
    case 'start':
      return goToStart();
    case 'play':
      return goToPlay();
    case 'results':
      return goToResults();
    case 'gameover':
      return goToGameOver();
    default:
      goToStart();
  }
}

function goToStart() {
  $('.sc-start').removeClass('hidden');

  $('.menu-btn').addClass('hidden');
  $('.sc-play').addClass('hidden');
  $('.overlay').addClass('hidden');
}

function goToPlay() {
  $('.sc-play').removeClass('hidden');
  $('.menu-btn').removeClass('hidden');

  $('.sc-start').addClass('hidden');
  $('.overlay').addClass('hidden');
}

function goToResults() {
  $('.sc-start').removeClass('hidden');
  $('.menu-btn').removeClass('hidden');
  $('.overlay').removeClass('hidden');

  $('.sc-start').addClass('hidden');
}

function goToGameOver() {
  $('.overlay').addClass('danger');
  $('.results--score').addClass('hidden');

  $('.results--died').removeClass('hidden');

  goToResults();
}
