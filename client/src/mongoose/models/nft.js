var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var NftSchema = new Schema({
    tokenId: Number,
    name: String,
    introduction: String,
    picUrl: String,
    createdTime: Number,
    author: String,
    owner: String,
    transferSum: Number,
});

var NftModel = mongoose.model('Nft', NftSchema);

module.exports = NftModel;