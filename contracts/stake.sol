//SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingToken is ERC20, Ownable {

    struct User{
        bool isStakeholder;
        uint256 stakes;
        uint256 stakeStartTime;
        uint256 rewards;

    }
    address public immutable stakingToken;
    address public rewardToken;
    constructor(uint256 initialSupply, address _stakingToken, address _rewardToken) ERC20("Stake", "MINE") {

        _mint(msg.sender, initialSupply);
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;

    }
    mapping(address => User) public userMap;
    /*mapping(address => bool) internal stakeholders;
    mapping(address => uint256) internal stakes;
    mapping(address => uint256) internal rewards;
    */

    function isStakeholder(address _address) public view returns(bool) {

       if (userMap[_address].isStakeholder == false){
           return false;
       }
       return true;
   }
  
   function addStakeholder(address _stakeholder) private {

       bool isS = isStakeholder(_stakeholder);
       if(! isS) userMap[_stakeholder].isStakeholder = true;
   }
   
   function removeStakeholder(address _stakeholder) private {

       userMap[_stakeholder].isStakeholder = false;
   }

   function stakeOf(address _stakeholder) public view returns(uint256) {

       return userMap[_stakeholder].stakes;
   }

   function stake(uint256 _stake) public {
       require(IERC20(stakingToken).balanceOf(msg.sender)>=_stake,"Not enough tokens for stake");
       if(userMap[msg.sender].isStakeholder == false) addStakeholder(msg.sender);
       userMap[msg.sender].stakes += _stake;
       userMap[msg.sender].rewards = calculateReward(msg.sender);
       userMap[msg.sender].stakeStartTime = block.timestamp; //probably problem with stake and rewrite time(maybe wrong understanding of mechanism)
        IERC20(stakingToken).transferFrom(msg.sender, address(this), _stake);
   }

   function unStake(uint256 _stake) public {
       require(_stake <= userMap[msg.sender].stakes, "Not enough stakes to remove");
       userMap[msg.sender].stakes -= _stake;
       if(userMap[msg.sender].stakes == 0) removeStakeholder(msg.sender);
        IERC20(stakingToken).transfer(msg.sender, _stake);   }

   function rewardOf(address _stakeholder) public view returns(uint256) {
       return userMap[_stakeholder].rewards;
   }

   function calculateReward(address _stakeholder) public view returns(uint256) {
       return userMap[_stakeholder].stakes / 5;
   }
   
   

   function claimReward() public {
       require(userMap[msg.sender].isStakeholder == true, "Not a stakeholder");
       require(block.timestamp > userMap[msg.sender].stakeStartTime + 10 minutes, "Too early to claim");
       uint256 reward = rewardOf(msg.sender);
       _mint(msg.sender, reward);
   }
}