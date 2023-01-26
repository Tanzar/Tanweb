<?php 
    session_start();
    require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
    
    use Tanweb\Config\Resources as Resources;
    use Tanweb\Config\Scripts as Scripts;
    use Tanweb\Session as Session;
    use Tanweb\Config\Pages as Pages;
    use Tanweb\Security\PageAccess as PageAccess;
    
    PageAccess::blockInternetExplorer();
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
        Resources::linkCSS('main.css');
        Resources::linkJS('RestApi.js');
        Resources::linkExternal('jquery');
        ?>
    </head>
    <body>
        <?php 
            echo Session::getUsername();
        ?>
        <br>
        <br>
        <form method="POST" action="<?php echo Scripts::get('login.php'); ?>">
            Username: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            <input type="submit" value="Login">
        </form>
        <form method="POST" action="<?php echo Scripts::get('logout.php'); ?>">
            <input type="submit" value="Logout">
        </form>
        <a href="<?php echo Pages::getURL('test.php'); ?>">Test Page</a>
    </body>
    <script>
    </script>
</html>
