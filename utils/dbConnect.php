<?php
    
    /* 
       Class for communication with SQL servers.
       Allows the user to query with the database without having to worry about the 
       implementation of php mysqli.
    */
    class dbConnection 
    {
        // Database credentials:
        private $hostname;      // URL path to database server.
        private $username;      // MySQL username
        private $password;      // MySQL password
        private $databaseName;  // MySQL database naem
        private $connection;    // mysqli connection
        
        public function __construct($hostname, $username, $password, $databaseName)
        {
            $this->hostname = $hostname;
            $this->username = $username;
            $this->password = $password;
            $this->databaseName = $databaseName;
            $this->connect();
        }
        /* Generic getter */
        public function __get($property) 
        {
            if (property_exists($this, $property)) 
            {
                return $this->$property;
            }
        }

        /* Generic setter */
        public function __set($property, $value) 
        {
            if (property_exists($this, $property)) 
            {
                $this->$property = $value;
            }
        }
        
        /*
            Queries the database
            Param: $query - The query string *unescaped*.
            Returns: Array of query results
        */
        public function query($queryString)
        {
            assert($this->connection != false && $this->connection != NULL);        
            $queryString = $this->connection->real_escape_string($queryString);     // Escape the query string for security reasons.
            $queryResult = $this->connection->query($queryString);            // Get the result back from the query.
            $results = array();                                         // Setup array for returning back the query results.
            
            for ($row_no = 0; $row_no <= $queryResult->num_rows - 1; $row_no++)
            {
                $queryResult->data_seek($row_no);
                $row = $queryResult->fetch_assoc();
                array_push($results, $row);
            }
            
            // Return false when there are no results.
            return (!empty($results) ? $results : false);
        }
        
        /* Close the connection once we're done */
        private function __destructor()
        {
            $this->close();
        }
        
        
        /* 
            Connect to the database (if provided with a) hostname, username, password and database name.
        */
        private function connect()
        {
            assert(!empty($this->hostname) && !empty($this->username) && ($this->password != false || $this->password != NULL) && !empty($this->databaseName), "Cannot connect without proper credentials.");
            $this->connection = new mysqli($this->hostname, $this->username, $this->password, $this->databaseName);
            assert($this->connection->connect_errno == 0, "Failed to connect to MySQL: (" . $this->connection->connect_errno . ")" . $this->connection->connect_error);
        }
        
        /*
            Close the connection to the database.
        */
        private function close()
        {   
            $this->connection->close();
        }    
    }
?>