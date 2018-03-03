$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDK0cZiRvGuWfvy-FoqMfJK21kOlH1ZP80",
    authDomain: "trainschedule-55bda.firebaseapp.com",
    databaseURL: "https://trainschedule-55bda.firebaseio.com",
    projectId: "trainschedule-55bda",
    storageBucket: "trainschedule-55bda.appspot.com",
    messagingSenderId: "836394303789"
  };
  firebase.initializeApp(config);

  // create variables:

  var database = firebase.database();
  var name = '';
  var firstTime = '';
  var frequency = '';
  var destination = '';
  var trainKey = '';
  var newRow = '';
  var nextArrival = '';
  var minutesAway = '';

  // function to calculate the time to arrival and next time
  // function time() {
  //   // current date - firstTime = minutes
  //   var currentDate = new Date().getTime();
  //   console.log(currentDate);
  // }
    // connect to firebase and get the values to the train schedule table stored there.
  database.ref('/trains').on('child_added', function(snapshot) {
    name = snapshot.val().name;
    firstTime = snapshot.val().firstTime;
    frequency = snapshot.val().frequency;
    destination = snapshot.val().destination;

    console.log(snapshot.val());
    console.log(name);

    var timeConverted = moment(firstTime, 'HH:mm').subtract(1, 'days');
    var currentTime = moment();
    // difference in time.
    var diffTime = moment().diff(moment(timeConverted), 'minutes');
    console.log('diff:' + diffTime);
    var remainder = diffTime % frequency;
    minutesAway = frequency - remainder;
    var nextTrain = currentTime.add(minutesAway, 'minutes');
    nextArrival = moment(nextTrain).format('hh:mm a');

    newRow = '<tr><td>' + name + '</td><td>' + destination + '</td><td>' + 'Every ' + frequency + ' minutes' + '</td><td>' + nextArrival + '</td><td>' + minutesAway + ' minutes' + '</td><td>';
    $('#train-schedule').append(newRow);

  });


  $('#submit-button').on('click', function(event) {
    event.preventDefault();


    console.log('one');
    name = $('#name-input').val().trim();
    firstTime = $('#firstTime-input').val();
    destination = $('#destination-input').val().trim();
    frequency = $('#frequency-input').val();

    $('#name-input').val('');
    $('#firstTime-input').val('');
    $('#destination-input').val('');
    $('#frequency-input').val('');



    console.log(name, firstTime, destination, frequency);
    // console.log(typeof(firstTime));
    // var timeArray = firstTime.toString().split(':');
    // var newTime = new Date();
    // newTime.setHours(timeArray[0], timeArray[1]);
    // var timeOfArrival = Date.parse(newTime);
    //
    // console.log(newTime, timeOfArrival);
    database.ref('/trains').push({
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
      name: name
    });


  });
  // time();

});
