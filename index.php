<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
	<title>Raptor</title>
    <script type="text/javascript" src="js/phaser.js"></script>
    <script type="text/javascript" src="js/preload.js"></script>
    <script type="text/javascript" src="js/variables.js"></script>
    <script type="text/javascript" src="js/create.js"></script>
    <script type="text/javascript" src="js/functions.js"></script>
    <script type="text/javascript" src="js/update.js"></script>
	<script type="text/javascript" src="js/render.js"></script>

    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body>

    <script type="text/javascript">
        alert(gameWidth)
        var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    </script>

</body>
</html>