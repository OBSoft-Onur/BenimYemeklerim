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

  case 'getAllRecipesAndUsers':


		$stmt = $pdo->prepare("
    SELECT LOG.ID, LOG.USERNAME, LOG.POST_COUNT, LOG.FOLLOWING, LOG.FOLLOWERS, LOG.PHOTO, R.ID AS RECIPE_ID, R.FOOD_NAME,R.FOOD_PHOTO
           FROM LOGIN LOG
        LEFT OUTER JOIN RECIPES R ON LOG.ID = R.LOGIN_ID
    GROUP BY LOG.ID, LOG.USERNAME, LOG.POST_COUNT, LOG.FOLLOWING, LOG.FOLLOWERS, LOG.PHOTO, R.ID, R.FOOD_NAME, R.FOOD_PHOTO");
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($row);
  break;

  case 'follow':

    $localUserId = $data['localUserId'];
    $followingUserId = $data['followingUserId'];



      $row = $pdo->prepare("INSERT INTO FRIENDS VALUES(".$localUserId.",".$followingUserId.",1);");
      $row->execute();
      $bidik=$row->fetchAll(PDO::FETCH_ASSOC);

        print_r(json_encode($bidik, JSON_UNESCAPED_UNICODE));
  break;

  case 'unfollow':

    $localUserId = $data['localUserId'];
    $followingUserId = $data['followingUserId'];



      $row = $pdo->prepare("DELETE FROM FRIENDS WHERE FOLLOWER_LOGIN_ID = ".$localUserId."
                                  AND FOLLOWED_LOGIN_ID = ".$followingUserId.";");
      $row->execute();
      $bidik=$row->fetchAll(PDO::FETCH_ASSOC);

        print_r(json_encode($bidik, JSON_UNESCAPED_UNICODE));
  break;

  case 'getFollowers':

    $localUserId = $data['localUserId'];

    $query = "SELECT * FROM FRIENDS F
                        INNER JOIN LOGIN L ON L.ID = F.FOLLOWER_LOGIN_ID
                        HAVING F.FOLLOWED_LOGIN_ID = ".$localUserId."
                        ORDER BY L.ID DESC ";

      $row = $pdo->prepare($query);
      $row->execute();
      $bidik=$row->fetchAll(PDO::FETCH_ASSOC);

        print_r(json_encode($bidik, JSON_UNESCAPED_UNICODE));
    break;


    case 'getFollowing':

      $localUserId = $data['localUser_Id'];



        $bidik = $pdo->prepare("SELECT F.FOLLOWER_LOGIN_ID,F.FOLLOWED_LOGIN_ID,F.FRIENDSHIP_STATUS,L.ID AS LOGIN_ID,L.USERNAME,L.PHOTO
                                      FROM FRIENDS F  INNER JOIN LOGIN L ON L.ID = F.FOLLOWED_LOGIN_ID
                                      HAVING F.FOLLOWER_LOGIN_ID = ".$localUserId."
                                      ORDER BY L.ID DESC");
        $bidik->execute();

        $returnData;
        if ($bidik->rowcount() > 0) {
            foreach ($bidik->fetchAll(PDO::FETCH_ASSOC) as $row) {
                $returnData[$row['LOGIN_ID']]['LOGIN_ID'] = $row['LOGIN_ID'];
                $returnData[$row['LOGIN_ID']]['USERNAME'] = $row['USERNAME'];
                $returnData[$row['LOGIN_ID']]['USER_PHOTO'] = $row['PHOTO'];
                $returnData[$row['LOGIN_ID']]['FOLLOWER_ID'] = $row['FOLLOWER_LOGIN_ID'];
                $returnData[$row['LOGIN_ID']]['FOLLOWED_ID'] = $row['FOLLOWED_LOGIN_ID'];
                $returnData[$row['LOGIN_ID']]['FRIENDSHIP_STATUS'] = $row['FRIENDSHIP_STATUS'];

            }
        }

        print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
      break;

/* Denem Şablonu !!!!!!!!!!
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




