<html>
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
        </article>
	</body>
</html>

<?php 
      require("vendor/autoload.php");
      user Medoo\Medoo;
      $database = new Medoo(['database_type' => 'mysql', 
			     'database_name' => getenv("MYSQL_DSN"),
			     'server' => '35.205.37.34',
			     'username' => getenv("MYSQL_USER"),
			     'password' => getenv("MYSQL_PASSWORD")]);

     $data = $database->select('games', '*');
     echo json_encode($data);
?>
