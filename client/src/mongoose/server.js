var ecommerce_store_artifacts = require('../contracts/EcommerceStore.json')
var contract = require('truffle-contract')
var Web3 = require('web3')
var provider = new Web3.providers.WebsocketProvider("ws://localhost:8546");
var EcommerceStore = contract(ecommerce_store_artifacts);
EcommerceStore.setProvider(provider);

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

const { abi } = ecommerce_store_artifacts;
address = ecommerce_store_artifacts.networks[666].address;
console.log('address', address)
ssss = new web3.eth.Contract(abi, address);
// ssss 是通过web3.js拿到的合约
// console.log(ssss)

// Mongoose setup to interact with the mongodb database 
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// var ProductModel = require('./product');
// mongoose.connect("mongodb://localhost:27017/ebay_dapp");
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
});
// EcommerceStore.deployed().then(function(i) {
//     i.getProduct.call(1).then(function(f){
//         app.get('/', function(req, res) {
//         res.send("Hello, World!",JSON.stringify(ssss).toString());
//        });
//     })
// })

function setupProductEventListner() {
    let productEvent;
     EcommerceStore.deployed().then(function(i) {
      productEvent = i.contract.events.NewProduct({fromBlock: 0, toBlock: 'latest'},function(error,event){
        console.log(error,'7********9/',event)
        // console.log(provider)
      })

    //   console.log('9999999',productEvent)
     })
    // productEvent = ssss.events.NewProduct({
    //     filter:null,
    //     fromBlock: 0
    // }, function (error, event) { 

    //     console.log(error,'*************',event)

        
    // })
    //     .on("connected", function (subscriptionId) {
    //         console.log(6666, subscriptionId)
    //     })
    //     .on("data", function (event) {
    //         console.log(9999, event)
    //     })
    //     .on("error", function (error, receipt) {

    //     })
        // console.log(productEvent,'99999999777777777')
}

setupProductEventListner();

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
        });
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