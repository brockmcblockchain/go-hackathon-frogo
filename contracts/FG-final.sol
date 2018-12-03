pragma solidity ^0.4.2;

contract FroGo {
    Task[] public Tasks;
    Child[] public Children;

    struct Task {
        bytes32 value;
        address creator;
        address assignee;
        uint128 bounty;
        uint128 startDate;
        uint128 endDate;
        bool useDecay;
        bool active;
        bool review;
        bool paid;
    }

    struct Child {
        bytes32 name;
        address parentAddress;
        address childAddress;
    }

  /****************************
   * CHILDREN FUNCTIONS
   * *************************/
    function addChild(bytes32 _name, address _child) constant returns (bool success) {
        Child memory newChild;
        newChild.name = _name;
        newChild.parentAddress = msg.sender;
        newChild.childAddress = _child;
        Children.push(newChild);
        return true;
    }

    function getParentsChildren(address _parent) returns (bytes32[], address[]) {
        uint length = Children.length;
        address[] memory assignees = new address[](length);
        bytes32[] memory names = new bytes32[](length);

        for (uint i = 0; i < length; i++) {
          if(Children[i].parentAddress == _parent){
            assignees[i] = Children[i].childAddress;
            names[i] = Children[i].name;
          } else {
              length--;
          }
        }
        return (names, assignees);
    }

    function checkIfChild(address _parent) constant  returns (bool) {
        uint length = Children.length;
        bool isChild = false;

        for (uint i = 0; i < length; i++) {
          if(Children[i].childAddress == _parent){
            isChild = true;
          }
        }
        return isChild;
    }

    /***************************
    * TASK FUNCTIONS
    * *************************/
    function addTask(bytes32 _value, address _assignee, uint128 _startDate, uint128 _endDate, uint128 _bounty) constant returns (bool success) {
        Task memory newTask;
        newTask.value = _value;
        newTask.creator = msg.sender;
        newTask.assignee = _assignee;
        newTask.bounty = _bounty;
        newTask.startDate = _startDate;
        newTask.endDate = _endDate;
        newTask.useDecay = true;
        newTask.active = true;
        newTask.review = false;
        newTask.paid = false;

        Tasks.push(newTask);
        return true;
    }

  function getAllTasks() returns (uint256[], bytes32[], uint128[], uint128[], uint128[], address[]) {
    uint length = Tasks.length;

    bytes32[] memory descriptions = new bytes32[](length);
    uint128[] memory bounties = new uint128[](length);
    uint256[] memory taskIds = new uint256[](length);
    uint128[] memory startDates = new uint128[](length);
    uint128[] memory endDates = new uint128[](length);
    address[] memory assignees = new address[](length);
    // bool[] memory actives = new bool[](length);

    for (uint i = 0; i < length; i++) {
      taskIds[i] = i;
      descriptions[i] = Tasks[i].value;
      bounties[i] = Tasks[i].bounty;
      startDates[i] = Tasks[i].startDate;
      endDates[i] = Tasks[i].endDate;
      assignees[i] = Tasks[i].assignee;
      // actives[i] = Tasks[i].active;
    }

    return (taskIds, descriptions, bounties, startDates, endDates, assignees);
  }
  function getActiveTasksByChildAddress(address _assignee) returns (uint256[], bytes32[], uint128[], uint128[], uint128[], address[]) {
    uint length = Tasks.length;

    bytes32[] memory descriptions = new bytes32[](length);
    uint128[] memory bounties = new uint128[](length);
    uint256[] memory taskIds = new uint256[](length);
    uint128[] memory startDates = new uint128[](length);
    uint128[] memory endDates = new uint128[](length);
    address[] memory taskAssignees = new address[](length);
    // bool[] memory actives = new bool[](length);

    for (uint i = 0; i < length; i++) {
      if(Tasks[i].assignee == _assignee && Tasks[i].review == false && Tasks[i].active == true && Tasks[i].paid == false){
          taskIds[i] = i;
          descriptions[i] = Tasks[i].value;
          bounties[i] = Tasks[i].bounty;
          startDates[i] = Tasks[i].startDate;
          endDates[i] = Tasks[i].endDate;
          taskAssignees[i] = Tasks[i].assignee;
          // actives[i] = Tasks[i].active;
      }
    }

    return (taskIds, descriptions, bounties, startDates, endDates, taskAssignees);
  }

  function getReviewTasksByParentAddress(address _creator) returns (uint256[], bytes32[], uint128[], uint128[], uint128[], address[]) {
    uint length = Tasks.length;

    bytes32[] memory descriptions = new bytes32[](length);
    uint128[] memory bounties = new uint128[](length);
    uint256[] memory taskIds = new uint256[](length);
    uint128[] memory startDates = new uint128[](length);
    uint128[] memory endDates = new uint128[](length);
    address[] memory assignees = new address[](length);
    // bool[] memory actives = new bool[](length);

    for (uint i = 0; i < length; i++) {
      if(Tasks[i].creator == _creator && Tasks[i].review == true && Tasks[i].active == true && Tasks[i].paid == false){
        taskIds[i] = i;
        descriptions[i] = Tasks[i].value;
        bounties[i] = Tasks[i].bounty;
        startDates[i] = Tasks[i].startDate;
        endDates[i] = Tasks[i].endDate;
        assignees[i] = Tasks[i].assignee;
        // actives[i] = Tasks[i].active;
      }
    }

    return (taskIds, descriptions, bounties, startDates, endDates, assignees);
  }

  function getActiveTasksByParentAddress(address _creator) returns (uint256[], bytes32[], uint128[], uint128[], uint128[], address[]) {
    uint length = Tasks.length;

    bytes32[] memory descriptions = new bytes32[](length);
    uint128[] memory bounties = new uint128[](length);
    uint256[] memory taskIds = new uint256[](length);
    uint128[] memory startDates = new uint128[](length);
    uint128[] memory endDates = new uint128[](length);
    address[] memory assignees = new address[](length);
    // bool[] memory actives = new bool[](length);

    for (uint i = 0; i < length; i++) {
      if(Tasks[i].creator == _creator && Tasks[i].review == false && Tasks[i].active == true && Tasks[i].paid == false){
        taskIds[i] = i;
        descriptions[i] = Tasks[i].value;
        bounties[i] = Tasks[i].bounty;
        startDates[i] = Tasks[i].startDate;
        endDates[i] = Tasks[i].endDate;
        assignees[i] = Tasks[i].assignee;
      }
    }

    return (taskIds, descriptions, bounties, startDates, endDates, assignees);
  }

  function hasParentMadeTask(address _creator) constant returns (bool) {
    bool tasksMade = false;
    uint length = Tasks.length;

    for (uint i = 0; i < length; i++) {
      if(Tasks[i].creator == _creator){
        tasksMade = true;
      }
    }
    return tasksMade;
  }

  function doChangeTaskToReview(uint128 _taskId) {
      Tasks[_taskId].review = true;
  }
  function doRejectTaskToReview(uint128 _taskId) {
      Tasks[_taskId].review = false;
  }
  function doCompleteTask(uint128 _taskId) {
      Tasks[_taskId].paid = true;
      Tasks[_taskId].review = false;
      Tasks[_taskId].active = false;
  }

}