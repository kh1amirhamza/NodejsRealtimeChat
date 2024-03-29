const express = require("express");
const conversationRouter = express.Router();

const { json } = require("body-parser");
const Add = require('./add')
const Get = require('./get')
const Update = require('./update')

let socket;

// setTimeout(()=>{
//     Update.updateConvsUserStatus(socket.id, "Active");
//   }, 3000);




conversationRouter.post("/add", function (req, res) {
    console.log("req.body");
    console.log(req.body);
    Add.addConverastion(req.body.users, req.body.messages, req.body.title, req.body.type, res);
});

conversationRouter.post("/firstMessage", function (req, res) {
    console.log("req.body");
    console.log(req.body);
    Add.sendFirstMessage(
        req.body.users, 
        req.body.message, 
        req.body.title, 
        req.body.type, res);
});



conversationRouter.post("/sendMessage/", function (req, res) {
    console.log(req.body);
    Update.updateConversationMessage(req.query.convsId, req.body, res);
});

conversationRouter.post("/reactMessage/", function (req, res) {
    console.log(req.body);
    Update.addReactionUpdateConvs(req.query.convsId, req.body.messageId, req.body.reactTitle, req.body.currentUserId, res);
});

conversationRouter.post("/seenMessage/", function (req, res) {
    console.log(req.body);
    Update.updateConversationMessageSeenData(req.query.convsId, req.body.messageId, req.body.currentUserId, res);
});

conversationRouter.post("/receivedMessage/", function (req, res) {
    console.log("receivedMessage");
    console.log(req.body);

    Update.updateConversationMessageReceivedData(req.query.convsId, req.body.messageId, req.body.currentUserId, res);
});

conversationRouter.post("/updateConvsUserStatus/", function (req, res) {
    console.log(req.body);
    Update.updateConvsUserStatus(req.query.convsId, req.body.chatId, req.body.status, res);
});

conversationRouter.get("/get", (req, res) => {
    var userId = req.query.userId;
    Get.getConversation(userId, res);
})

conversationRouter.get("/getBetween", (req, res) => {
    var uId1 = req.query.uId1;
    var uId2 = req.query.uId2;

    Get.checkConvsBetweenUers(uId1, uId2, res);
})

module.exports = conversationRouter;

