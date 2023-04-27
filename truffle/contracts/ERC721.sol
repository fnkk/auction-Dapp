// SPDX-License-Identifier: MIT
// by 0xAA
pragma solidity ^0.8.4;

import "./IERC165.sol";
import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./IERC721Metadata.sol";
import "./Address.sol";
import "./String.sol";

contract ERC721 is IERC721, IERC721Metadata {
    using Address for address; // 使用Address库，用isContract来判断地址是否为合约
    using Strings for uint256; // 使用String库，

    uint public tokenIndex;
    // Token名称
    string public override name;
    // Token代号
    string public override symbol;
    // 铸造nft触发的事件
    event AddNft(
        uint indexed tokenId,
        string picUrl,
        string name,
        string introduction,
        address owner,
        uint createdTime,
        address author,
        uint transferSum
    );
    // nft信息详情的结构体
    struct TokenDetail {
        uint tokenId;
        string picUrl;
        string name;
        string introduction;
        address owner;
        uint createdTime;
        address author;
        uint transferSum;
    }
    // tokenId 到 tokenDeta 的映射
    mapping(uint => TokenDetail) private _detail;
    // tokenId 到 owner address 的持有人映射
    mapping(uint => address) private _owners;
    // address 到 持仓数量 的持仓量映射
    mapping(address => uint) private _balances;
    // tokenID 到 授权地址 的授权映射
    mapping(uint => address) private _tokenApprovals;
    //  owner地址。到operator地址 的批量授权映射
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    // owner地址 到 持有的所有tokenId的数组
    mapping(address => uint[]) public _keepToken;

    /**
     * 构造函数，初始化`name` 和`symbol` .
     */
    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;
        // 保留0字面量
        tokenIndex = 1;
    }

    // 实现IERC165接口supportsInterface
    function supportsInterface(
        bytes4 interfaceId
    ) external pure override returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId;
    }

    // 实现IERC721的balanceOf，利用_balances变量查询owner地址的balance。
    function balanceOf(address owner) external view override returns (uint) {
        require(owner != address(0), "owner = zero address");
        return _balances[owner];
    }

    // 实现IERC721的ownerOf，利用_owners变量查询tokenId的owner。
    function ownerOf(
        uint tokenId
    ) public view override returns (address owner) {
        owner = _owners[tokenId];
        require(owner != address(0), "token doesn't exist");
    }

    // 实现IERC721的isApprovedForAll，利用_operatorApprovals变量查询owner地址是否将所持NFT批量授权给了operator地址。
    function isApprovedForAll(
        address owner,
        address operator
    ) external view override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    // 实现IERC721的setApprovalForAll，将持有代币全部授权给operator地址。调用_setApprovalForAll函数。
    function setApprovalForAll(
        address operator,
        bool approved
    ) external override {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    // 实现IERC721的getApproved，利用_tokenApprovals变量查询tokenId的授权地址。
    function getApproved(
        uint tokenId
    ) external view override returns (address) {
        require(_owners[tokenId] != address(0), "token doesn't exist");
        return _tokenApprovals[tokenId];
    }

    // 授权函数。通过调整_tokenApprovals来，授权 to 地址操作 tokenId，同时释放Approval事件。
    function _approve(address owner, address to, uint tokenId) private {
        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    // 实现IERC721的approve，将tokenId授权给 to 地址。条件：to不是owner，且msg.sender是owner或授权地址。调用_approve函数。
    function approve(address to, uint tokenId) external override {
        address owner = _owners[tokenId];
        require(
            msg.sender == owner || _operatorApprovals[owner][msg.sender],
            "not owner nor approved for all"
        );
        _approve(owner, to, tokenId);
    }

    // 查询 spender地址是否可以使用tokenId（需要是owner或被授权地址）
    function _isApprovedOrOwner(
        address owner,
        address spender,
        uint tokenId
    ) private view returns (bool) {
        return (spender == owner ||
            _tokenApprovals[tokenId] == spender ||
            _operatorApprovals[owner][spender]);
    }

    /*
     *工具函数，输入数组和一个值，返回这个值的对应的索引值，没有则返回-1
     */
    function indexOf(
        uint[] memory arr,
        uint tokenId
    ) public pure returns (uint) {
        uint res = 0;
        for (uint i = 0; i <= arr.length - 1; i++) {
            if (arr[i] == tokenId) {
                res = i;
            }
        }
        return res;
    }

    /*
     * 转账函数。通过调整_balances和_owner变量将 tokenId 从 from 转账给 to，同时释放Transfer事件。
     * 条件:
     * 1. tokenId 被 from 拥有
     * 2. to 不是0地址
     */
    function _transfer(
        address owner,
        address from,
        address to,
        uint tokenId
    ) private {
        require(from == owner, "not owner");
        require(to != address(0), "transfer to the zero address");

        _approve(owner, address(0), tokenId);

        _balances[from] -= 1;
        // from 对应的数组的待删除项的值变为数组最后一位的值，然后删除最后一位
        // _keepToken[from][indexOf(_keepToken[from], tokenId)] =_keepToken[from][_keepToken[from].length-1];
        // _keepToken[from].pop();
        // from 对应的数组的待删除项的值改为0 代表该项被删除
        _keepToken[from][indexOf(_keepToken[from], tokenId)] = 0;
        _balances[to] += 1;
        _keepToken[to].push(tokenId);
        _owners[tokenId] = to;
        _detail[tokenId].owner = to;
        _detail[tokenId].transferSum++;
        emit Transfer(from, to, tokenId);
    }

    // 实现IERC721的transferFrom，非安全转账，不建议使用。调用_transfer函数
    function transferFrom(
        address from,
        address to,
        uint tokenId
    ) external override {
        address owner = ownerOf(tokenId);
        require(
            _isApprovedOrOwner(owner, msg.sender, tokenId),
            "not owner nor approved"
        );
        _transfer(owner, from, to, tokenId);
    }

    /**
     * 安全转账，安全地将 tokenId 代币从 from 转移到 to，会检查合约接收者是否了解 ERC721 协议，以防止代币被永久锁定。调用了_transfer函数和_checkOnERC721Received函数。条件：
     * from 不能是0地址.
     * to 不能是0地址.
     * tokenId 代币必须存在，并且被 from拥有.
     * 如果 to 是智能合约, 他必须支持 IERC721Receiver-onERC721Received.
     */
    function _safeTransfer(
        address owner,
        address from,
        address to,
        uint tokenId,
        bytes memory _data
    ) private {
        _transfer(owner, from, to, tokenId);
        require(
            _checkOnERC721Received(from, to, tokenId, _data),
            "not ERC721Receiver"
        );
    }

    /**
     * 实现IERC721的safeTransferFrom，安全转账，调用了_safeTransfer函数。
     */
    function safeTransferFrom(
        address from,
        address to,
        uint tokenId,
        bytes memory _data
    ) public override {
        address owner = ownerOf(tokenId);
        require(
            _isApprovedOrOwner(owner, msg.sender, tokenId),
            "not owner nor approved"
        );
        _safeTransfer(owner, from, to, tokenId, _data);
    }

    // safeTransferFrom重载函数
    function safeTransferFrom(
        address from,
        address to,
        uint tokenId
    ) external override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * 铸造函数。通过调整_balances和_owners变量来铸造tokenId并转账给 to，同时释放Transfer事件。铸造函数。通过调整_balances和_owners变量来铸造tokenId并转账给 to，同时释放Transfer事件。
     * 这个mint函数所有人都能调用，实际使用需要开发人员重写，加上一些条件。
     * 条件:
     * 1. tokenId尚不存在。
     * 2. to不是0地址.
     */
    function _mint(
        address to,
        string memory _picUrl,
        string memory _name,
        string memory _introduction,
        uint _createdTime
    ) public {
        require(to != address(0), "mint to zero address");
        require(_owners[tokenIndex] == address(0), "token already minted");
        TokenDetail memory tokenDetail = TokenDetail(
            tokenIndex,
            _picUrl,
            _name,
            _introduction,
            to,
            _createdTime,
            to,
            0
        );
        uint tokenId = tokenIndex;
        _detail[tokenId] = tokenDetail;
        _balances[to] += 1;
        _keepToken[to].push(tokenId);
        _owners[tokenId] = to;
        // tokenId自增
        tokenIndex++;
        emit Transfer(address(0), to, tokenId);
        emit AddNft(
            tokenId,
            _picUrl,
            _name,
            _introduction,
            to,
            _createdTime,
            to,
            0
        );
    }

    // 销毁函数，通过调整_balances和_owners变量来销毁tokenId，同时释放Transfer事件。条件：tokenId存在。
    function _burn(uint tokenId) internal virtual {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "not owner of token");

        _approve(owner, address(0), tokenId);

        _balances[owner] -= 1;
        _keepToken[owner][indexOf(_keepToken[owner], tokenId)] = 0;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    // _checkOnERC721Received：函数，用于在 to 为合约的时候调用IERC721Receiver-onERC721Received, 以防 tokenId 被不小心转入黑洞。
    function _checkOnERC721Received(
        address from,
        address to,
        uint tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            return
                IERC721Receiver(to).onERC721Received(
                    msg.sender,
                    from,
                    tokenId,
                    _data
                ) == IERC721Receiver.onERC721Received.selector;
        } else {
            return true;
        }
    }

    /**
     * 实现IERC721Metadata的tokenURI函数，查询metadata。
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_owners[tokenId] != address(0), "Token Not Exist");
        string memory picUrl = getTokenDetail(tokenId).picUrl;
        string memory baseURI = _baseURI();
        return string(abi.encodePacked(baseURI, picUrl)); 
    }

    /**
     * 计算{tokenURI}的BaseURI，tokenURI就是把baseURI和tokenId拼接在一起，需要开发重写。
     * BAYC的baseURI为ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    function getTokenDetail(
        uint _tokenId
    ) public view returns (TokenDetail memory) {
        require(_owners[_tokenId] != address(0), "token doesn't exist");
        return _detail[_tokenId];
    }

    function getKeepToken(address owner) public view returns (uint[] memory) {
        require(_balances[owner] != 0, "owner don't have token");
        return _keepToken[owner];
    }
}
