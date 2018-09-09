var dot = require("dotenv").config();
var request = require("request");
var fs = require("fs");
// var spotify = new Spotify(keys.spotify);
// var Sportify = require("node-spotify-api");
// var bands = new Bands;
// var movie = new OMDB;

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
            var showInfo =`
            Venue: ${showData.venue.name}
            Venue location: ${showData.venue.city} ${showData.venue.region}
            Date: ${showData.datetime}
            `;
            //CONVERT TO MOMENT.JS
            console.log(showInfo);
            if (err) {
            console.log(err);
            }
        }
        fs.appendFile("random.txt", showInfo, function(err) {
            if (err) throw err;
            console.log(showInfo);
        });

    });

}

