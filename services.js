require("dotenv").config();
const axios = require("axios");
const { readFile } = require('./readFile');

const recordUserFeeling =  async({ body, ack, say }) => {
    const feelingAPI = `${process.env.API_URL}/feeling`;
    const {user, actions} = body;
    axios.post(feelingAPI, {user, actions});

    const hobbies = readFile('hobbies.txt');
    hobbies.text = `Hey there <@${user.id}>!`;
    await ack();
    await say(hobbies);
};

const recordUserHobbies = async({ body, ack, say }) => {
    const hobbiesAPI = `${process.env.API_URL}/hobbies`;
    const {user, actions} = body;
    axios.post(hobbiesAPI, {user, actions});

    // Acknowledge the action
    const thanks = readFile('thanks.txt');
    thanks.text = `Hey there <@${user.id}>!`;
    await ack();
    await say(thanks);
};

module.exports = { recordUserHobbies, recordUserFeeling };