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
        var showData = JSON.parse(body);
        // console.log(showData);
        // console.log(queryURL);
        var showInfo =`
        Venue: ${showData.artist_id}
        Venue Location: ${showData.venue}
        `;
        console.log(showInfo);
        if (err) {
            console.log(err);
        }

        fs.appendFile("random.txt", showInfo, function(err) {
    if(err) throw err;
    // console.log(showData);
});
    });
}

