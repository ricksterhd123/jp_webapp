<html>
	<head>
		<title>Jumppack games page</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
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
		     	echo "<h3>";
			echo "<p>" . $data[$i]["Title"] . "</p>";
		        echo "<p>" . $data[$i]["PublisherName"] . "</p>";
			echo "<p>" . $data[$i]["ProducerName"] . "</p>";
			echo "</h3>";
		     }
		?>
	</body>
</html>
