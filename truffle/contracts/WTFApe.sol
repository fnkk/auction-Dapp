// SPDX-License-Identifier: MIT
// by 0xAA
pragma solidity ^0.8.4;

import "./ERC721.sol";

contract WTFApe is ERC721 {
    uint public MAX_APES = 10000; // 总量

    // 构造函数
    constructor() ERC721("ff", "xf") {}

    //BAYC的baseURI为ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    }

}
