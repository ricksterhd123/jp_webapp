<html>
	<head>
		<title>Jumppack games page</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
		<link rel="stylesheet" href="style.css"/>
	</head>
	<body>
		<h1>Jetpack - A simple games launcher</h1>
		<h2>Games:</h2>
		<?php 
		      require("vendor/autoload.php");
		      use Medoo\Medoo;
		      $database = new Medoo(['database_type' => 'mysql', 
					     'database_name' => getenv("MYSQL_DSN"),
					     'server' => '35.205.37.34',
					     'username' => getenv("MYSQL_USER"),
					     'password' => getenv("MYSQL_PASSWORD")]);

		     $data = $database->select('games', '*');
		     if (empty($data)) { exit(); }
		     for ($i = 0; $i <= count($data); $i++)
		     {
			echo '<article class="game">';
		     	echo "<h3>";
			echo "<h4>" . $data[$i]["Title"] . "</h4>";
		        echo "<p>" . $data[$i]["PublisherID"] . "</p>";
			echo "<p>" . $data[$i]["ProducerID"] . "</p>";
			echo "</h3>";
			echo "</article>";
		     }
		?>
	</body>
</html>
