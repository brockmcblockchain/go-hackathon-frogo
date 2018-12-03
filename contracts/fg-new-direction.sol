pragma solidity ^0.5.0;
library SafeMath {
    /**
    * @dev Multiplies two numbers, reverts on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
    * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        return c;
    }

    /**
    * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
    * @dev Adds two numbers, reverts on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
    * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
    * reverts when dividing by zero.
    */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}


contract Frogo {
    using SafeMath for uint256;
    address payable public creator; //Just for testing purposes.
    constructor () public {
        creator = msg.sender;
    }
    modifier isOwner() {
        require(msg.sender == creator);
        _;
    }
    struct Task {
        uint256 TaskID;
        uint256 TaskStart;
        uint256 TaskEnd;
        string TaskDesc;
        uint256 TaskBounty;
        uint256 TaskDecayRate;
        bool TaskDecay;
        bool active;
        bool review;
        bool paid;
    }
    struct User {
        uint256 Balance;
        uint256 TotalChildren;
        address[] Children;
        uint256[] UserTasks;
        uint256[] AssignedTasks;
        address Parent;
        bytes32 Nickname;
        bool isChild;
        bool exists;
    }
    
    mapping(uint256 => Task) public Tasks;
    mapping(address => User) public Users;
    uint256 TotalUsers = 0;
    uint256 TotalTasks = 0;
   
    /***********************************
     *  CHILD FUNCTIONS
     * **********************************/
    function signin() public {
        if(!Users[msg.sender].exists){
            Users[msg.sender].isChild = false;
            Users[msg.sender].exists = true;
        }    
    }
   
    function checkIfChild() public view returns(bool t) {
        if(Users[msg.sender].TotalChildren > 0){
            t = Users[msg.sender].isChild;
        } else {
            t = false;
        }
        
    }

    function AddChild(address payable _child, string memory _nickname) public {
        require(_child != address(0), "Enter a valid address!");
        // New Child is born
        Users[_child].Parent = msg.sender;
        Users[_child].Nickname = stringToBytes32(_nickname);
        Users[_child].isChild = true;
        // Update Parent Info
        if(Users[msg.sender].TotalChildren >= 0){
            Users[msg.sender].TotalChildren++;
        } else {
            Users[msg.sender].TotalChildren = 0;
        }
        Users[msg.sender].Children[Users[msg.sender].TotalChildren] = _child; 
        TotalUsers++;
    }

    function getAllChildren() public view returns (address[20] memory a){
        for (uint256 i = 0; i < 20; i++) {
            a[i] = Users[msg.sender].Children[i];
        }
    }
   
    function getActiveTaskIDs(uint256 _page) public view returns (uint256[20] memory s) {
        uint256 count = 0;
        for (uint256 i = _page.mul(20); i < (100+_page) && (count < 20);i++) {
            if(Tasks[i].TaskID > 0 && Tasks[i].active == true && Tasks[i].review == false) {
              s[count] = Tasks[i].TaskID;
              count++;
            }
        }
    }
   
    function getActiveChildTaskIDs(address _child, uint256 _page) public view returns (uint256[20] memory s) {
        uint256 count = 0;
        for (uint256 i = _page.mul(20); i < (100+_page) && (count < 20);i++) {
            if(Tasks[i].TaskID > 0 && Tasks[i].active == true && Tasks[i].review == false) {
              s[count] = Tasks[i].TaskID;
              count++;
            }
        }
    }
   
    function getReviewableTaskIDs(uint256 _page) public view returns (uint256[20] memory s) {
        uint256 count = 0;
        for (uint256 i = _page.mul(20); i < (100 + _page) && (count < 20);i++) {
            if(Tasks[i].TaskID > 0 && Tasks[i].review == true && Tasks[i].active == true) {
              s[count] = Tasks[i].TaskID;
              count++;
            }
        }
    }
   
    function getCompletedTaskIDs(uint256 _page) public view returns (uint256[20] memory s) {
        uint256 count = 0;
        for (uint256 i = _page.mul(20); i < (100 + _page) && (count < 20);i++) {
            if(Tasks[i].TaskID > 0 && Tasks[i].paid == true) {
              s[count] = Tasks[i].TaskID;
              count++;
            }
        }
    }
   
    function getTaskInfo(uint256 _taskid) public view returns(uint256, string memory, uint256, uint256, bool, bool, bool) {
       return (Tasks[_taskid].TaskDecayRate, Tasks[_taskid].TaskDesc, Tasks[_taskid].TaskStart, Tasks[_taskid].TaskEnd, Tasks[_taskid].review, Tasks[_taskid].active, Tasks[_taskid].TaskDecay);
    }
   
    /***********************************
     *  WALLET/MONEY FUNCTIONS
     * **********************************/
   
    function Withdraw(uint256 _amount) public {
       //Withdraws Funds from the contract.
        require(Users[msg.sender].Balance >= _amount, "You have insufficient funds.."); // TODO: MAKE THIS ONLY ABLE TO WITHDRAW WHAT YOU ARE ALLOWED.
        Users[msg.sender].Balance = Users[msg.sender].Balance.sub(_amount);
        msg.sender.transfer(_amount);
    }
   
    function withdrawAll() public {
        require(Users[msg.sender].Balance >= 0);
        uint256 bal = Users[msg.sender].Balance;
        Users[msg.sender].Balance = Users[msg.sender].Balance.sub(bal);
        msg.sender.transfer(bal);
    }
   
    //Just default allow users to fund there accounts. any GO20's are lost.
    // REVIEW THIS MORE.
    function() external payable {
        Users[msg.sender].Balance = Users[msg.sender].Balance.add(msg.value);
    }
   
    function Deposit() public payable {
        Users[msg.sender].Balance = Users[msg.sender].Balance.add(msg.value);
    }
   
    function AddTask(address payable _childAddress, string memory _taskdescription, uint256 _tasklength, uint256 _taskbounty, bool _degrade, uint256 _decayrate) public {
        //try to check for correct balance to fund this.
        require(Users[msg.sender].Balance >= _taskbounty);
       
        //Increase total count.
        Users[msg.sender].Balance = Users[msg.sender].Balance.sub(_taskbounty);
        // Create Task
        TotalTasks = TotalTasks.add(1);
        Tasks[TotalTasks].TaskID = TotalTasks;
        Tasks[TotalTasks].TaskStart = now;
        Tasks[TotalTasks].TaskDesc = _taskdescription;
        Tasks[TotalTasks].TaskDecay = _degrade;
        Tasks[TotalTasks].TaskEnd = now + _tasklength;
        Tasks[TotalTasks].TaskBounty = _taskbounty;
        Tasks[TotalTasks].active = false;
        Tasks[TotalTasks].review = false;
        Tasks[TotalTasks].paid = false;
        Tasks[TotalTasks].TaskDecayRate = _decayrate;
        
        // Handle User Assignment
        Users[_childAddress].AssignedTasks[TotalTasks] = TotalTasks;
        // Credit Task Author User
        Users[msg.sender].UserTasks[TotalTasks] = TotalTasks;
    }
   
    function MarkTaskForReview(uint256 _taskid) public {
        Tasks[_taskid].review = true;
    }
   
    function RejectReviewedTask(uint256 _taskid, address _childaddr) public {
        require(msg.sender == Users[_childaddr].Parent, "You must be the parent of this child");
        Tasks[_taskid].active = true;
        Tasks[_taskid].review = false;
    }
   
    function CompleteTask(uint256 _taskid, address _child) public {
        require(_child != address(0));
        require(Tasks[_taskid].active == true); // An important Check, don't want them to be able to continuesly complete tasks!
        require(Tasks[_taskid].review == true); // Probably not important check, but kinda needs to be true.
       
        // Work out the bounty value.
        uint256 Bounty = Tasks[_taskid].TaskBounty;
        uint256 degrdeDailyRatio = (Tasks[_taskid].TaskDecay) ? Tasks[_taskid].TaskDecayRate : 1;
        uint256 degrateRatio = ((Tasks[_taskid].TaskEnd - Tasks[_taskid].TaskStart).div(86400)).mul(degrdeDailyRatio);
        uint256 trueBounty = Bounty.mul(degrateRatio);
        uint256 remaining = Bounty - trueBounty;
        
        Tasks[_taskid].active = false;
        Tasks[_taskid].review = false;
        
        Users[_child].Balance = Users[_child].Balance.add(trueBounty);
        Users[msg.sender].Balance = Users[msg.sender].Balance.add(remaining);
    }
   function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
    
    function kill() public {
        require(msg.sender == creator, "You must be the creator!");
        selfdestruct(creator);
    }
}
