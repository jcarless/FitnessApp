$(document).ready(function($){
function generateExercise(){

	var q = $(this).data('image');

		// var squatsmuscles = "assets/images/squatsmuscles.png"
		// var rowsmuscles = "assets/images/rowmuscles.png"
		// var deadmuscles = "assets/images/deadliftmuscles.png"
		// var benchmuscles = "assets/images/benchmuscles.png"
		// var militarymuscles = "assets/images/militarymuscles.png"
		// var crunchesmuscles = "assets/images/crunchesmuscles.png"

	var muscles = {
		squatsmuscles:"assets/images/squatsmuscles.png",
		rowsmuscles:"assets/images/rowmuscles.png",
		deadmuscles:"assets/images/deadliftmuscles.png",
		benchmuscles:"assets/images/benchmuscles.png",
		militarymuscles:"assets/images/militarymuscles.png",
		crunchesmuscles:"assets/images/crunchesmuscles.png"
	}
	// var muscles = [squatsmuscles, rowsmuscles, deadmuscles, benchmuscles, militarymuscles, crunchesmuscles];

		// $('.diagram').append("<img src='" + q + "' 	width='450px' height='350px'>")


// APPENDS DESCRIPTION TO PAGE
	var i = $(this).data('id');

	var queryURL = "https://wger.de/api/v2/exercise/"+i+"/?format=json";

	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response){
		var results = response;
		$('.diagram').empty().fadeOut();
		$('.description').empty().fadeOut();


		console.log(results);


		$('.description').append(response.description).fadeIn();
		console.log(muscles[q]);
		console.log("<img src='" + muscles[q] + "' width='450px' height='350px'>");
		$('.diagram').append("<img src='" + muscles[q] + "' 	width='450px' height='350px'>").fadeIn();

	})

}

$('#squats').on('click', generateExercise);
$('#deadlifts').on('click', generateExercise);
$('#benchpress').on('click', generateExercise);
$('#militarypress').on('click', generateExercise);
$('#bentoverrows').on('click', generateExercise);
$('#crunches').on('click', generateExercise);

})


// ------FIREBASE----------------------------------------

var fitData = new Firebase("https://thefitnessapp.firebaseio.com");

// Grab Text box value 
var userName = $('#userID').val().trim(); // userName VALUE REPLACE

$('#selectedExercise').on('change', function(){

	selected = $('#selectedExercise').val();

	// AJAX CALL to your typical approach

	// Inside the ajax call we are going to filter by selected

	// We are going to call our drawChart once again

// firebase api
	var queryURL = 'https://thefitnessapp.firebaseio.com/'+ userName +'.json';

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {

	// We created an array of data whose first row is the headers. 
	var arrayOfData = [['Date', 'Reps', 'Sets', 'Weight (x10)']];


	// We used an AJAX .each method to loop through the response data tied to the user.... 
	$.each(response, function(key, value) {

		if (value.workout == $('#selectedExercise').val()) {

			var convertedDate = moment.unix(value.timeData).format("MMM-DD-YY");

			value.workout
			// We pushed the data as another row into our array of data.
			arrayOfData.push([convertedDate, value.repData, value.setData, value.weightData])
		} 
		
	})

	// Sent our array of data to a function that builds our chart
	drawChart(arrayOfData);

	
	
	}) //.done



}); //.on change




// Search for User
$('#login').on('click', function(){
	
	// Grab Text box value 
	userName = $('#userID').val().trim(); // userName VALUE REPLACE

	// firebase api
	var queryURL = 'https://thefitnessapp.firebaseio.com/'+ userName +'.json';

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {

 
	console.log("------------------------");
	console.log(response);
	console.log("------------------------")

	// We created an array of data whose first row is the headers. 
	var arrayOfData = [['Date', 'Reps', 'Sets', 'Weight (x10)']];

	// We used an AJAX .each method to loop through the response data tied to the user.... 
	$.each(response, function(key, value) {
		

		if (value.workout == $('#selectedExercise').val()) {

			console.log("*********");
			console.log(key);
			console.log(value);
			console.log(value.repData);
			console.log(value.setData);
			console.log(value.weightData);
			console.log(value.timeData);
			var convertedDate = moment.unix(value.timeData).format("MMM-DD-YY");
			console.log(convertedDate);
			console.log("*********");

			// We pushed the data as another row into our array of data.
			arrayOfData.push([convertedDate, value.repData, value.setData, value.weightData])
		}
	})

	console.log(arrayOfData);
	console.log(arrayOfData.length);

	// Sent our array of data to a function that builds our chart
	drawChart(arrayOfData);

	
	
	}) //.done




// 	// Print info 
// 	fitData.on("child_added", function(snapshot) {

		

// 		// If the snapshot.key is equal to the userName value 
// 		if (snapshot.key() === userName) {
	     
// 	    var userReps = snapshot.val().repData;
// 		var userSets = snapshot.val().setData;
// 		var userWeight = snapshot.val().weightData;
// 		var name = snapshot.key();




	      

// 			console.log(snapshot.key() + " did " + userReps + " reps and " + userSets + ' sets at ' + userWeight + ' lbs');



			

// 	}; //if function



// }) //on child_added
return false;
}) //login button

