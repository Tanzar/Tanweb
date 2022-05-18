<?php 
    session_start();
    $projectName = explode('/', $_SERVER['REQUEST_URI'])[1];
    require_once $_SERVER['DOCUMENT_ROOT'] . '/' . $projectName . '/vendor/autoload.php';
?>
<!DOCTYPE html>
<!--
This code is free to use, just remember to give credit.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <?php
        Tanweb\Config\Resources::linkCSS('main.css');
        Tanweb\Config\Resources::linkJS('RestApi.js');
        Tanweb\Config\Resources::linkExternal('jquery');
        ?>
    </head>
    <body>
        <?php 
            echo Tanweb\Session::getUsername();
        ?>
        <br>
        <br>
        <form method="POST" action="<?php echo Tanweb\Config\Scripts::get('login.php'); ?>">
            Username: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            <input type="submit" value="Login">
        </form>
        <form method="POST" action="<?php echo Tanweb\Config\Scripts::get('logout.php'); ?>">
            <input type="submit" value="Logout">
        </form>
        <a href="<?php echo \Tanweb\Config\Pages::getURL('test.php'); ?>">Test Page</a>
    </body>
    <script>
    </script>
</html>
