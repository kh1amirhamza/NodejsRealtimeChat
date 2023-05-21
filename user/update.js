const User = require('../model/User')
const Conversation = require('../model/Conversation');

module.exports = {
    async updateChatId(userId, chatId, res) {

        const query = { "_id": userId };
        const newUserData = await User.findOneAndUpdate(query, { 'chatId': chatId, 'status': 'Online' }, { new: true });

    //console.log(query);
    //await Conversation.findOneAndUpdate(query2, { $set: { 'users.$.chatId': chatId, "users.$.status": "Online" } }, { new: true });
        const query2 = {"users._id": userId };

    await Conversation.updateMany(query2, { $set: { 'users.$.chatId': chatId, "users.$.status": "Online" } }, { new: true });

        res.json(newUserData);
        res.end()

        /* User.findOneAndUpdate(query, { $set: {'chatId': chatId} }, (err, result) => {
            if (err) {
                console.log(err);
                res.end();
            }else{
                console.log(result);
                res.json(result)
                res.end();
            }
          }); */

    }
}