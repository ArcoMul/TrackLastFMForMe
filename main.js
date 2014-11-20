var LastFmNode = require('lastfm').LastFmNode;
var express = require('express');
var request = require('request');
var trackthisforme = require('./trackthisforme');

var options {
    trackthisforme: {
        access_token: '',
        category_id: ''
    },
    lastfm: {
        api_key: '',
        secret: '',
        username: ''
    }
}

// Supports one user for now
var user = trackthisforme(options.trackthisforme.access_token);

// Create lastfm instance
var lastfm = new LastFmNode({
  api_key: options.lastfm.api_key,
  secret: options.lastfm.secret,
});

// Start streaming the lastfm last played tracks
var trackStream = lastfm.stream(options.lastfm.username);
trackStream.on('scrobbled', function(track) {
    console.log('Scrobbled: ' + track.name);
    var category = options.trackthisforme.category;
    var comment = track.artist['#text'] + ' - ' + track.name;
    user.addElement(category, { value: 1, comment: comment },
        function (error) {
            console.log('Error adding element:', error);
        },
        function (success)
        {
            console.log('Successfuly added new element with value 1 and comment:', comment);
        });
});
trackStream.on('error', function(error) {
  console.log('Error: '  + error.message);
});
trackStream.start();

// Express

var app = express();

app.get('/', function (req, res) {
  res.send('<p><a href="https://www.trackthisfor.me/oauth/authorize?client_id=c4ee5c29d5d0bc298779d5948cadf73fb20bfdbec3819bf8532677dc516adab5&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&scope=read+write&response_type=code">Sign up</a> for TrackLastFMForMe</p>')
});

app.get('/redirect', function (req, res) {
    console.log(req.query);
    var code = req.query.code;
    var postdata = { 
        client_id: 'c4ee5c29d5d0bc298779d5948cadf73fb20bfdbec3819bf8532677dc516adab5',
        redirect_uri: 'http://localhost:3000/redirect',
        client_secret: '922576c1d6e8633de59baab237bcd27ad783ea97504b16b5f63f91884ef97f47',
        code: code,
        grant_type: 'authorization_code'
    };
    console.log('postdata:', postdata);
    request.post('https://www.trackthisfor.me/oauth/token', { 
        form: postdata
    },
    function (error, response, body) {
        console.log('error', error);
        console.log('response.statusCode', response.statusCode);
        console.log('body:', body)
        res.send('<p>Response from tackthisfor.me: ' + body);
    });
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('TrackLastFMForMe listening at http://%s:%s', host, port)
});
