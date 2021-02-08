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
// $queryOfRecipeCount = "SELECT COUNT(*) AS RECIPE_COUNT FROM FAVORITES WHERE LOGIN_ID = 2";
// $recCountData = $pdo->prepare($queryOfRecipeCount);
// $recCountData->execute();
// $tempArray;
// foreach($recCountData->fetchAll(PDO::FETCH_ASSOC) as $row){
//     $tempArray['COUNT'] = $row['RECIPE_COUNT'];
// }

// $tempCount = number_format($tempArray['COUNT'])-1;
// echo $tempCount;


/*DATABASE CONNECTION CHECKING END */


#2-SQL yazilacak JSON üretilecek

switch ($service_type) {



  case 'getCategories':

    $query = "
    SELECT FC.ID,FC.CATEGORY_NAME,FC.CATEGORY_IMAGE,R.ID AS RECIPE_ID, R.FOOD_NAME,
       R.LIKE_COUNT,R.PUBLISHED_DATE,R.FOOD_PHOTO,R.FOOD_RECIPE,R.FOOD_COOKING_TIME,R.FOOD_PREPERATION_TIME,
       R.PORTION_QTY,R.PORTION_UNIT FROM FOOD_CATEGORY FC
    INNER JOIN RECIPES R on FC.ID = R.FOOD_CATEGORY_ID";

    $data = $pdo->prepare($query);
    $data->execute();

    $returnData;
      if ($data->rowcount() > 0) {
          foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
              $returnData[$row['CATEGORY_NAME']]['ID'] = $row['ID'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_NAME'] = $row['CATEGORY_NAME'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_IMAGE'] = $row['CATEGORY_IMAGE'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['RECIPE_ID'] = $row['RECIPE_ID'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['FOOD_NAME'] = $row['FOOD_NAME'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['LIKE_COUNT'] = $row['LIKE_COUNT'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['PUBLISHED_DATE'] = $row['PUBLISHED_DATE'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['FOOD_PHOTO'] = $row['FOOD_PHOTO'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['FOOD_RECIPE'] = $row['FOOD_RECIPE'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['FOOD_COOKING_TIME'] = $row['FOOD_COOKING_TIME'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['FOOD_PREPERATION_TIME'] = $row['FOOD_PREPERATION_TIME'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['PORTION_UNIT'] = $row['PORTION_UNIT'];
              $returnData[$row['CATEGORY_NAME']]['CATEGORY_FOODS'][$row['RECIPE_ID']]['PORTION_QTY'] = $row['PORTION_QTY'];

          }
      }

      print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
  break;

  case 'getRecipes':

    $user_id = $data['user_id'];

	$stmt = $pdo->prepare("SELECT * FROM RECIPES WHERE LOGIN_ID = ".$user_id);
	$stmt->execute();
	$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

	print json_encode($row);
break;


case 'getAllUsersAndRecipes':
    $query = "SELECT LOG.ID AS LOGIN_ID,LOG.USERNAME,LOG.PHOTO AS USER_PHOTO,R.ID AS RECIPE_ID,R.FOOD_NAME,R.LIKE_COUNT,R.PORTION_UNIT,
    R.PORTION_QTY, R.FOOD_PREPERATION_TIME, R.FOOD_COOKING_TIME,R.FOOD_RECIPE,R.FOOD_PHOTO,R.PUBLISHED_DATE FROM LOGIN LOG
                                                                                  INNER JOIN RECIPES R on LOG.ID = R.LOGIN_ID
                                                                                  ORDER BY R.PUBLISHED_DATE ASC";
     $data = $pdo->prepare($query);
     $data->execute();


     $queryIng = "SELECT IOR.RECIPES_ID,IOR.INGREDIANT_ID,IOR.INGREDIANT_NAME,IOR.INGREDIANT_UNIT,IOR.INGREDIANT_UNIT_QTY,
     IOR.INGREDIANT_IMAGE FROM INGREDIANTS_OF_RECIPES IOR WHERE RECIPES_ID = ";

     $queryOfRecipeCount = "SELECT COUNT(*) AS RECIPE_COUNT FROM RECIPES WHERE LOGIN_ID = ";



    $recCountLoopCtrl = 0;
     $loopCtrl = 0;
     $returnData;
       if ($data->rowcount() > 0) {
           foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $returnData[$row['LOGIN_ID']]['LOGIN_ID'] = $row['LOGIN_ID'];
            $returnData[$row['LOGIN_ID']]['USERNAME'] = $row['USERNAME'];
            $returnData[$row['LOGIN_ID']]['USER_PHOTO'] = $row['USER_PHOTO'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['RECIPE_ID'] = $row['RECIPE_ID'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['FOOD_NAME'] = $row['FOOD_NAME'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['LIKE_COUNT'] = $row['LIKE_COUNT'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['PUBLISHED_DATE'] = $row['PUBLISHED_DATE'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['FOOD_PHOTO'] = $row['FOOD_PHOTO'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['FOOD_RECIPE'] = $row['FOOD_RECIPE'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['FOOD_COOKING_TIME'] = $row['FOOD_COOKING_TIME'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['FOOD_PREPERATION_TIME'] = $row['FOOD_PREPERATION_TIME'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['PORTION_UNIT'] = $row['PORTION_UNIT'];
            $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['PORTION_QTY'] = $row['PORTION_QTY'];

            $recCountData = $pdo->prepare($queryOfRecipeCount.$row['LOGIN_ID']);
            $recCountData->execute();
            $tempArray;
            if($recCountLoopCtrl == 0){
              foreach($recCountData->fetchAll(PDO::FETCH_ASSOC) as $row){
                $tempArray['COUNT'] = $row['RECIPE_COUNT'];
            }

            $tempCount = number_format($tempArray['COUNT']);
            }


            $ingrediantData = $pdo->prepare($queryIng.$row['RECIPE_ID']);
            $ingrediantData->execute();
            if($loopCtrl < $tempCount){
              foreach($ingrediantData->fetchAll(PDO::FETCH_ASSOC) as $rowIng){
                $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_ID'] = $rowIng['INGREDIANT_ID'];
                $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_NAME'] = $rowIng['INGREDIANT_NAME'];
                $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT'] = $rowIng['INGREDIANT_UNIT'];
                $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT_QTY'] = $rowIng['INGREDIANT_UNIT_QTY'];
                $returnData[$row['LOGIN_ID']]['USER_FOODS'][$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_IMAGE'] = $rowIng['INGREDIANT_IMAGE'];
              }
            }

            $loopCtrl ++;

           }
       }

       print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
break;

case 'getMostLikedRecipes':


  $query = "SELECT * FROM RECIPES ORDER BY LIKE_COUNT DESC LIMIT 20";

  $data = $pdo->prepare($query);
    $data->execute();

    $queryIng = "SELECT IOR.RECIPES_ID,IOR.INGREDIANT_ID,IOR.INGREDIANT_NAME,IOR.INGREDIANT_UNIT,IOR.INGREDIANT_UNIT_QTY,
    IOR.INGREDIANT_IMAGE FROM INGREDIANTS_OF_RECIPES IOR WHERE RECIPES_ID = ";

    //KAÇ TANE YEMEK OLDUĞUNUN SORGUSU ÇAĞRILIYOR
    $queryOfRecipeCount = "SELECT COUNT(*) AS RECIPE_COUNT FROM RECIPES ORDER BY LIKE_COUNT DESC LIMIT 20";

    $recCountData = $pdo->prepare($queryOfRecipeCount);
    $recCountData->execute();
    $tempArray;
    foreach($recCountData->fetchAll(PDO::FETCH_ASSOC) as $row){
        $tempArray['COUNT'] = $row['RECIPE_COUNT'];
    }

    $tempCount = number_format($tempArray['COUNT']);


    $loopCtrl = 0;
    $returnData;
      if ($data->rowcount() > 0) {
          foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
              $returnData[$row['ID']]['ID'] = $row['ID'];
              $returnData[$row['ID']]['FOOD_NAME'] = $row['FOOD_NAME'];
              $returnData[$row['ID']]['PORTION_UNIT'] = $row['PORTION_UNIT'];
              $returnData[$row['ID']]['PORTION_QTY'] = $row['PORTION_QTY'];
              $returnData[$row['ID']]['LIKE_COUNT'] = $row['LIKE_COUNT'];
              $returnData[$row['ID']]['PUBLISHED_DATE'] = $row['PUBLISHED_DATE'];
              $returnData[$row['ID']]['FOOD_PHOTO'] = $row['FOOD_PHOTO'];
              $returnData[$row['ID']]['FOOD_RECIPE'] = $row['FOOD_RECIPE'];
              $returnData[$row['ID']]['FOOD_COOKING_TIME'] = $row['FOOD_COOKING_TIME'];
              $returnData[$row['ID']]['FOOD_PREPERATION_TIME'] = $row['FOOD_PREPERATION_TIME'];

              $ingrediantData = $pdo->prepare($queryIng.$row['ID']);
              $ingrediantData->execute();
              if($loopCtrl < $tempCount){
                foreach($ingrediantData->fetchAll(PDO::FETCH_ASSOC) as $rowIng){
                  $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_ID'] = $rowIng['INGREDIANT_ID'];
                  $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_NAME'] = $rowIng['INGREDIANT_NAME'];
                  $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT'] = $rowIng['INGREDIANT_UNIT'];
                  $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT_QTY'] = $rowIng['INGREDIANT_UNIT_QTY'];
                  $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_IMAGE'] = $rowIng['INGREDIANT_IMAGE'];
                }
              }

              $loopCtrl ++;

          }
      }

      print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
break;

case 'getRecipesOfTimeline':


  $query = "SELECT L.ID AS LOGIN_ID, L.USERNAME, L.PHOTO, L.FOLLOWERS, L.POST_COUNT, L.FOLLOWING,
                        REC.ID AS RECIPE_ID, REC.FOOD_NAME, REC.PORTION_UNIT,
                        REC.PORTION_QTY, REC.FOOD_PREPERATION_TIME, REC.FOOD_COOKING_TIME,
                        REC.FOOD_RECIPE, REC.FOOD_PHOTO, REC.PUBLISHED_DATE, REC.LIKE_COUNT
                              FROM RECIPES REC INNER JOIN LOGIN L on REC.LOGIN_ID = L.ID
                              ORDER BY PUBLISHED_DATE DESC";

  $data = $pdo->prepare($query);
    $data->execute();

    $queryIng = "SELECT IOR.RECIPES_ID,IOR.INGREDIANT_ID,IOR.INGREDIANT_NAME,IOR.INGREDIANT_UNIT,IOR.INGREDIANT_UNIT_QTY,
    IOR.INGREDIANT_IMAGE FROM INGREDIANTS_OF_RECIPES IOR WHERE RECIPES_ID = ";

    //KAÇ TANE YEMEK OLDUĞUNUN SORGUSU ÇAĞRILIYOR
    $queryOfRecipeCount = "SELECT COUNT(*) AS RECIPE_COUNT FROM RECIPES ";

    $recCountData = $pdo->prepare($queryOfRecipeCount);
    $recCountData->execute();
    $tempArray;
    foreach($recCountData->fetchAll(PDO::FETCH_ASSOC) as $row){
        $tempArray['COUNT'] = $row['RECIPE_COUNT'];
    }

    $tempCount = number_format($tempArray['COUNT']);


    $loopCtrl = 0;
    $returnData;
      if ($data->rowcount() > 0) {
          foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
              $returnData[$row['RECIPE_ID']]['RECIPE_ID'] = $row['RECIPE_ID'];
              $returnData[$row['RECIPE_ID']]['FOOD_NAME'] = $row['FOOD_NAME'];
              $returnData[$row['RECIPE_ID']]['PORTION_UNIT'] = $row['PORTION_UNIT'];
              $returnData[$row['RECIPE_ID']]['PORTION_QTY'] = $row['PORTION_QTY'];
              $returnData[$row['RECIPE_ID']]['LIKE_COUNT'] = $row['LIKE_COUNT'];
              $returnData[$row['RECIPE_ID']]['PUBLISHED_DATE'] = $row['PUBLISHED_DATE'];
              $returnData[$row['RECIPE_ID']]['FOOD_PHOTO'] = $row['FOOD_PHOTO'];
              $returnData[$row['RECIPE_ID']]['FOOD_RECIPE'] = $row['FOOD_RECIPE'];
              $returnData[$row['RECIPE_ID']]['FOOD_COOKING_TIME'] = $row['FOOD_COOKING_TIME'];
              $returnData[$row['RECIPE_ID']]['FOOD_PREPERATION_TIME'] = $row['FOOD_PREPERATION_TIME'];
              $returnData[$row['RECIPE_ID']]['LOGIN_ID'] = $row['LOGIN_ID'];
              $returnData[$row['RECIPE_ID']]['USERNAME'] = $row['USERNAME'];
              $returnData[$row['RECIPE_ID']]['POST_COUNT'] = $row['POST_COUNT'];
              $returnData[$row['RECIPE_ID']]['USER_FOLLOWING'] = $row['FOLLOWING'];
              $returnData[$row['RECIPE_ID']]['USER_FOLLOWERS'] = $row['FOLLOWERS'];
              $returnData[$row['RECIPE_ID']]['USER_PHOTO'] = $row['PHOTO'];

              $ingrediantData = $pdo->prepare($queryIng.$row['RECIPE_ID']);
              $ingrediantData->execute();
              if($loopCtrl < $tempCount){
                foreach($ingrediantData->fetchAll(PDO::FETCH_ASSOC) as $rowIng){
                  $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_ID'] = $rowIng['INGREDIANT_ID'];
                  $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_NAME'] = $rowIng['INGREDIANT_NAME'];
                  $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT'] = $rowIng['INGREDIANT_UNIT'];
                  $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT_QTY'] = $rowIng['INGREDIANT_UNIT_QTY'];
                  $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_IMAGE'] = $rowIng['INGREDIANT_IMAGE'];
                }
              }

              $loopCtrl ++;

          }
      }

      print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
break;

case 'getFavoriteRecipes':

$kul_id = $data['user_id'];
$query = "SELECT F.LOGIN_ID, REC.ID AS RECIPES_ID,REC.FOOD_NAME,REC.FOOD_PHOTO,REC.PUBLISHED_DATE,L.USERNAME,L.PHOTO
                                    FROM FAVORITES F
                                    INNER JOIN RECIPES REC ON REC.ID = F.RECIPES_ID
                                    INNER JOIN LOGIN L ON L.ID = REC.LOGIN_ID
                                    HAVING F.LOGIN_ID=";

      $data = $pdo->prepare($query.$kul_id);
      $data->execute();



      $returnData;
        if ($data->rowcount() > 0) {
            foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
                $returnData[$row['RECIPES_ID']]['RECIPES_ID'] = $row['RECIPES_ID'];
                $returnData[$row['RECIPES_ID']]['FAV_RECIPE_NAME'] = $row['FOOD_NAME'];
                $returnData[$row['RECIPES_ID']]['FOOD_PHOTO'] = $row['FOOD_PHOTO'];
                $returnData[$row['RECIPES_ID']]['LOGIN_ID'] = $row['LOGIN_ID'];
                $returnData[$row['RECIPES_ID']]['USERNAME'] = $row['USERNAME'];
                $returnData[$row['RECIPES_ID']]['PHOTO'] = $row['PHOTO'];

            }
        }

        print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
break;

case 'likeRecipe':


  $rec_id = $data['recipe_id'];

    $stmt = $pdo->prepare("UPDATE RECIPES SET LIKE_COUNT = (LIKE_COUNT+1)
                           WHERE ID = ".$rec_id);
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

  print json_encode($row);
  break;

  case 'removeFromLikeRecipe':


    $rec_id = $data['recipe_id'];

      $stmt = $pdo->prepare("UPDATE RECIPES SET LIKE_COUNT = (LIKE_COUNT-1)
                            WHERE ID = ".$rec_id);
      $stmt->execute();
      $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

    print json_encode($row);
    break;


    case 'getTraditionalRecipes':

      $query = "SELECT * FROM RECIPES WHERE FOOD_CATEGORY_ID = 14 LIMIT 20" ;

        $data = $pdo->prepare($query);
        $data->execute();


        $queryIng = "SELECT IOR.RECIPES_ID,IOR.INGREDIANT_ID,IOR.INGREDIANT_NAME,IOR.INGREDIANT_UNIT,IOR.INGREDIANT_UNIT_QTY,
        IOR.INGREDIANT_IMAGE FROM INGREDIANTS_OF_RECIPES IOR WHERE RECIPES_ID = ";

        $queryOfRecipeCount = "SELECT COUNT(*) AS RECIPE_COUNT FROM RECIPES WHERE FOOD_CATEGORY_ID = 14 LIMIT 20";

        $recCountData = $pdo->prepare($queryOfRecipeCount);
        $recCountData->execute();
        $tempArray;
        foreach($recCountData->fetchAll(PDO::FETCH_ASSOC) as $row){
            $tempArray['COUNT'] = $row['RECIPE_COUNT'];
        }

        $tempCount = number_format($tempArray['COUNT']);


        $loopCtrl = 0;
        $returnData;
          if ($data->rowcount() > 0) {
              foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
                  $returnData[$row['ID']]['ID'] = $row['ID'];
                  $returnData[$row['ID']]['FOOD_NAME'] = $row['FOOD_NAME'];
                  $returnData[$row['ID']]['PORTION_UNIT'] = $row['PORTION_UNIT'];
                  $returnData[$row['ID']]['PORTION_QTY'] = $row['PORTION_QTY'];
                  $returnData[$row['ID']]['LIKE_COUNT'] = $row['LIKE_COUNT'];
                  $returnData[$row['ID']]['PUBLISHED_DATE'] = $row['PUBLISHED_DATE'];
                  $returnData[$row['ID']]['FOOD_PHOTO'] = $row['FOOD_PHOTO'];
                  $returnData[$row['ID']]['FOOD_RECIPE'] = $row['FOOD_RECIPE'];
                  $returnData[$row['ID']]['FOOD_COOKING_TIME'] = $row['FOOD_COOKING_TIME'];
                  $returnData[$row['ID']]['FOOD_PREPERATION_TIME'] = $row['FOOD_PREPERATION_TIME'];

                  $ingrediantData = $pdo->prepare($queryIng.$row['ID']);
                  $ingrediantData->execute();
                  if($loopCtrl < $tempCount){
                    foreach($ingrediantData->fetchAll(PDO::FETCH_ASSOC) as $rowIng){
                      $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_ID'] = $rowIng['INGREDIANT_ID'];
                      $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_NAME'] = $rowIng['INGREDIANT_NAME'];
                      $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT'] = $rowIng['INGREDIANT_UNIT'];
                      $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT_QTY'] = $rowIng['INGREDIANT_UNIT_QTY'];
                      $returnData[$row['ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_IMAGE'] = $rowIng['INGREDIANT_IMAGE'];
                    }
                  }

                  $loopCtrl ++;

              }
          }

          print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
      break;

      case 'getAllTradRecipes':

        $query = "SELECT REC.ID AS RECIPE_ID,REC.FOOD_CATEGORY_ID,REC.FOOD_NAME,REC.PUBLISHED_DATE,REC.FOOD_PHOTO,L.ID AS LOGIN_ID,
        L.USERNAME, L.PHOTO  FROM RECIPES REC
        INNER  JOIN LOGIN L on REC.LOGIN_ID = L.ID
        HAVING REC.FOOD_CATEGORY_ID = 14
ORDER BY REC.PUBLISHED_DATE DESC";

        $queryIng = "SELECT IOR.RECIPES_ID,IOR.INGREDIANT_ID,IOR.INGREDIANT_NAME,IOR.INGREDIANT_UNIT,IOR.INGREDIANT_UNIT_QTY,
        IOR.INGREDIANT_IMAGE FROM INGREDIANTS_OF_RECIPES IOR WHERE RECIPES_ID = ";
//YEMEKLERİN SORGUSU ÇAĞRILIYOR
          $data = $pdo->prepare($query);
          $data->execute();
//KAÇ TANE YEMEK OLDUĞUNUN SORGUSU ÇAĞRILIYOR
          $queryOfRecipeCount = "SELECT COUNT(*) AS RECIPE_COUNT FROM RECIPES WHERE FOOD_CATEGORY_ID = 14";
          $recCountData = $pdo->prepare($queryOfRecipeCount);
          $recCountData->execute();
          $tempArray;
          foreach($recCountData->fetchAll(PDO::FETCH_ASSOC) as $row){
              $tempArray['COUNT'] = $row['RECIPE_COUNT'];
          }

          $tempCount = number_format($tempArray['COUNT']);



          $returnData;
          $loopCtrl = 0;
            if ($data->rowcount() > 0) {
                foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
                    $returnData[$row['RECIPE_ID']]['RECIPE_ID'] = $row['RECIPE_ID'];
                    $returnData[$row['RECIPE_ID']]['FOOD_NAME'] = $row['FOOD_NAME'];
                    $returnData[$row['RECIPE_ID']]['CATEGORY_ID'] = $row['FOOD_CATEGORY_ID'];
                    $returnData[$row['RECIPE_ID']]['PUBLISHED_DATE'] = $row['PUBLISHED_DATE'];
                    $returnData[$row['RECIPE_ID']]['FOOD_PHOTO'] = $row['FOOD_PHOTO'];
                    $returnData[$row['RECIPE_ID']]['LOGIN_ID'] = $row['LOGIN_ID'];
                    $returnData[$row['RECIPE_ID']]['USERNAME'] = $row['USERNAME'];
                    $returnData[$row['RECIPE_ID']]['USER_PHOTO'] = $row['PHOTO'];

                    $ingrediantData = $pdo->prepare($queryIng.$row['RECIPE_ID']);
                    $ingrediantData->execute();
                    if($loopCtrl < $tempCount){
                      foreach($ingrediantData->fetchAll(PDO::FETCH_ASSOC) as $rowIng){
                        $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_ID'] = $rowIng['INGREDIANT_ID'];
                        $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_NAME'] = $rowIng['INGREDIANT_NAME'];
                        $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT'] = $rowIng['INGREDIANT_UNIT'];
                        $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_UNIT_QTY'] = $rowIng['INGREDIANT_UNIT_QTY'];
                        $returnData[$row['RECIPE_ID']]['INGREDIANTS'][$rowIng['INGREDIANT_ID']]['INGREDIANT_IMAGE'] = $rowIng['INGREDIANT_IMAGE'];
                      }
                    }

                    $loopCtrl ++;

                }
            }

            print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
        break;


        case 'getAllLikedRecipes':

          $query = "SELECT REC.ID AS RECIPE_ID,REC.FOOD_CATEGORY_ID,REC.FOOD_NAME,REC.PUBLISHED_DATE,REC.FOOD_PHOTO,
          L.ID AS LOGIN_ID,L.USERNAME, L.PHOTO  FROM RECIPES REC
             INNER  JOIN LOGIN L on REC.LOGIN_ID = L.ID
             ORDER BY REC.LIKE_COUNT DESC";

            $data = $pdo->prepare($query);
            $data->execute();

            $returnData;
              if ($data->rowcount() > 0) {
                  foreach ($data->fetchAll(PDO::FETCH_ASSOC) as $row) {
                      $returnData[$row['RECIPE_ID']]['RECIPE_ID'] = $row['RECIPE_ID'];
                      $returnData[$row['RECIPE_ID']]['FOOD_NAME'] = $row['FOOD_NAME'];
                      $returnData[$row['RECIPE_ID']]['CATEGORY_ID'] = $row['FOOD_CATEGORY_ID'];
                      $returnData[$row['RECIPE_ID']]['PUBLISHED_DATE'] = $row['PUBLISHED_DATE'];
                      $returnData[$row['RECIPE_ID']]['FOOD_PHOTO'] = $row['FOOD_PHOTO'];
                      $returnData[$row['RECIPE_ID']]['LOGIN_ID'] = $row['LOGIN_ID'];
                      $returnData[$row['RECIPE_ID']]['USERNAME'] = $row['USERNAME'];
                      $returnData[$row['RECIPE_ID']]['USER_PHOTO'] = $row['PHOTO'];
                  }
              }

              print_r(json_encode($returnData, JSON_UNESCAPED_UNICODE));
          break;


          case 'getAllRecipesForSearch':

            $query = "SELECT REC.ID AS RECIPE_ID,REC.FOOD_CATEGORY_ID,REC.FOOD_NAME,REC.PUBLISHED_DATE,REC.FOOD_PHOTO,
                              L.ID AS LOGIN_ID,L.USERNAME, L.PHOTO  FROM RECIPES REC
                              INNER  JOIN LOGIN L on REC.LOGIN_ID = L.ID";

              $data = $pdo->prepare($query);
              $data->execute();
              $row = $data->fetchAll(PDO::FETCH_ASSOC);

                print_r(json_encode($row, JSON_UNESCAPED_UNICODE));
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




