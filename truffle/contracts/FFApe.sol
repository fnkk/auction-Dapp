// SPDX-License-Identifier: MIT
// by 0xAA
pragma solidity ^0.8.4;

import "./ERC721.sol";

contract FFApe is ERC721 {
    uint public MAX_APES = 10000; // 总量

    // 构造函数
    constructor() ERC721("ff", "xf") {}

    function _baseURI() internal pure override returns (string memory) {
        return "http://localhost:8080/ipfs/";
    }

}
