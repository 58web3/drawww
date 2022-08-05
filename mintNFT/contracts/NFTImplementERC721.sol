// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTImplementERC721 is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;
    mapping(uint256 => address) private _ownedTokensIndex;
    uint256 public constant MAX_SUPPLY = 100;
    uint256 public constant PRICE = 0.001 ether;
    uint256 public constant MAX_PER_MINT = 10;
    mapping(uint256 => string) private _tokenToUris;

    /*
     * When deploy the first of 10 token will already minted by owner
     */
    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    /*
     * Use for opensea to get metadata. It will return like uri/{tokenId}.json
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return _tokenToUris[tokenId];
    }

    /*
     * Token Id will start from 1
     * Create 1 new token and save token with tokenURI
     * and after mint it will increment token id
     */
    function mintSingleNFT(string memory _tokenUri) public {
        uint256 newTokenID = _tokenIds.current();
        if(newTokenID == 0){
          _tokenIds.increment();
           newTokenID = _tokenIds.current();
        }
        _ownedTokensIndex[newTokenID] = msg.sender;
        _safeMint(msg.sender, newTokenID);
        _tokenToUris[newTokenID] = _tokenUri;
        _tokenIds.increment();
    }

    /*
     * Tokens are easily convertible from person to person
     */
    function transferToken(uint256 _tokenId, address _targetAddress) public {
        require(_exists(_tokenId), "Token not exit");
        address owner = ownerOf(_tokenId);
        require(msg.sender == owner, "Can't convert if not the owner");
        safeTransferFrom(owner, _targetAddress, _tokenId);
    }

    /*
     * When the token is burned, no one can access the token anymore
     * Only the owner has the right to burn
     * Use _burn() method of ERC721
     * After burning token Id will not be owned by its owner
     * Remove token Uri of token Id
     */
    function burn(uint256 _tokenId) public {
        address owner = ownerOf(_tokenId);
        require(msg.sender == owner, "Only the owner has the right to burn");
        delete _tokenToUris[_tokenId];
        _burn(_tokenId);
    }
}
