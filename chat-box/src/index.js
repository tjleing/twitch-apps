import {client} from 'tmi.js';
// const client = require('./node_modules/tmi.js/index.js');
// const oauth = require('./oauth.js');

// Get the current URL
const url = new URL(window.location.href);

// Get the search parameters from the URL
const searchParams = new URLSearchParams(url.search);
// Retrieve a specific query string parameter by name
// const oauth = searchParams.get('oauth');
// Print the value of the query string parameter

// Twitch credentials and options
const options = {
  // identity: {
  //   username: 'ThePtrocanfers',
  //   password: oauth
  // },
  channels: ['ThePtrocanfers']
};

// Create a Twitch client
const twitchClient = new client(options);

// Connect to Twitch chat
twitchClient.connect();

// Register event handler for new messages
twitchClient.on('message', (channel, tags, message, self) => {
  if (!self) {
    // This callback will be called whenever a new message is posted in the Twitch chatroom
    // You can perform any desired actions here
    console.log(`New message in ${channel}: ${tags['display-name']}: ${message}`);
    // Call your custom callback function here
    onNewMessage(tags, message);
  }
});

function onNewMessage(tags, message) {
    console.log(tags, message);
    document.getElementById("chat").innerText += `\n${tags["display-name"]}: ${message}`;
}

setTimeout(function() {
  console.log('timeout firing');
  if(typeof(livenessCallback) != 'undefined') {
    livenessCallback();
    console.log('callback exists');
  }
}, 10000)
