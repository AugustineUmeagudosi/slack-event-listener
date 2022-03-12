require("dotenv").config();
const { App, ExpressReceiver } = require('@slack/bolt');
const axios = require("axios");
const { readFile } = require('./readFile');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    const hello = readFile('welcome.txt');
    hello.text = `Hey there <@${message.user}>!`;
    await say(hello);
});

// The echo command simply echoes on command
app.command('/bot', async ({ command, ack, respond }) => {
    const hello = readFile('welcome.txt');
    hello.text = `Hey there <@${message.user}>!`;
    await ack();
    await respond(hello);
});

app.action('doing_well', async ({ body, ack, say }) => {
    recordUserFeeling({ body, ack, say });
});

app.action('neutral', async ({ body, ack, say }) => {
    recordUserFeeling({ body, ack, say });
});

app.action('feeling_lucky', async ({ body, ack, say }) => {
    recordUserFeeling({ body, ack, say });
});

app.action('hobbies', async ({ body, ack, say }) => {
    recordUserHobbies({ body, ack, say });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();


async function recordUserFeeling({ body, ack, say }){
    const feelingAPI = `${process.env.API_URL}/feeling`;
    const {user, actions} = body;
    axios.post(feelingAPI, {user, actions});

    const hobbies = readFile('hobbies.txt');
    hobbies.text = `Hey there <@${user.id}>!`;
    await ack();
    await say(hobbies);
}

async function recordUserHobbies({ body, ack, say }){
    const hobbiesAPI = `${process.env.API_URL}/hobbies`;
    const {user, actions} = body;
    axios.post(hobbiesAPI, {user, actions});

    // Acknowledge the action
    const thanks = readFile('thanks.txt');
    thanks.text = `Hey there <@${user.id}>!`;
    await ack();
    await say(thanks);
}