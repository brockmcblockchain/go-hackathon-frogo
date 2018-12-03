<section class="section">

<div id="Parent" class="dashboard parent-dashboard">
  <div id="QuickStartGuide" class="quick-start-guide">
    <h3>Quick Start Guide</h3>
    <p>Thanks for Signing up.  To use our service you will need to complete the following:</p>
    <div class="blocks">
      <div class="block quick-start-step" id="BuyGo">
        <div class="icon-container"><i class="fas fa-shopping-cart"></i></div>
        <div class="content">
          Fund your account by <strong>Buying Go</strong>
        </div>
        <a class="action-container" href="https://www.binance.com/?ref=12087050" target="_blank">Buy Go</a>
      </div>
      <div class="block quick-start-step" id="AddFirstChild">
        <div class="icon-container"><i class="fas fa-child"></i></div>
        <div class="content">
          Add at least one <strong>Child</strong>.
        </div>
        <a class="action-container" href="#children">Add Children</a>
      </div>
      <div class="block quick-start-step" id="AddFirstTask">
        <div class="icon-container"><i class="fas fa-tasks"></i></div>
        <div class="content">
          Assign <strong>Tasks</strong> to your children.
        </div>
        <a class="action-container"  href="#tasks">Add Tasks</a>
      </div>
    </div>
  </div>

  <h3>Parent Dashboard</h3>
  <a id="children" name="children"></a>
  <div class="section-header">
    <h2>Children</h2>
  </div>
  <div class="blocks" id="ChildrenContainer">
    <div class="block child-template cloneable">
      <div class="icon-container"><i class="fas fa-child"></i></div>
      <div class="content child-name"></div>
      <a class="action-container addTaskForChild" data-child="" href="#addTasks">Add Tasks</a>
    </div>
  </div>
  <div class="centered-content">
    <a href="#addAnotherChild" class="btn AddNewChild white"><i class="fas fa-plus"></i><i class="fas fa-minus"></i></a>
  </div>
  <div id="NewChild" class="new-child-container">
    <h3>Add New Child</h3>
    <p>Adding a child is as simple as adding their wallet address and a nick name.   Make sure you <strong>send them at least 1 GO</strong> for transaction fees.</p>
    <div class="blocks">
      <div class="block">
        <div class="icon-container"><i class="fas fa-wallet"></i></div>
        <div class="content">
          <form id="AddChild">
            <div class="field-group">
              <input id="NewChildWalletAddress" name="wallet" type="text" placeholder="GO Wallet Address" />
            </div>
            <div class="field-group">
              <input id="NewChildNickname" name="nickname" type="text" placeholder="Child Nickname" />
            </div>
          </form>
        </div>
      </div>
      <div class="centered-content">
        <a href="#addChild" class="btn addNewChildSubmit">Save Child</a> <a href="#cancel" class="btn black cancelChild">Cancel</a>
      </div>
    </div>
  </div>

  <div id="NewTask" class="new-task-container">
    <h3>Add New Tasks</h3>
    <p>Adding a task is as simple. Select the Child.  Add a description for the task and the bounty you're willing to pay.  Each day the child does not complete the task the bounty will drop by 10%.</p>
  <form id="AddTask">
    <div class="blocks" id="TaskBlocks">
      <div class="block cloneable">
        <div class="icon-container"><i class="fas fa-tasks"></i></div>
        <div class="content">
            <div class="field-group">
              <input name="task" type="text" id="TaskDescription" placeholder="Task Description" />
            </div>
            <div class="field-group">
              <input name="endDate" type="date" id="TaskEndDate" placeholder="End Date" />
            </div>
            <div class="field-group">
              <input name="bounty" type="text" id="TaskBounty" placeholder="Bounty In GO" />
            </div>
            <div class="field-group">
              <input type="checkbox" value="true" id="TaskUseDecay" class="checkbox" /> Use Decay on Bounty?
            </div>
        </div>
      </div>
      <input type="hidden" id="TaskChildAddress" name="childId" value="" />
    </div>
  </form>
  <?php /*
  <div class="centered-content">
    <a href="#addAnotherTask" class="btn AddNewTask white"><i class="fas fa-plus"></i></a>
  </div>
  */ ?>
  <div class="centered-content">
    <a href="#addChild" id="AddNewTaskSubmit" class="btn addNewTaskSubmit">Save Tasks</a> <a href="#cancelTask" class="btn cancel black cancelTask">Cancel</a>
  </div>
  </div>


  <a id="tasks" name="tasks"></a>
  <div class="section-header">
    <h2>Reviewable Tasks</h2>
    <a href="#historicalTasks" class="faded">Historical tasks</a>
  </div>
  <p>This is a list of all the completed tasks from your children that have not been paid out yet.  Please review each task for completeness and then <strong>mark Accept</strong> to approve the payment of the bounty.</p>
  <div class="blocks" id="ReviewAbleTaskContainer">
     <div class="block reviewable-task">
      <div class="icon-container"><span>10 Go</span></div>
      <div class="content">
        <div class="dueDate">Month, 20th 2018</div>
      </div>
      <a class="action-container mark-task-as-completed" href="#markAsCompleted" data-taskid=""><i class="fas fa-check-double"></i>  Accept</a>
      <a class="action-container reject-task warning" href="#rejectTaskReview" data-taskid=""><i class="fas fa-ban"></i> Reject</a>
    </div>
  </div>
</div>
<div id="Child" class="dashboard child-dashboard">
  <h3>Child Dashboard</h3>
  <p>Below you will find a list of assigned an available tasks for you to work.  Once you finish each job you can submit it for review to the Task Creator.  Once approved you will be instantly credited with the bounty.  Keep in mind the bounties decrease the more time passes from when the task was created.</p>
  <div class="blocks" id="ChildTaskContainer">
    <div class="block active-tasks">
      <div class="icon-container"><span class="task-bounty-value">10 Go</span></div>
      <div class="content task-description-value">
        Take a shower <strong>under 5 Minutes</strong>
        <div class="dueDate task-end-date">Month, 20th 2018</div>
      </div>
      <a class="action-container mark-task-for-review MarkTaskForReview" href="#markAsCompleted" data-childaddress="" data-taskid=""><i class="fas fa-check"></i> Mark Complete!</a>
    </div>
  </div>
</div>

</section>
