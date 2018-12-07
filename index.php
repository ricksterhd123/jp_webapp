<?php require('utils/dbConnect.php'); ?> <html>
	<head>
		<title>Jumppack store page</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	</head>
	<body>
		<h1>Hello world</h1>
		<h1>Jetpack</h1>
		<h2>An all in one game launcher</h2>
        <article>
            <h3>Games list: </h3>
            <?php 
                $db = new dbConnection("35.205.37.34", getenv("MYSQL_USER"), getenv("MYSQL_PASSWORD"), getenv("MYSQL_DSN");
                $games = $db->query("SELECT * FROM games");
                for ($row_no = 0; $row_no <= count($games); $row_no++)
                {
                    echo "<p>". $games[$row_no]['Title'] . "</p>";
                }
            ?>
        </article>
	</body>
</html>

