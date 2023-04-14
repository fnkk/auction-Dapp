var ecommerce_store_artifacts = require('../contracts/EcommerceStore.json')
var contract = require('truffle-contract')
var Web3 = require('web3')
var provider = new Web3.providers.WebsocketProvider("ws://localhost:8546");
var EcommerceStore = contract(ecommerce_store_artifacts);
EcommerceStore.setProvider(provider);

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

const { abi } = ecommerce_store_artifacts;
address = ecommerce_store_artifacts.networks[666].address;
contract = new web3.eth.Contract(abi, address);
// contract 是通过web3.js拿到的合约
// console.log(contract)

// Mongoose setup to interact with the mongodb database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ProductModel = require('./models/product');
var NftModel = require('./models/nft');
mongoose.connect("mongodb://localhost:27017/ff_dapp");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Express server which the frontend with interact with
var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3555, function () {
    console.log('Ebay Ethereum server listening on port 3555!');
})
app.get('/getNftList', function(req, res) {
    console.log('请求了list',req.query)
    // res.send('999666')
    NftModel.find( function (err, items) {
        console.log(items.length);
        res.send(items);
       })
})

function setupProductEventListner() {
    let productEvent;
    productEvent = contract.events.NewProduct({
        filter: null,
        fromBlock: 0
    }, function (error, event) {
        if (error) {
            console.error(error)
        }
    })
        .on("connected", function (subscriptionId) {
            console.log(6666, subscriptionId)
        })
        .on("data", function (event) {
            // 处理监听到的事件
            // console.log(9999, event)
            saveProduct(event.returnValues)
        })
        .on("error", function (error, receipt) {
            console.error(error)
        })
}
function setupNftEventListner() {
    let nftEvent = contract.events.AddNft({
        filter: null,
        fromBlock: 0
    }, function (error, event) {
        if (error) {
            console.error(error)
        }
    })
        .on("connected", function (subscriptionId) {
            console.log(6666, subscriptionId)
        })
        .on("data", function (event) {
            // 处理监听到的事件
            console.log(9999, event.returnValues)
            saveNft(event.returnValues)
        })
        .on("error", function (error, receipt) {
            console.error(error)
        })
}

// setupProductEventListner();
setupNftEventListner();

function saveProduct(product) {
    ProductModel.findOne({ 'blockchainId': product._productId.toLocaleString() }, function (err, dbProduct) {

        if (dbProduct != null) {
            return;
        }

        var p = new ProductModel({
            name: product._name, blockchainId: product._productId, category: product._category,
            ipfsImageHash: product._imageLink, ipfsDescHash: product._descLink, auctionStartTime: product._auctionStartTime,
            auctionEndTime: product._auctionEndTime, price: product._startPrice, condition: product._productCondition,
            productStatus: 0
        })
        p.save(function (err) {
            if (err) {
                handleError(err);
            } else {
                ProductModel.count({}, function (err, count) {
                    console.log("count is " + count);
                })
            }
        });
    })
}
function saveNft(nft) {
    NftModel.findOne({ 'tokenId': nft.tokenId.toLocaleString() }, function (err, dbProduct) {

        if (dbProduct != null) {
            return;
        }

        var p = new NftModel({
            tokenId: nft.tokenId,
            name: nft.name,
            introduction: nft.introduction,
            picUrl: nft.picUrl,
            createdTime: nft.createdTime,
            author: nft.author,
            owner: nft.owner,
            transferSum: nft.transferSum
        })
        p.save(function (err) {
            if (err) {
                handleError(err);
            } else {
                NftModel.count({}, function (err, count) {
                    console.log("count is " + count);
                })
            }
        });
    })
}