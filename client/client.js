process.env.grpc_backend = process.env.grpc_backend  || "35.229.189.112:80";
var grpc = require('grpc');
var baseProto = grpc.load('./proto/twitter.proto');
var client = new baseProto.twitterRoute.TwitterService(process.env.grpc_backend, grpc.credentials.createInsecure());

function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    else
        console.log(JSON.stringify(response, undefined, 2))
}

function Home(id) {
    client.homeUser({
        id: parseInt(id)
    }, function(error, users) {
        printResponse(error, users);
    });
}

function Timeline(id) {
    client.timelineUser({
        id: parseInt(id)
    }, function(error, users) {
        printResponse(error, users);
    });
}

function insertUser(name, username, password) {
    var user = {
        username : username,
        name: name,
        password: password
    };
    console.log(user)
    client.createUser(user, function(error, empty) {
        printResponse(error, empty);
    });
}


function createTweet(id, content) {
    var tweet = {
        id : parseInt(id),
        content: content
    };
    console.log(tweet)
    client.createTweet(tweet, function(error, empty) {
        printResponse(error, empty);
    });
}

function getUser(id) {
    client.getUser({
        id: parseInt(id)
    }, function(error, user) {
        printResponse(error, user);
    });
}

function followUser(id,follow) {
    client.followUser({
        id: parseInt(id),
        follow : parseInt(follow)
    }, function(error, empty) {
        printResponse(error, empty);
    });
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();
console.log(command)
if (command == 'home')
    Home(process.argv[0]);
else if (command == 'timeline')
    Timeline(process.argv[0]);
else if (command == 'insert')
    insertUser(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
    getUser(process.argv[0]);
else if (command == 'follow')
    followUser(process.argv[0],process.argv[1]);
else if (command == 'tweet')
    createTweet(process.argv[0],process.argv[1]);
