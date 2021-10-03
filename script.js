let town;
let units = localStorage.getItem('units') == null ? 'metric' : localStorage.getItem('units');

$('.search-submit').click(function () {
  town = $('.town').val();
  $('.location').html(town);
  $('.units').show();
  getWeather(town, units);
})

if (units == 'metric') {
  $('.temp-units-c').addClass('selected-unit');
  $('.temp-units-f').removeClass('selected-unit');
} else {
  $('.temp-units-f').addClass('selected-unit');
  $('.temp-units-c').removeClass('selected-unit');
}

$('.switch-units').click(function () {
  if ($(this).hasClass('temp-units-f')) {
    units = 'imperial';
    $('.temp-units-f').addClass('selected-unit');
    $('.temp-units-c').removeClass('selected-unit');
  }
  if ($(this).hasClass('temp-units-c')) {
    units = 'metric';
    $('.temp-units-c').addClass('selected-unit');
    $('.temp-units-f').removeClass('selected-unit');
  }
  localStorage.setItem('units', units);

  getWeather(town, units);
});

function getWeather(town, units) {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + town + '&units=' + units + '&appid=9b43e37d5e702a3d06f973a23f785112',
    dataType: 'json',
    success: function (content) {
      $('.degrees').html(parseInt(content.main["temp"]));
      $('.location').html(content["name"]);
      $('.units').show();
      $('.humidity').html('Humidity: ' + parseInt(content.main["humidity"]) + '%');
      $('.wind').html('Wind: ' + parseInt(content.wind["speed"]) + (units == 'metric' ? 'm/s' : 'mph'));

      timezone = content["timezone"];
      let now = new Date();
      let UTCTime = now.getTimezoneOffset() * 60;
      let localTime = new Date(now.setSeconds(now.getSeconds() + UTCTime + timezone)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      $('.time').html(localTime);

      content.weather.forEach(function (obj) {
        $('.weather-img').show().attr('src', 'http://openweathermap.org/img/w/' + obj["icon"] + '.png');
        $('.description').html(obj['main']);
      });
    }
  });
}