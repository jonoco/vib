(function(){

	var SML = 150;
	var MED = 400;
	var LRG = 1000;

	var SPEED1 = 2000;
	var SPEED2 = 1000;
	var SPEED3 = 500;
	var SPEED4 = 300;
	var SPEED5 = 100;

	var repeat;

	var support = document.getElementById('support');
	// enable vibration support
	navigator.vibrate = navigator.vibrate || 
											navigator.webkitVibrate || 
											navigator.mozVibrate || 
											navigator.msVibrate;

	if (navigator.vibrate) {
		// vibration API supported
		support.innerHTML = 'supported';
	} else {
		support.innerHTML = 'vibrate not supported';
	}
	
	var socket = io.connect('https://vibrater.herokuapp.com');

	socket.on('vib', function(data) {
		navigator.vibrate(data.vib);
		console.log(data);
	});

	// small buzz
  document.getElementById('ss').addEventListener('click', function(e) {
		vibrate(SML);
  });
 
  document.getElementById('sm').addEventListener('click', function(e) {
		repeatVibrate({delay: 100, duration: 200});
  });

	// medium buzz
  document.getElementById('ms').addEventListener('click', function(e) {
		vibrate(MED);
  });

  document.getElementById('mm').addEventListener('click', function(e) {
		repeatVibrate({delay: 300, duration: 500});
  });

	// large buzz
	document.getElementById('ls').addEventListener('click', function(e) {
		vibrate(LRG);
	 });

  document.getElementById('lm').addEventListener('click', function(e) {
		repeatVibrate({delay: 1000, duration: 3000});
  });

  //custom timer
  document.getElementById('custom').addEventListener('click', function(e) {
  	var time = document.getElementById('duration').value;
  	vibrate(Number(time));
  });

	// stop repeat
	document.getElementById('stop').addEventListener('click', function(e) {
		clearInterval(repeat);
	});

  function repeatVibrate(pattern) {
  	clearInterval(repeat);
  	repeat = setInterval(function() {
  		console.log('vibrate');
  		navigator.vibrate(pattern.duration);
  	}, pattern.delay);
  }

  
  function vibrate(pattern) {
  	socket.emit('signal', {type: 'vib', vib: pattern});
  }

}())
