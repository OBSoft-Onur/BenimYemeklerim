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

// $stmt = $pdo->prepare("SELECT FC.ID,FC.CATEGORY_NAME,FC.CATEGORY_IMAGE,R.ID AS RECIPE_ID, R.FOOD_NAME,
// R.LIKE_COUNT,R.PUBLISHED_DATE,R.FOOD_PHOTO,R.FOOD_RECIPE FROM FOOD_CATEGORY FC
//  INNER JOIN RECIPES R on FC.ID = R.FOOD_CATEGORY_ID");
// $stmt->execute();
// $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

// print json_encode($row);

/*DATABASE CONNECTION CHECKING END */


#2-SQL yazilacak JSON üretilecek

switch ($service_type) {



  case "get_current_version":

    $query = "SELECT TABLE_NAME, TABLE_VERSION FROM VERSION";
     $data = $pdo->prepare($query);
     $data->execute();



     $returnData;
       if ($data->rowcount() > 0) {
           foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $returnData[$row['TABLE_NAME']]['TABLE_NAME'] = $row['TABLE_NAME'];
            $returnData[$row['TABLE_NAME']]['TABLE_VERSION'] = $row['TABLE_VERSION'];

           }
       }

       print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
break;




case "version_check":

    $foodCategory_version   = $data["foodCategory_version"];
    $favorites_version      = $data["favorites_version"];
    $friends_version    = $data["friends_version"];
    $ing_of_recipes_version       = $data["ing_of_recipes_version"];
    $liked_recipes_version  = $data["liked_recipes_version"];
    $recipes_version = $data["recipes_version"];


    $response_foodCat  = false;
    $response_fav  = false;
    $response_friends  = false;
    $response_ing  = false;
    $response_liked  = false;
    $response_rec  = false;

    $sorgu = "SELECT * FROM VERSION";
    $stmt = $pdo->prepare($sorgu);
    $stmt->execute();
    $data->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
        $ver[] = $row;
    }

    if($ver[1]['TABLE_VERSION']==$foodCategory_version) {
        $response_foodCat  = true;
    }

    // if($ver[1]['TABLE_VERSION']==$favorites_version) {
    //     $response_fav  = true;
    // }

    // if($ver[2]['TABLE_VERSION']==$friends_version) {
    //     $response_friends  = true;
    // }

    // if($ver[3]['TABLE_VERSION']==$ing_of_recipes_version) {
    //     $response_ing  = true;
    // }

    // if($ver[4]['TABLE_VERSION']==$liked_recipes_version) {
    //     $response_liked  = true;
    // }

    // if($ver[5]['TABLE_VERSION']==$recipes_version) {
    //     $response_rec  = true;
    // }



    // $rows[]=["response_foodCat"=>$response_foodCat,"response_fav"=>$response_fav,"response_friends"=>$response_friends,"response_ing"=>$response_ing,"response_liked"=>$response_liked,"response_rec"=>$response_rec];
     $rows[]=["response_foodCat"=>$response_foodCat];

    print json_encode($rows, JSON_UNESCAPED_UNICODE);

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




