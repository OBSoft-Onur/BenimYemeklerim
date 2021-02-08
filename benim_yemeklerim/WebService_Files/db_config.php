<?php




$host = '160.153.131.201';
$user = 'obsofttech';
$pass = 'obsofttech3090';
$data = 'BenimYemeklerim';

try {
	$pdo = new PDO('mysql:host='.$host.';dbname='.$data.';charset=utf8', $user, $pass);
} catch (PDOException $e) {
	print "Error!: " . $e->getMessage();
}

 ?>
