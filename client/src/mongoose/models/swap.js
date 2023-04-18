var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var SwapSchema = new Schema({
    tokenId: Number,
    seller: String,
    buyer: String,
    price: Number,
    createdTime:String,
    swapTime:String,
    state:Number//0:已发起 1:已完成 2:已撤单
});

var SwapModel = mongoose.model('Swap', SwapSchema);

module.exports = SwapModel;