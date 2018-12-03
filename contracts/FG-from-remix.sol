pragma solidity ^0.5.0;

contract FG {
   
    using SafeMath for uint256;
   
    address payable public creator; //Just for testing purposes.
   
    constructor () public {
        creator = msg.sender;
    }
   
    modifier isOwner() {
        require(msg.sender == creator);
        _;
    }
   
    uint256 GlobalTotal;//Maybe for some global stats? of tasks completed.
   
    struct sTask {
        uint256 TaskID;
        uint256 TaskStart;
        uint256 TaskEnd;
        string TaskDesc;
        uint256 TaskBounty;
        uint256 TaskDecayRate;
        bool TaskDecay;
        bool active;
        bool review;
    }

    uint256 testCount = 0;   
    
    // User Data
    mapping(address => uint256) public Balance; //Balance[address] = 'Funds in address'
    mapping(address => address) public Parent;
    mapping(address => uint256) public TotalChildren;
    mapping(address => bytes32) public Nickname;
    mapping(address => mapping ( address => bytes32)) public ParentChildNickname;
    /*
    mapping(address => mapping(uint256 =>  uint256)) public AssignedTasks;
    mapping(address => mapping(uint256 =>  uint256)) public ReviewableTasks;
    mapping(address => mapping(uint256 =>  uint256)) public CompletedTasks;
    */
    mapping(address => mapping(uint256 => sTask)) public Tasks;
    mapping(address => uint256) public TaskTotalCount;
    mapping(address => bool) AllowChange;
    mapping(address => bool) isChild;
   
    mapping(address => mapping(uint256 => address)) public ChildAddressByIndex;
    mapping(address => mapping(address => uint256)) public ChildToIndex;
   
    mapping ( address => uint256 ) public Children; //Children[parent] = 'Amount'
   
   
    /***********************************
     *  HELPER FUNCCTIONS
     * **********************************/
   /*
   function getBalance() public view returns (uint256 bal) {
       bal = Balance[msg.sender];
   }
   
   function getBalanceOf(address _user) public view returns(uint256 bal) {
       bal = Balance[_user];
   }
   */
   function getParent(address _child) public view returns(address p) {
       p = Parent[_child];
   }
   
   function getChildById(uint256 _childid) public view returns (address c) {
       c = ChildAddressByIndex[msg.sender][_childid];
   }
   
   function getChildByAddress(address _childaddr) public view returns (uint256 id) {
       id = ChildToIndex[msg.sender][_childaddr];
   }
   
   function isChildAccount(address _child) public view returns(bool isKid) {
       isKid = isChild[_child];
   }
   
   function getParentsNicknameForChildByAddress(address _child) public view returns (bytes32 s) {
       s = ParentChildNickname[msg.sender][_child];
   }
   
   function getParentsNicknameForChildByID(uint256 _childId) public view returns (bytes32 s) {
       s = ParentChildNickname[msg.sender][ChildAddressByIndex[msg.sender][_childId]];
   }
   
   function getNickname() public view returns (bytes32 s) {
       s = Nickname[msg.sender];
   }
   
   function getTotalChildren() public view returns (uint256 t) {
       t = TotalChildren[msg.sender];
   }
   
    /***********************************
     *  CHILD FUNCTIONS
     * **********************************/
   
    function checkIfChild() public view returns(bool t) {
        t = isChild[msg.sender];
    }
 
    function MorePlease() public {
        testCount++;
    }
   
    function AddChild(address payable child, string memory _nickname) public {
        require(child != address(0), "Enter a valid address!");
        uint256 kids = (Children[msg.sender]) ;
        ChildAddressByIndex[msg.sender][kids] = child;
        ChildToIndex[msg.sender][child] = Children[msg.sender];
        Parent[child] = msg.sender;
        AllowChange[child] = false;
        TotalChildren[msg.sender]++;
        Children[msg.sender]++;
        ParentChildNickname[msg.sender][child] = stringToBytes32(_nickname);
        //Force them as a child.
        isChild[child] = true;
    }
   
    function setChildName(uint256 _id, string memory _newname) public {
        require(_id <= TotalChildren[msg.sender]);
        Nickname[msg.sender] = stringToBytes32(_newname);
    }
   
    function getAllChildren() public view returns (address[20] memory s){
        for (uint256 i = 0; i < 20;i++) {
            s[i] = ChildAddressByIndex[msg.sender][i];
        }
    }
   
    function getActiveTaskIDs(uint256 _page) public view returns (uint256[20] memory s) {
        uint256 count = 0;
        for (uint256 i = _page.mul(20); i < (100+_page) && (count < 20);i++) {
            if(Tasks[msg.sender][i].TaskID > 0 && Tasks[msg.sender][i].active == true && Tasks[msg.sender][i].review == false) {
              s[count] = Tasks[msg.sender][i].TaskID;
              count++;
            }
        }
    }
   
    function getActiveChildTaskIDs(address _child, uint256 _page) public view returns (uint256[20] memory s) {
        uint256 count = 0;
        for (uint256 i = _page.mul(20); i < (100+_page) && (count < 20);i++) {
            if(Tasks[_child][i].TaskID > 0 && Tasks[_child][i].active == true && Tasks[_child][i].review == false) {
              s[count] = Tasks[_child][i].TaskID;
              count++;
            }
        }
    }
   
    function getReviewableTaskIDs(uint256 _page) public view returns (uint256[20] memory s) {
        uint256 count = 0;
        for (uint256 i = _page.mul(20); i < (100 + _page) && (count < 20);i++) {
            if(Tasks[msg.sender][i].TaskID > 0 && Tasks[msg.sender][i].review == true && Tasks[msg.sender][i].active == true) {
              s[count] = Tasks[msg.sender][i].TaskID;
              count++;
            }
        }
    }
   
    function getCompletedTaskIDs(uint256 _page) public view returns (uint256[20] memory s) {
        uint256 count = 0;
        for (uint256 i = _page.mul(20); i < (100 + _page) && (count < 20);i++) {
            if(Tasks[msg.sender][i].TaskID > 0 && Tasks[msg.sender][i].review == false && Tasks[msg.sender][i].active == false) {
              s[count] = Tasks[msg.sender][i].TaskID;
              count++;
            }
        }
    }
   
    function getTaskInfo(uint256 _taskid) public view returns(uint256, string memory, uint256, uint256, bool, bool, bool) {
       return (Tasks[msg.sender][_taskid].TaskDecayRate, Tasks[msg.sender][_taskid].TaskDesc, Tasks[msg.sender][_taskid].TaskStart, Tasks[msg.sender][_taskid].TaskEnd, Tasks[msg.sender][_taskid].review, Tasks[msg.sender][_taskid].active, Tasks[msg.sender][_taskid].TaskDecay);
    }
   
    /***********************************
     *  WALLET/MONEY FUNCTIONS
     * **********************************/
   
    function Withdraw(uint256 _amount) public {
       //Withdraws Funds from the contract.
        require(Balance[msg.sender] >= _amount, "You have insufficient funds.."); // TODO: MAKE THIS ONLY ABLE TO WITHDRAW WHAT YOU ARE ALLOWED.
        Balance[msg.sender] = Balance[msg.sender].sub(_amount);
        msg.sender.transfer(_amount);
    }
   
    function withdrawAll() public {
        require(Balance[msg.sender] >= 0);
        uint256 bal = Balance[msg.sender];
        Balance[msg.sender] = Balance[msg.sender].sub(bal);
        msg.sender.transfer(bal);
    }
   
    //Just default allow users to fund there accounts. any GO20's are lost.
    function() external payable {
        Balance[msg.sender] = Balance[msg.sender].add(msg.value);
    }
   
    function Deposit() public payable {
        Balance[msg.sender] = Balance[msg.sender].add(msg.value);
    }
   
    function requestWalletChange() public {
        AllowChange[msg.sender] = true;
        //For the children to use, to allow their parent to change the address.
    }
   
    function denyWalletChange() public {
        AllowChange[msg.sender] = false;
        //For the children to use, encase of parents wallet change request isn't authorized.
    }
   
    function ChangeKidsAddress(uint256 _ChildId, address payable child) public {
        require(Parent[ChildAddressByIndex[msg.sender][_ChildId]] == msg.sender); //Require prent can only change the payout/reference address for their kid.
        require(AllowChange[child] == true, "This child has opted out of allowing you to change payout address.");
        ChildAddressByIndex[msg.sender][_ChildId] = child;
        AllowChange[msg.sender] = false;
    }
   
    /***********************************
     *  TASK FUNCTIONS
     * **********************************/
   
    function AddTask(address payable _childAddress, string memory _taskdescription, uint256 _tasklength, uint256 _taskbounty, bool _degrade, uint256 _decayrate) public {
        //try to check for correct balance to fund this.
        require(Balance[msg.sender] >= _taskbounty);
       
        //Increase total count.
        Balance[msg.sender] = Balance[msg.sender].sub(_taskbounty);
        TaskTotalCount[msg.sender] = TaskTotalCount[msg.sender].add(1);
        Tasks[_childAddress][TaskTotalCount[msg.sender]].TaskID = TaskTotalCount[msg.sender];
        Tasks[_childAddress][TaskTotalCount[msg.sender]].TaskStart = now;
        Tasks[_childAddress][TaskTotalCount[msg.sender]].TaskDesc = _taskdescription;
        Tasks[_childAddress][TaskTotalCount[msg.sender]].TaskDecay = _degrade;
        Tasks[_childAddress][TaskTotalCount[msg.sender]].TaskEnd = now + _tasklength;
        Tasks[_childAddress][TaskTotalCount[msg.sender]].TaskBounty = _taskbounty;
        Tasks[_childAddress][TaskTotalCount[msg.sender]].active = false;
        Tasks[_childAddress][TaskTotalCount[msg.sender]].review = false;
        Tasks[_childAddress][TaskTotalCount[msg.sender]].TaskDecayRate = _decayrate;
    }
   
    function MarkTaskForReview(uint256 _taskid) public {
        Tasks[msg.sender][_taskid].review = true;
    }
   
    function RejectReviewedTask(uint256 _taskid, address _childaddr) public {
        require(msg.sender == Parent[_childaddr], "You must be the parent of this child");
        Tasks[_childaddr][_taskid].active = true;
        Tasks[_childaddr][_taskid].review = false;
    }
   
    function CompleteTask(uint256 _taskid, uint256 _childid) public {
        //Some checks. Address isnt 0, Task IS active, Task IS marked for Review.
        require(ChildAddressByIndex[msg.sender][_childid] != address(0));
        require(Tasks[ChildAddressByIndex[msg.sender][_childid]][_taskid].active == true); // An important Check, don't want them to be able to continuesly complete tasks!
        require(Tasks[ChildAddressByIndex[msg.sender][_childid]][_taskid].review == true); // Probably not important check, but kinda needs to be true.
       
        // Work out the bounty value.
        sTask memory task = Tasks[msg.sender][_taskid];
        uint256 Bounty = task.TaskBounty;
        uint256 degrdeDailyRatio = (task.TaskDecay) ? task.TaskDecayRate : 1;
        uint256 degrateRatio = ((task.TaskEnd - task.TaskStart).div(86400)).mul(degrdeDailyRatio);
        uint256 trueBounty = Bounty.mul(degrateRatio);
        uint256 remaining = Bounty - trueBounty;
        //Mark complete
        Tasks[ChildAddressByIndex[msg.sender][_childid]][_taskid].active = false;
        Tasks[ChildAddressByIndex[msg.sender][_childid]][_taskid].review = false;
        GlobalTotal++; // Global completed tasks.
        // Pay the Kid.
        Balance[ChildAddressByIndex[msg.sender][_childid]] = Balance[msg.sender].add(trueBounty);//
        Balance[msg.sender] = Balance[msg.sender].add(remaining);// Return rest of funds!
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
