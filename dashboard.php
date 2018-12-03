<section class="section">

<div id="NoWallet" class="centered no-account">
  <h2>Well this is embarrassing! We can’t create or locate your account right now.</h2>
  <p>This could be caused by a few reasons, if you follow the questions and steps below, we will soon have you up and running.
  First question – Is this your first attempt at creating your account? If so, you need to create a wallet which automatically enable your account. There are two ways of creating an account depending on whether you are accessing Fro-GO via a mobile or desktop.</p>
  <div class="centered-content">
    <h5>Option 1 – Accessing via a desktop</h5>
  </div>
  <div class="centered-content bottom-margin">
    <img src="/images/img-metamask.jpg" />
  </div>

  <p>Please go to <a href="https://metamask.io/" target="_blank">https://metamask.io/</a> here you can create a crypto wallet and use it through a Chrome Extension, their “Brave Browser” or Chrome Firefox Opera. Once you have created the wallet come back to this page and your account will instantly be available. For more information on metamask you can <a href="https://www.youtube.com/watch?v=6Gf_kRE4MJU" target="_blank">watch their Metamask introduction video</a> </p>

  <div class="centered-content">
    <h5>Option 2 – Accessing via a mobile</h5>
  </div>
  <div class="centered-content bottom-margin">
    <img src="/images/img-trustwallet.jpg" />
  </div>
  
  <p>Please go to <a href="https://trustwallet.com/" target="_blank">https://trustwallet.com/</a> and download the app for relevant for your device. You can then follow the instructions and have a wallet created quickly and easily. Upon completion you will be able to see the DApps icon at the bottom of the wallet screen, simply click this and select Fro-GO from the list. You will instantly be logged in, easy! For more information on Trust wallet you can watch <a href="https://www.youtube.com/watch?v=712BGhU_4oU" target="_blank">the Trustwallet introduction video</a>. </p>

  <p>Second question – So this isn’t your first visit to us and suddenly its all stopped working? If that is the case the first step is to ensure you are connected to your wallet. Make sure you can view your wallet balance and have no issues with its use. If you do then please work through the help guides for the relevant wallet and try again.</p>
  <div class="centered-content bottom-margin">
    <a href="https://metamask.zendesk.com/hc/en-us" class="btn" target="_blank">Metamask Support pages</a>
    <a href="https://help.trustwallet.com/hc/en-us" class="btn" target="_blank">Trust Wallet Support pages</a>
  </div>
  <p>Third question – Still here and still no joy? This is getting even more embarrassing! We want you to have a seamless and easy experience with Fro-GO so we apologise things are not going to plan. Please can you email us at Support@Frogotheworld.com with your wallet address and brief description on what you are experiencing (including which wallet you use) and we will get right on it to get you back up and running. We may need to chat with you so please keep an eye on your emails including your spam mail in case your mailbox doesn’t realise how awesome we are!</p>
</div>

<div id="Parent" class="dashboard parent-dashboard <?php echo (array_key_exists('debug', $_REQUEST)) ? ' forced-active ' : ''; ?>">
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
  <div class="centered-content">
    <a href="#addAnotherChild" class="btn AddNewChild white"><i class="fas fa-plus"></i><i class="fas fa-minus"></i> Add New Child</a>
  </div>
  <div class="blocks" id="ChildrenContainer">
    <div class="block child-template cloneable">
      <div class="icon-container"><i class="fas fa-child"></i></div>
      <div class="content child-name"></div>
      <a class="action-container addTaskForChild" data-child="" href="#addNewTaskLocation">Add Tasks</a>
    </div>
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
  <a name="addNewTaskLocation" id="addNewTaskLocation"></a>
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
    <?php /* <a href="#historicalTasks" class="faded">Historical tasks</a> */ ?>
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

  <div class="section-header">
    <h2>Active Tasks Assigned To Children</h2>
  </div>
  <p>This is a list of all the assigned tasks from your children that have not been marked for your review yet.</p>
  <div class="blocks" id="ParentActiveTasksContainer">
    <div class="block parent-active-tasks">
      <div class="icon-container"><span class="task-bounty-value">10 Go</span></div>
      <div class="content task-description-value"></div>
    </div>
  </div>
</div>

<div id="Child" class="dashboard child-dashboard <?php echo (array_key_exists('debug', $_REQUEST)) ? ' forced-active ' : ''; ?>">
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
