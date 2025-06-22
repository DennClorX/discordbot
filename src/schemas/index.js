const { Schema, model } = require("mongoose");

module.exports.loadMongoose = (mongo) => {
    require('mongoose').connect(mongo)
}

const guildSchema = new Schema({
    guildId: String,
    counterChannelId: String,
    counterNumber: Number,
    welcomeDMTitle: String,
    welcomeDMDescription: String,
    welcomeDMAuthorName: String,
    welcomeDMAuthorIcon: String,
    welcomeDMThumbnail: String,
    welcomeDMFooter: String,
    welcomeDMColor: String,
});

module.exports = model("guildSchema", guildSchema, "guildSchema");