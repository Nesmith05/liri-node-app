var dot = require("dotenv").config();
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var moment = require("moment");

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });


//takes the command from the command line
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

// switch expression to go through commands
switch(search) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
       console.log("Waddup");
}

function concertThis() {
    artist = term;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryURL, function(err, response, body){
        for(i=0; i < 7; i++) {
            var showData = JSON.parse(body)[i];
            // console.log(showData);
            // console.log(queryURL);
            var showInfo =
            console.log("Venue: " + showData.venue.name);
            console.log("Venue location: " + showData.venue.city + ", " + showData.venue.region)
            console.log("Date: " + moment(showData.datetime).format("MM/DD/YYY"));
            console.log("--------------------------------");
            //CONVERT TO MOMENT.JS
            // console.log(showInfo);
            if (err) {
            console.log(err);
            console.log("No events currently.");
            }
        }

    });

}

function spotifyThisSong() {
    var song = term;
    if (song === undefined) {
        console.log("'The Sign' by Ace of Base");
    }

    spotify.search({ type: 'track', query: song, limit: 10}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
            var theSong ;
            //stored in the variable would be the arist name, song name, possily a preview link to the song, and the album title.
            // console.log(theSong);
        }
       
      console.log(data); 
      });
}   

function movieThis() {
    var movie = process.argv[3];
    var queryURL = "http://www.omdbapi.com/?s=" + movie + "&apikey=9326bfd0";
    request(queryURL, function(err, response, body){
            var showData = JSON.parse(body);
            // console.log(showData);
            // console.log(queryURL);
            var showInfo = console.log("Title :" + showData.Title);
            //ideally would show movie title, year release, imdb and rotten tomatoes rating, country released, language, plot, and actors

            console.log(showInfo);
            if (err) {
                console.log(err);
                console.log("No events currently.");
            }
            //Mr. Nobody set as default movie search

    });


}

function doWhatItSays() {
    if(search === "do-what-it-says"){
        fs.readFile('random.txt', "utf8", function(err, data){
            console.log(data);
        });
    }
}
