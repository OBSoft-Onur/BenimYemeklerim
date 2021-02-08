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


  case 'getMaxId':


    $stmt = $pdo->prepare("SELECT MAX(ID) AS MAX_ID FROM RECIPES");
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print json_encode($row);
  break;

  case 'showIngrediant':

    $ingrediant_name = $data['ingrediant_name'];
  //  $ingrdnt_unit = $data['ingrediant_unit'];
   // $ingrdnt_unit_quantity = $data['ingrediant_unit_qty'];

    $stmt = $pdo->prepare("SELECT * FROM INGREDIANT WHERE INGREDIANT_NAME ='".$ingrediant_name."'");
		$stmt->execute();
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		print_r(json_encode($row, JSON_UNESCAPED_UNICODE));
  break;

  case 'addRecipe':

    $kullanici_id = $data['kullaniciId'];
    $recipeName = $data['recipeName'];
    $portionQTY = $data['portionQTY'];
    $portionUnit = $data['portionUnit'];
    $preperationTime = $data['preperationTime'];
    $cookingTime = $data['cookingTime'];
    $recipeCategory = $data['recipeCategory'];
   $recipePhoto = $data['recipePhoto'];
    $recipeText = $data['recipeText'];

    $datenow = date('Y-m-d h:i:s');


    file_put_contents("recipe_images/".$kullanici_id."_user_". $datenow . ".jpeg",
                        base64_decode(preg_replace("#^data:image/\w+;base64,#i", "", $recipePhoto)));

    $stmt = $pdo->prepare("INSERT INTO RECIPES VALUES(NULL,(SELECT ID FROM FOOD_CATEGORY WHERE CATEGORY_NAME ='".$recipeCategory."'),
                        ".$kullanici_id.",'".$recipeName."','".$portionUnit."',".$portionQTY.",
                        '".$preperationTime." dk','".$cookingTime." dk','".$recipeText."',
                        'http://benimyemeklerim.obsofttech.com/Web_Services/recipe_images/".$kullanici_id."_user_". $datenow . ".jpeg',
                        '".$datenow."',0);
                        SELECT MAX(ID) AS MAX_ID FROM RECIPES;

                        ");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

    print_r ($row);
  break;


  case 'addIngrediantToDB':

    $recipeId = $data['recipeId'];


    foreach ($data["ing_array"] as $index=> $ingrediant) {

      echo($ingrediant['id']);
      echo($ingrediant['ing_name']);
      echo($ingrediant['ing_unit']);
      echo($ingrediant['ing_unit_qty']);
      echo($ingrediant['ing_image']);

      $ing_id = $ingrediant['id'];
      $ing_name = $ingrediant['ing_name'];
      $malzeme_unit = $ingrediant['ing_unit'];
      $malzeme_unit_sayisi = $ingrediant['ing_unit_qty'];

      $stmt = $pdo->prepare("INSERT INTO INGREDIANTS_OF_RECIPES VALUES (".$recipeId.", ".$ing_id.",
                                '".$ing_name."',
                                '".$malzeme_unit."',".$malzeme_unit_sayisi.",'".$ingrediant['ing_image']."')");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    print_r(json_encode($row, JSON_UNESCAPED_UNICODE));
  break;

  case 'getIngrediants':


    $stmt = $pdo->prepare("SELECT * FROM INGREDIANT ");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

    print json_encode($row);
  break;




  case 'addToFavorites':

    $rec_id = $data['rec_Id'];
    $rec_name = $data['rec_Name'];
    $user_id = $data['user_id'];

    $stmt = $pdo->prepare("INSERT INTO FAVORITES VALUES(".$user_id.",".$rec_id.",'".$rec_name."');");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

    print json_encode($row);
  break;

  case 'removeFromFavorites':

    $log_id = $data['log_id'];
    $rec_id = $data['rec_id'];

    $stmt = $pdo->prepare("DELETE FROM FAVORITES WHERE LOGIN_ID = '".$log_id."' AND RECIPES_ID = ".$rec_id."");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

    print json_encode($row);
    break;



    case 'removeFromTariflerim':

      $log_id = $data['log_id'];
      $rec_id = $data['rec_id'];

      $stmt = $pdo->prepare("DELETE FROM RECIPES WHERE LOGIN_ID = '".$log_id."' AND ID = ".$rec_id.";
                              DELETE FROM INGREDIANTS_OF_RECIPES WHERE RECIPES_ID =".$rec_id);
      $stmt->execute();
      $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

      print json_encode($row);
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




