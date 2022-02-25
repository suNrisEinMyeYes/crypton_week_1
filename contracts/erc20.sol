// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;
//import "@openzeppelin/contracts/access/AccessControl.sol";

contract ERC20 { //is AccessControl
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    /*bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");*/


   
    constructor(string memory name_, string memory symbol_, uint8 decimals_) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        /*_setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        _setRoleAdmin(MINTER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(BURNER_ROLE, ADMIN_ROLE);*/


    }

   
    function name() public view returns (string memory) {
        return _name;
    }

  
    function symbol() public view returns (string memory) {
        return _symbol;
    }

   
    function decimals() public view returns (uint8) {
        return _decimals;
    }

   
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

   
    function transfer(address to, uint256 amount) public returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

   
    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

   
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        _spendAllowance(from, to, amount);
        _transfer(from, to, amount);
        return true;
    }

   
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender] + addedValue);
        return true;
    }

  
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        require(_allowances[msg.sender][spender] >= subtractedValue, "ERC20: decreased allowance below zero");

        unchecked {
            _approve(msg.sender, spender, _allowances[msg.sender][spender] - subtractedValue);
        }

        return true;
    }

    

    function _mint(address account, uint256 amount) public  {
        _totalSupply += amount;
        _balances[account] += amount;
    }

    
    function _burn(address account, uint256 amount) public {
        require(_balances[account] >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = _balances[account] - amount;
        }
        _totalSupply -= amount;
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        _allowances[owner][spender] = amount;
    }


    function _transfer(address from, address to, uint256 amount) internal {
        require(_balances[from] >= amount, "ERC20: transfer amount exceeds balance");

        unchecked {
            _balances[from] = _balances[from] - amount;
        }
        _balances[to] += amount;
    }
    
    function _spendAllowance(address owner, address spender, uint256 amount) internal {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }


   
}
