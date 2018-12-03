pragma solidity ^0.4.2;

contract FroGo {
  Task[] public Tasks;

  struct Task {
    bytes32 value;
    address creator;
    address assignee;
    uint128 bounty;
    bool active;
    bool review;
    bool paid;
  }

  function addTodoItem(bytes32 _value, address _assignee, uint128 _bounty) returns (bool success) {
    Task memory task;
    task.value = _value;
    task.creator = msg.sender;
    task.assignee = _assignee;
    task.bounty = _bounty;
    task.active = true;
    task.review = false;
    task.paid = false;

    Tasks.push(task);
    return true;
  }

  function getAllTasks() constant returns (bytes32[], address[], uint128[], bool[]) {
    uint length = Tasks.length;

    bytes32[] memory values = new bytes32[](length);
    uint128[] memory bounties = new uint128[](length);
    address[] memory assignees = new address[](length);
    bool[] memory actives = new bool[](length);

    for (uint i = 0; i < length; i++) {
      values[i] = Tasks[i].value;
      bounties[i] = Tasks[i].bounty;
      assignees[i] = Tasks[i].assignee;
      actives[i] = Tasks[i].active;
    }

    return (values, assignees, bounties, actives);
  }
  function getActiveTasksByChildAddress(address _assignee) constant returns (bytes32[], uint128[], bool[]) {
    uint length = Tasks.length;

    bytes32[] memory values = new bytes32[](length);
    uint128[] memory bounties = new uint128[](length);
    bool[] memory actives = new bool[](length);

    for (uint i = 0; i < length; i++) {
      if(Tasks[i].assignee == _assignee){
          values[i] = Tasks[i].value;
          bounties[i] = Tasks[i].bounty;
          actives[i] = Tasks[i].active;
      }
    }

    return (values, bounties, actives);
  }
  
  function getReviewTasksByParentAddress(address _creator) constant returns (bytes32[], uint128[], bool[]) {
    uint length = Tasks.length;

    bytes32[] memory values = new bytes32[](length);
    uint128[] memory bounties = new uint128[](length);
    bool[] memory actives = new bool[](length);

    for (uint i = 0; i < length; i++) {
      if(Tasks[i].creator == _creator && Tasks[i].review == true){
          values[i] = Tasks[i].value;
          bounties[i] = Tasks[i].bounty;
          actives[i] = Tasks[i].active;
      }
    }

    return (values, bounties, actives);
  }

  function doChangeTaskToReview(uint128 _taskId) {
      Tasks[_taskId].review = true;
  }
  function doRejectTaskToReview(uint128 _taskId) {
      Tasks[_taskId].review = false;
  }
  
}