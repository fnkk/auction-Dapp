// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// geth --datadir data --networkid 666 --http --http.port 8545 --allow-insecure-unlock console 2>output.log console
contract EcommerceStore {
    uint256 value;

    function read() public view returns (uint256) {
        return value;
    }

    function write(uint256 newValue) public {
        value = newValue;
    }

    enum ProductStatus {
        Open,
        Sold,
        Unsold
    }
    enum ProductCondition {
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
        uint256 productId;
        uint256 value;
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
        address payable highestBidder;
        uint256 highestBid;
        uint256 secondHighestBid;
        uint256 totalBids;
        ProductStatus status;
        ProductCondition condition;
        // mapping(address => mapping(bytes32 => Bid)) bids;
    }
    mapping(uint256=>mapping(address => mapping(bytes32 => Bid))) bidInProduct;
    Product[] private products;

    constructor() {
        productIndex = 0;
    }

    // 事件
     event NewProduct(uint _productId, string _name, string _category, string _imageLink, string _descLink,
  uint _auctionStartTime, uint _auctionEndTime, uint _startPrice, uint _productCondition);

    function addProductToStore(
        string memory _name,
        string memory _category,
        string memory _imageLink,
        string memory _descLink,
        uint256 _auctionStartTime,
        uint256 _auctionEndTime,
        uint256 _startPrice,
        ProductCondition _condition
    ) public {
        require(_auctionStartTime < _auctionEndTime);
        productIndex += 1;
        Product memory product = Product(productIndex,_name,_category,_imageLink,_descLink,_auctionStartTime,_auctionEndTime,_startPrice,payable(address(0)),0,0,0,ProductStatus.Open,_condition);
        stores[msg.sender][productIndex] = product;
        productIdInStore[productIndex] = msg.sender;
        emit NewProduct(productIndex, _name, _category, _imageLink, _descLink, _auctionStartTime, _auctionEndTime, _startPrice, uint256(_condition));
    }

    function getProduct(uint256 _productId)
        public
        view
        returns (Product memory)
    {
        Product storage product = stores[productIdInStore[_productId]][
            _productId
        ];
        return (product);
    }

    function bid(uint256 _productId, bytes32 _bid)
        public
        payable
        returns (bool)
    {
        Product storage product = stores[productIdInStore[_productId]][
            _productId
        ];
        require(
            block.timestamp >= product.autionStartTime,
            "Auction time is not reached"
        );
        require(
            block.timestamp <= product.autionEndTime,
            "Auction time has passed"    
            );
        require(
            msg.value > product.startPrice,
            "Value should be larger than start pirce"
        );
        require(
            bidInProduct[product.id][msg.sender][_bid].bidder == address(0),
            "Bidder should be null"
        );
        bidInProduct[product.id][msg.sender][_bid] = Bid(
            msg.sender,
            _productId,
            msg.value,
            false
        );
        product.totalBids += 1;
        return true;
    }

    function revealBid(
        uint256 _productId,
        string memory _amount,
        string memory _secret
    ) public {
        Product storage product = stores[productIdInStore[_productId]][
            _productId
        ];
        require(block.timestamp > product.autionEndTime);
        bytes32 sealedBid = keccak256(abi.encodePacked(_amount, _secret));

        Bid memory bidInfo = bidInProduct[product.id][msg.sender][sealedBid];
        require(bidInfo.bidder != address(0));
        require(bidInfo.revealed == false);

        uint256 refund;

        uint256 amount = stringToUint(_amount);

        if (bidInfo.value < amount) {
            // They didn't send enough amount, they lost
            refund = bidInfo.value;
        } else {
            // If first to reveal set as highest bidder
            if (address(product.highestBidder) == address(0)) {
                product.highestBidder = payable(msg.sender);
                product.highestBid = amount;
                product.secondHighestBid = product.startPrice;
                refund = bidInfo.value - amount;
            } else {
                if (amount > product.highestBid) {
                    product.secondHighestBid = product.highestBid;
                    product.highestBidder.transfer(product.highestBid);
                    product.highestBidder = payable(msg.sender);
                    product.highestBid = amount;
                    refund = bidInfo.value - amount;
                } else if (amount > product.secondHighestBid) {
                    product.secondHighestBid = amount;
                    refund = bidInfo.value;
                } else {
                    refund = bidInfo.value;
                }
            }
        }
        bidInProduct[product.id][msg.sender][sealedBid].revealed = true;

        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
    }

    function highestBidderInfo(uint256 _productId)
        public
        view
        returns (
            address,
            uint256,
            uint256
        )
    {
        Product storage product = stores[productIdInStore[_productId]][
            _productId
        ];
        return (
            product.highestBidder,
            product.highestBid,
            product.secondHighestBid
        );
    }

    function totalBids(uint256 _productId) public view returns (uint256) {
        Product storage product = stores[productIdInStore[_productId]][
            _productId
        ];
        return product.totalBids;
    }

    function stringToUint(string memory s) public pure returns (uint256) {
        bytes memory b = bytes(s);
        uint256 result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            if (uint8(b[i]) >= 48 && uint8(b[i]) <= 57) {
                result = result * 10 + (uint8(b[i]) - 48);
            }
        }
        return result;
    }
}