$("#addWorkout").on("click", function(){
	
			// Grab Text box value 
			var reps = $('#reps').val().trim();
			var sets = $('#sets').val().trim();
			var weight = $('#weight').val().trim();
			selected = $('#selectedExercise').val();

			// PUSH with correct key name

			var currentDateTime = moment().format("X");
console.log(selected);

			fitData.child(userName).child('data_'+currentDateTime).set({
				repData: reps,
				setData: sets,
				weightData: weight,
				timeData: currentDateTime,
				workout: selected
				});

			reps = $('#reps').val("");
			sets = $('#sets').val("");
			weight = $('#weight').val("");

			// firebase api
	var queryURL = 'https://thefitnessapp.firebaseio.com/'+ userName +'.json';

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {

 
	console.log("------------------------");
	console.log(response);
	console.log("------------------------")

	// We created an array of data whose first row is the headers. 
	var arrayOfData = [['Date', 'Reps', 'Sets', 'Weight (x10)']];

	// We used an AJAX .each method to loop through the response data tied to the user.... 
	$.each(response, function(key, value) {
		
		console.log("*********");
		console.log(key);
		console.log(value);
		console.log(value.repData);
		console.log(value.setData);
		console.log(value.weightData);
		console.log(value.timeData);
		var convertedDate = moment.unix(value.timeData).format("MMM-DD-YY");
		console.log(convertedDate);
		console.log("*********");



		if (value.workout == $('#selectedExercise').val()) {

			console.log("*********");
			console.log(key);
			console.log(value);
			console.log(value.repData);
			console.log(value.setData);
			console.log(value.weightData);
			console.log(value.timeData);
			var convertedDate = moment.unix(value.timeData).format("MMM-DD-YY");
			console.log(convertedDate);
			console.log("*********");

			// We pushed the data as another row into our array of data.
			arrayOfData.push([convertedDate, value.repData, value.setData, value.weightData])
		}


	})

	console.log(arrayOfData);
	console.log(arrayOfData.length);

	// Sent our array of data to a function that builds our chart
	drawChart(arrayOfData);

	
	
	}) //.done
			
			return false;
		});	//addWorkout button


		// Google charts-----------------------------
	google.charts.load('current', {'packages':['corechart']});
     
     	// Takes in an array of data 
      function drawChart(dataArray){

      	// Builds initial options for your chart
      	var options = {
          title: 'Workout Performance',
          curveType: 'function',
          legend: { position: 'bottom' },
      	};


      	// This loops through our multidimensional array
		for (var i = 1; i < dataArray.length; i++){

			for (var k = 1; k < dataArray[i].length; k++) {


				// Then converts all of the numbers
				dataArray[i][k] = parseInt(dataArray[i][k]);
				console.log("Value" + dataArray[i][k])

			}
			console.log("----------------")
		}

		// ==================

      	console.log(dataArray);

      	// We take our array and convert it into a Google Data Table
      	var data = google.visualization.arrayToDataTable(dataArray);

      	// We then send our google data table to be drawn by Google charts and dumped into our ID. 
        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        chart.draw(data, options);



      } // CHART


        // ADD USER FROM MODAL AREA
      	$("#pushUserName").on('click', function(){
      		var newUser = $("#newUserName").val().trim();


      		fitData.child(newUser).push(newUser);

      			userName: newUser;

      		$("#newUserName").val('');



      	})

      // ADD USER FROM MODAL AREA


// -----------------FIREBASE-------------------------------------------



// Generates YouTube video section


	$('.video').on('click', function(){
	$('.youtubeArea').empty().fadeOut().delay(1000);
	var p = $(this).data('playlist');						
	var playlistID = p;
		APIkey = "AIzaSyBtMXG8W1P4x4ruQm8r8TjNX1gEjLDWOdo";
		baseURL = "https://www.googleapis.com/youtube/v3/";
	var queryURL = baseURL + "playlistItems?part=snippet&maxResults=10&playlistId=" + playlistID + "&key=" + APIkey + "/";

		 $.ajax({
		 	url: queryURL,
		 	method: "GET"
		 })


	$('.youtubeArea').append("<iframe width='560' height='315' src='https://www.youtube.com/embed/videoseries?list="+playlistID+"' frameborder='0' allowfullscreen></iframe>").fadeIn();
});


   