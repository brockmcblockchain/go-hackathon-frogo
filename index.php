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
    <header class="header <?php echo ($page == 'home') ? 'home' : 'inner'; ?>">
      <nav class="main-navigation" id="mainNavigation">
        <?php if($page == 'home'): ?>
          <a href="/"><h1 class="logo"><span>Fro-Go</span></h1></a>
        <?php else: ?>
          <a class="dashboard-logo" href="/dashboard"><h1 class="logo"><span>Fro-Go</span></h1></a>
        <?php endif; ?>
        <?php if($page == 'home' || $page == 'buy-go'): ?>
          <a class="login-btn btn" href="/dashboard">Signin/up</a>
        <?php else: ?>
          <div id="GoBalance" class="go-balance"></div> <a class="buy-go" href="/buy-go"><i class="fas fa-shopping-cart"></i></a>
        <?php endif; ?>
      </nav>
    </header>

    <?php
      if(file_exists($page . '.php')){
        include $page . '.php';
      } else {
        include '404.php';
      }
    ?>

    <footer>
      <div class="copyright">All Rights Reserved &copy; <?php echo date('Y'); ?></div>
      <div class="social"><a href="https://twitter.com/FroGO73511141" target="_blank"><i class="fab fa-twitter"></i></a></div>
    </footer>
  </div>
</body>
</html>