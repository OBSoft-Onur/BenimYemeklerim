<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: X-gelen_dataed-With');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

#1-DB baglantisi kurulacak
/* -------- DATABASE CONNECTION START --------*/


require("db_config.php");

/* -------- DATABASE CONNECTION END --------*/



$data = json_decode(file_get_contents('php://input'), true);
$service_type = $data["service_type"];


/*DATABASE CONNECTION CHECKING */



/*DATABASE CONNECTION CHECKING END */


#2-SQL yazilacak JSON üretilecek

switch ($service_type) {

	case 'doLogin':
		# code...
			$user_email = $data["user_email"];
			$user_password = $data["user_password"];

			$stmt = $pdo->prepare("SELECT *	FROM LOGIN
									WHERE USER_EMAIL='".
									$user_email."' AND USER_PASSWORD='"
									.$user_password."'
									");
			$stmt->execute();
			$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

			print json_encode($row);
		break;

		case 'doSignUp':
				# code...

		$usernameSign = $data["user_username"];
		$emailSign = $data["user_email"];
		$passwordSign = $data["user_password"];
		$user_phone = $data["user_phone"];

		$stmt = $pdo->prepare("INSERT INTO LOGIN
								VALUES (NULL,
								'".$usernameSign."','".$emailSign."',
								'".$passwordSign."',
								'".$user_phone."',NULL,NULL,NULL,NULL)");
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($row);

	break;



	case 'updateProfile':

		$updateId = $data["user_Id"];
		$updateUsername = $data["user_USERNAME"];
		$updateEmail = $data["user_EMAIL"];
    $updatePhone = $data["user_PHONE"];
    $updatePassword = $data['user_password'];
    $updatePhoto = $data['user_photo'];

    $datenow = date('Y-m-d h:i:s');


    file_put_contents("recipe_images/".$kullanici_id."_user_". $datenow . ".jpeg",
                        base64_decode(preg_replace("#^data:image/\w+;base64,#i", "", $updatePhoto)));

		$stmt = $pdo->prepare("UPDATE LOGIN SET USERNAME ='".$updateUsername."',
                                            USER_EMAIL = '".$updateEmail."',
                                            USER_PASSWORD = '".$updatePassword."',
                                            PHONE = '".$updatePhone."',
                  PHOTO = 'http://benimyemeklerim.obsofttech.com/Web_Services/recipe_images/".$updateId."_user_". $datenow . ".jpeg'
                                        WHERE ID=".$updateId);
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($row);
  break;


	case 'getAllUsers':

		$stmt = $pdo->prepare("SELECT L.ID AS LOGIN_ID,L.USERNAME,L.USER_EMAIL,L.USER_PASSWORD,L.PHONE,L.FOLLOWERS AS USER_FOLLOWERS,
                                L.FOLLOWING AS USER_FOLLOWING,L.POST_COUNT,L.PHOTO AS USER_PHOTO FROM LOGIN L");
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($row);
  break;

	case 'updatePostCount':

    $kul_id = $data['user_id'];

		$stmt = $pdo->prepare("UPDATE LOGIN SET POST_COUNT = (POST_COUNT+1) WHERE ID = ".$kul_id);
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($row);
  break;



  case 'updatePostCountDecrease':

    $kul_id = $data['user_id'];

		$stmt = $pdo->prepare("UPDATE LOGIN SET POST_COUNT = (POST_COUNT-1) WHERE ID = ".$kul_id);
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($row);
  break;


  case 'getCurrentPostCount':

    $kul_id = $data['user_id'];

		$stmt = $pdo->prepare("SELECT POST_COUNT FROM LOGIN WHERE ID = ".$kul_id);
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($row);
  break;

/* Deneme Şablonu !!!!!!!!!!
	case 'create_user':
		# code...
	$kullanici_id = $data["user_id"];

	$stmt = $pdo->prepare("INSERT INTO u883150773_test.USER VALUES (NULL,'".$isim.
		"','SOYADİ')");
	$stmt->execute();
	$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

	print json_encode($row);

		break;

		*/
//passwordSignRepeat:passRepeat




	default:
		# code...
	break;
}












/*

- user login
- user save
- sifremi unuttum
- anasayfa json feed
- detay sayfası ??
- icerik paylasma
- icerik silme servisi


*/


?>




