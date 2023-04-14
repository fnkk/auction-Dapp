var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var TransferSchema = new Schema({
    tokenId: Number,
    from: String,
    to: String,
    transferTime: Number
});

var TransferModel = mongoose.model('Transfer', TransferSchema);

module.exports = TransferModel;