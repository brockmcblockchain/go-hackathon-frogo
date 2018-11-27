<section class="inner-header"></section>
<section class="section">

  <h3>Adding a Tasks</h3>
  <p>Adding a task is as simple. Select the Child.  Add a description for the task and the bounty you're willing to pay.  Each day the child does not complete the task the bounty will drop by 10%.</p>
  <div class="blocks">
    <form id="AddChild">
    <div class="block cloneable">
      <div class="icon-container"><i class="fas fa-tasks"></i></div>
      <div class="content">
          <div class="field-group">
            <input name="task[]" type="text" placeholder="Task Description" />
          </div>
          <div class="field-group">
            <input name="bounty[]" type="text" placeholder="Bounty In GO" />
          </div>
      </div>
    </div>
    </form>
  </div>
  <div class="centered-content">
    <a href="#addAnotherTask" class="btn AddNewTask white"><i class="fas fa-plus"></i></a>
  </div>
  <div class="centered-content">
    <a href="#addChild" class="btn">Save Tasks</a>
  </div>
</section>
