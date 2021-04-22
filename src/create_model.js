const mongoose = require('mongoose');

const chatCollection = 'chat';

const chatSchema = new mongoose.Schema(
{
    id: {type: String, max: 100},
    name: {type: String, max: 20},
    surname: {type: String, max: 20},
    age: {type: Number, max: 100},
    alias: {type: String, max: 20},
    date: {type: String,max: 100},
    text: {type: String,max: 100}
});
 
const chats = mongoose.model(chatCollection,chatSchema);

module.exports = {
    chats
}