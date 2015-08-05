$(document).ready(function() {
  $('.randomise p').addClass('hide');
  random_num = Math.floor((Math.random() * 8));
  $('.randomise p').eq(random_num).removeClass('hide');
});