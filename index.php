<?php $page = (array_key_exists('page', $_REQUEST)) ? $_REQUEST['page'] : 'home'; ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Fro-Go: Green Chore Rewards </title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Cabin|Lato" rel="stylesheet">
  <link rel="stylesheet" type="text/css" media="screen" href="/css/style.css" />
  <script src="/js/main.js"></script>
</head>
<body>
  <div id="dapp">
    <nav class="main-navigation" id="mainNavigation">
      <h1 class="logo"><span>Fro-Go</span></h1>
      <?php if($page == 'home'): ?>
        <a class="login-btn btn" href="/parent">Signin/up</a>
      <?php else: ?>
        <a href="?page=task-list" class="btn-link"><i class="fas fa-bell"></i></a>
      <?php endif; ?>
    </nav>

    <?php
      if(file_exists($page . '.php')){
        include $page . '.php';
      } else {
        include '404.php';
      }
    ?>

    <footer>
      <div class="copyright">All Rights Reserved &copy; <?php echo date('Y'); ?></div>
      <div class="social"><a href="http://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i></a></div>
    </footer>
    <ul class="debug-links">
      <li><a href="/parent">Parent Dashboard</a></li>
      <li><a href="/task-list">TaskList/Child Dashboard</a></li>
      <li><a href="/task-list-manage">TaskList Managment (parent)</a></li>
      <li><a href="/task-add">Add New Tasks</a></li>
      <li><a href="/children-add">Add New Child</a></li>
    </ul>
  </div>
</body>
</html>