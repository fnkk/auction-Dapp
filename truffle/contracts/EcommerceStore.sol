// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// geth --datadir data --networkid 666 --http --http.port 8545 --allow-insecure-unlock console 2>output.log console
contract EcommerceStore {
    enum ProductStatus {
        Open,
        Sold,
        Unsold
    }
    enum ProdectCondition {
        New,
        Used
    }

    uint256 public productIndex;
    //通过商品ID 查找 商家的地址
    mapping(uint256 => address) productIdInStore;
    //通过商家地址 查找 该地址的所有商品列表  商品列表为Id和Product信息的表
    mapping(address => mapping(uint256 => Product)) stores;

    struct Bid {
        address bidder;
        uint productId;
        uint value;
        bool revealed;
    }

    struct Product {
        uint256 id;
        string name;
        string category;
        string imageLink;
        string descLink;
        uint256 autionStartTime;
        uint256 autionEndTime;
        uint256 startPrice;
        address highestBidder;
        uint256 highestBid;
        uint256 secondHighestBid;
        uint256 totalBids;
        ProductStatus status;
        ProdectCondition condition;
        mapping (address => mapping (bytes32 => Bid)) bids;
    }

    Product[] private prodects;

    constructor() {
        productIndex = 0;
    }

    function addProductToStore(
        string memory _name,
        string memory _category,
        string memory _imageLink,
        string memory _descLink,
        uint256 _autionStartTime,
        uint256 _autionEndTime,
        uint256 _startPrice,
        ProdectCondition _condition
    ) public {
        require(_autionStartTime<_autionEndTime);
        productIndex += 1;
        // Product memory product = Product(productIndex,_name,_category,_imageLink,_descLink,_autionStartTime,_autionEndTime,_startPrice,address(0),0,0,0,ProductStatus.Open,_condition);
        Product storage product = prodects[productIndex];
        // Product storage product = stores[msg.sender][productIndex];
        product.id = productIndex;
        product.name = _name;
        product.category = _category;
        product.imageLink = _imageLink;
        product.descLink = _descLink;
        product.autionEndTime = _autionEndTime;
        product.startPrice = _startPrice;
        product.condition = _condition;
        product.status = ProductStatus.Open;
        productIdInStore[productIndex] = msg.sender;
    }

    function getProduct(uint _productId) view internal returns(Product storage){
        Product storage product = stores[productIdInStore[_productId]][_productId];
        return (product);
    }

    function bid(uint _productId,bytes32 _bid) public payable returns(bool) {
        Product storage product = stores[productIdInStore[_productId]][_productId];
        require(block.timestamp>=product.autionStartTime && block.timestamp<=product.autionEndTime,"wei dao pai mai shi jian");
        require(msg.value>product.startPrice,"Value should be larger than start pirce");
        require(product.bids[msg.sender][_bid].bidder == address(0),"Bidder should be null");
        product.bids[msg.sender][_bid] = Bid(msg.sender,_productId,msg.value,false);
        product.totalBids += 1;
        return true;
    }   
}
