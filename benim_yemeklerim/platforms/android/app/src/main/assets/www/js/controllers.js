angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, $state, $cordovaCamera, $ionicActionSheet) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $rootScope.loginServiceURL= "http://benimyemeklerim.obsofttech.com/Web_Services/login_service.php?";

  $rootScope.addFoodServiceURL = "http://benimyemeklerim.obsofttech.com/Web_Services/addFoodService.php?";
  $rootScope.food_categoryServiceURL = "http://benimyemeklerim.obsofttech.com/Web_Services/food_categoryService.php?";
  $rootScope.user_followingServiceURL = "http://benimyemeklerim.obsofttech.com/Web_Services/user_followingService.php?";
  $rootScope.versionCheckServiceURL = "http://benimyemeklerim.obsofttech.com/Web_Services/versionChecks.php?";
  $rootScope.user_followingServiceURL = "http://benimyemeklerim.obsofttech.com/Web_Services/user_followingService.php?";
//tüm db tablolarının versiyonlarının çekildiği kod blok başlangıcı


$scope.picFromCamera = function () {

  var options = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    encodingType: Camera.EncodingType.JPEG
  };

  // udpate camera image directive
  $cordovaCamera.getPicture(options).then(function (imageData) {

    console.log("camera data:" + angular.toJson(imageData));
    $scope.foodPicUrl = "data:image/jpeg;base64," + imageData;

  }, function (err) {
    console.log("camera data:" + angular.toJson(imageData));
    console.log('Failed because: ');
    console.log(err);
  });
  // FOTOĞRAF DATABASE E KAYDOLUP GERİ GELİYOR MU TEST KODU



};


$scope.picFromGallery = function () {

  var options = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: Camera.EncodingType.JPEG,
    saveToPhotoAlbum: false
  };

  // udpate camera image directive
  $cordovaCamera.getPicture(options).then(function (imageData) {

    console.log("camera data:" + angular.toJson(imageData));
    $scope.foodPicUrl = "data:image/jpeg;base64," + imageData;
  // $scope.tempPhotoData = imageData;



  }, function (err) {
    console.log("camera data:" + angular.toJson(imageData));
    console.log('Failed because: ');
    console.log(err);
  });
  // FOTOĞRAF DATABASE E KAYDOLUP GERİ GELİYOR MU TEST KODU

};


// EDIT PHOTO BAŞLANGICI

$scope.editProfilePhoto = function () {

$ionicActionSheet.show({
titleText: 'Fotoğraf Değiştirme',
buttons: [
  {text: '<i class="icon ion-camera"></i> Kamera'},
  {text: '<i class="icon ion-images"></i> Galeri'},
],
//   destructiveText: 'Sil',
cancelText: 'İptal',
cancel: function () {
  console.log('CANCELLED');
},
buttonClicked: function (index) {
  console.log('BUTTON CLICKED', index);
  if (index == 0) {
    $scope.picFromCamera();
    return true;
  } else {
    $scope.picFromGallery();
    return true;
  }
}
//   destructiveButtonClicked: function() {
//     console.log('DESTRUCT');
//     return true;
//   }
});
};




  // Form data for the login modal!!!!!!!!!!
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

$scope.login = function() {
    $scope.modal.show();
  };

/*

  // Open the login modal
  if (!$scope.user_Id) {

      $timeout(function() {
         $scope.login();

       }, 50);
  }
*/

$scope.goProfile = function(){

  if(!$scope.user_Id){
    swal({
      title: "Uyarı!",
      text: "Profil sayfasına gidebilmek için kullanıcı girişi yapmalısınız!",
      icon: "error",
   });
    $timeout(function(){
        $scope.login();
    }, 50);

  }else{
    $state.go('app.profile');

  }
};



$scope.goSearch = function() {
  $state.go('app.searchUsersOrRecipes', {"searchRecipeJson":$scope.allRecipesForSearchJson, "searchUserJson" : $scope.allUsersArray});
};




    $scope.profile_data_IsVisible = false;
    $scope.loginButton_IsVisible = true;
    $scope.logoutButton_IsVisible = false;
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

  var ServiceRequest = {
        service_type: "doLogin",
        user_email: $scope.loginData.Email,
        user_password: $scope.loginData.Password
      }
      $http.post($scope.loginServiceURL, ServiceRequest)
        .success(function(data) {
         $scope.user_data = data[0];

           if ($scope.user_data == null) {
            console.log("Data Gelmedi(NULL) döndü!!!");
            swal({
              title: "Hatalı Giriş!",
              text: "Lütfen Bilgilerinizi Eksiksik Giriniz!",
              icon: "error",
            });
           }else if($scope.loginData.Email != $scope.user_data.USER_EMAIL &&
                    $scope.loginData.Password != $scope.user_data.USER_PASSWORD){
            console.log("Böyle bir kullanıcı bulunmamaktadır. Bilgilerinizi kontrol edip"+
              " tekrar deneyiniz");
           }else{
            localStorage.setItem('user_id', $scope.user_data.ID);
            localStorage.setItem('user_username', $scope.user_data.USERNAME);
            localStorage.setItem('user_email', $scope.user_data.USER_EMAIL);
            localStorage.setItem('user_password', $scope.user_data.USER_PASSWORD);
            localStorage.setItem('user_phone', $scope.user_data.PHONE);
            localStorage.setItem('user_postCount', $scope.user_data.POST_COUNT);
            localStorage.setItem('user_followers', $scope.user_data.FOLLOWERS);
            localStorage.setItem('user_following', $scope.user_data.FOLLOWING);
            localStorage.setItem('user_photo', $scope.user_data.PHOTO);

            $scope.user_Id = localStorage.getItem('user_id');
            $scope.username = localStorage.getItem('user_username');
            $scope.user_email = localStorage.getItem('user_email');
            $scope.user_password = localStorage.getItem('user_password');
            $scope.user_phone = localStorage.getItem('user_phone');
            $scope.user_postCount = localStorage.getItem('user_postCount');
            $scope.user_followers = localStorage.getItem('user_followers');
            $scope.user_following = localStorage.getItem('user_following');
            $scope.user_photo = localStorage.getItem('user_photo');

            console.log("Username: " + $scope.user_username +" User Id : "+$scope.user_Id);
         console.log("Email: " + $scope.user_email + " Şifre : " + $scope.user_password);
         console.log("Login Status : " + $scope.login_status);
         console.log("User Phone : " +$scope.user_phone);



         $scope.loginButton_IsVisible = false;
         $scope.logoutButton_IsVisible = true;
         $scope.profile_data_IsVisible = true;

            $timeout(function() {
         $scope.closeLogin();
         //SWEET ALERT

          swal({
           title: "Giriş Başarılı!",
           text: "Hoşgeldiniz!",
           icon: "success",
        });

       }, 1000);



           }//end of else statement


        });

      };


//login olup olmadığını kontrol ediyor bu fonksiyon
      $scope.user_Id = localStorage.getItem('user_id');
  if($scope.user_Id){

      $scope.user_Id = localStorage.getItem('user_id');
      $scope.username = localStorage.getItem('user_username');
      $scope.user_email = localStorage.getItem('user_email');
      $scope.user_password = localStorage.getItem('user_password');
      $scope.user_phone = localStorage.getItem('user_phone');
      $scope.user_postCount = localStorage.getItem('user_postCount');
      $scope.user_followers = localStorage.getItem('user_followers');
      $scope.user_following = localStorage.getItem('user_following');
      $scope.user_photo = localStorage.getItem('user_photo');

      $scope.loginButton_IsVisible = false;
         $scope.logoutButton_IsVisible = true;
         $scope.profile_data_IsVisible = true;
  }




  //bu fonksiyon her sayfa tıklandığında buraya yazılan fonksiyonları çağırır!!
  $scope.$on('$ionicView.enter', function () {


  });

  //log out block



   $scope.logout = function() {

     $scope.loginData = null;

     localStorage.removeItem('user_id');
      localStorage.removeItem('user_username');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_password');
      localStorage.removeItem('user_phone');
      localStorage.removeItem('user_postCount');
      localStorage.removeItem('user_followers');
      localStorage.removeItem('user_following');
      localStorage.removeItem('user_photo');



      $scope.logoutButton_IsVisible = false;
      $scope.loginButton_IsVisible = true;
      $scope.profile_data_IsVisible = false;
      location.reload(); // REFRESHER METHOD IGNORE DO LOGIN NULL PROPERTY


      //$scope.login();
    };

    // REFRESHER

    $scope.doRefresh = function() {

      console.log('Refreshing!');
      $timeout( function() {
        //simulate async response
        location.reload();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };






  //signUp block!!!!!!!!!
 $scope.signUpData = {};
  $ionicModal.fromTemplateUrl('templates/signUp.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signModal = modal;
  });
   $scope.signUp = function(){
   $scope.modal.hide();
    $scope.signModal.show();

  };
 $scope.closeSignUp = function(){
  $scope.signModal.hide();
 }
  $scope.doSignUp = function(){
  //  console.log("Doing signUp",$scope.signUpData);

        var ServiceRequest = {
        service_type: "doSignUp",
        user_username :$scope.signUpData.Username,
        user_email: $scope.signUpData.Email,
        user_password: $scope.signUpData.Password,
        user_phone: $scope.signUpData.Phone
      }
      if ($scope.signUpData == null) {
        console.log("eksik veri girdiniz!!!");
      }else if ($scope.signUpData.Password != $scope.signUpData.PasswordRepeat) {
          console .log("Şifrenin uyuşmuyor. Bilgilerinizi kontrol ediniz!!!");
      }else{


      $http.post($scope.loginServiceURL, ServiceRequest)
      .success(function(data){

        console.log("kayıt başarılı");


    $timeout(function() {
          $scope.closeSignUp();
          $scope.login();
        }, 1000);


      });//end of http post
      }//end of else statement

  };//end of sign up function

$scope.goBackLogin = function(){
  $scope.signModal.hide();
  $scope.modal.show();
}
//forgotten password block!!!!!!!!!
$scope.forgottenData = {};
 $ionicModal.fromTemplateUrl('templates/forgotten-password.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.forgottenModal = modal;
  });
   $scope.forgottenPassword = function(){
   $scope.modal.hide();
    $scope.forgottenModal.show();

  };
  $scope.closeForgottenPassword = function(){
    $scope.forgottenModal.hide();
    //bu blockta login sayfasına geri dönüş yapılacaktır

  };
  $scope.doForgotten = function(){
    console.log("Doing Forgotten",$scope.forgottenData);

     $timeout(function() {
      $scope.closeForgottenPassword();
    }, 1000);
  };

 //edit profile modal ı kodları

 $scope.editProfileData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/edit-profile.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editProfileModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeProfile = function() {
    $scope.editProfileModal.hide();
  };

$scope.goEditProfile = function() {
    $scope.editProfileModal.show();
  };

  $scope.doProfileChange = function(){
    console.log("Edit Profile Verileri : " + $scope.editProfileData);

    if($scope.editProfileData == null){

        console.log("Veriler Gelmedi!!");

    }else if ($scope.editProfileData.password != $scope.editProfileData.passwordRepeat){
      swal({
        title: "Uyarı!",
        text: "Girdiğiniz şifre birbiriyle uyuşmuyor! Lütfen Yeni Şifrenizi tekrar giriniz",
        icon: "error",
    });
    }else if($scope.editProfileData.telefon.length > 11){
      swal({
        title: "Uyarı!",
        text: "Girdiğiniz telefon numarası geçersizdir! Lütfen tekrar giriniz",
        icon: "error",
    });
    }else{



        var ServiceRequest = {
          service_type: "updateProfile",
          user_id : $scope.user_Id,
          user_USERNAME : $scope.editProfileData.KullaniciAdi,
          user_EMAIL : $scope.editProfileData.email,
          user_PHONE : $scope.editProfileData.telefon,
          user_password : $scope.editProfileData.password,
          user_photo : $scope.foodPicUrl
        }
        $http.post($scope.loginServiceURL, ServiceRequest).success(function(){

          swal({
            title: "Başarılı!",
            text: "Profiliniz başarıyla güncellendi!",
            icon: "success",
        });

            localStorage.setItem('user_username', $scope.editProfileData.KullaniciAdi);
            localStorage.setItem('user_email', $scope.editProfileData.email);
            localStorage.setItem('user_password', $scope.editProfileData.password);
            localStorage.setItem('user_phone', $scope.telefon);
            //localStorage.setItem('user_photo', $scope.user_data.PHOTO);
           $scope.closeProfile();

        });

    }//end of else statement
  };//end of profile change function

$scope.followButtonIsVisible = true;
$scope.unfollowButtonIsVisible = false;

  $scope.goOtherUsersProfile = function(user_idIndex, userDetailData){

    // idToString = user_idIndex.toString();
    // $scope.globalFriendshipStatus = $scope.userFollowingsArray[idToString]['FRIENDSHIP_STATUS'];

        if(user_idIndex == null){
            console.log("Id Index Gelmedi!!!");
        }else{

          $scope.tempUserRecipeDataArray = $scope.allUsersAndRecipesArray[user_idIndex]['USER_FOODS'];
          $scope.followButtonIsVisible = true;
          $scope.unfollowButtonIsVisible = false;
          $state.go('app.userDetail',{"user_pda": userDetailData, "recipeDetailJson": $scope.tempUserRecipeDataArray});
        }

  };

//Classic go recipe detail page function beginning
$scope.goClassicRecipeDetailPage = function(recipeData){

console.log(recipeData);
    if(recipeData == null){
      console.log("Recipe Data Gelmedi");
    }else{
      $state.go('app.recipeDetail',{"classicRecDetailJson" : recipeData});
    }
};

$scope.goClassicRecipeDetailPageFromSearch = function(recipe_ID){

  rec_ID = recipe_ID.toString()

      if(recipe_ID == null){
        console.log("Recipe Data Gelmedi");
      }else{
        $state.go('app.recipeDetail',{"classicRecDetailJson" : $scope.allRecipes[rec_ID]});
      }
  };


// kullanıcının kendi tariflerinin çağırıldığı kod bloğu
$scope.updateAllRecipesOfLocalUserArray = function(){
  var recipesRequest = {
    service_type: 'getRecipes',
    user_id : $scope.user_Id
  }
  $http.post($scope.food_categoryServiceURL, recipesRequest).success(function(data){

    sessionStorage.setItem('allRecipesOfLocalUser', JSON.stringify(data));
    $scope.allRecipesOfLocalUserArray = JSON.parse(sessionStorage.getItem("allRecipesOfLocalUser"));

  });
};
$scope.allRecipesOfLocalUserArray = JSON.parse(sessionStorage.getItem("allRecipesOfLocalUser"));
$scope.updateAllRecipesOfLocalUserArray();

//tüm KULLANICILARIN VE tariflerinİN çekildiği blok


  $scope.updateAllUsersAndRecipes = function(){

  var allRecipesRequest = {
    service_type: 'getAllUsersAndRecipes'
  }
  $http.post($scope.food_categoryServiceURL, allRecipesRequest).success(function(data){


    sessionStorage.setItem('allUsersAndRec', JSON.stringify(data));
    $scope.allUsersAndRecipesArray = JSON.parse(sessionStorage.getItem("allUsersAndRec"));

  });
  };
$scope.allUsersAndRecipesArray = JSON.parse(sessionStorage.getItem("allUsersAndRec"));
$scope.updateAllUsersAndRecipes();

//tüm timeline tariflerinin çekildiği blok


$scope.updateAllRecipes = function(){

  var allRecipesRequest = {
    service_type: 'getRecipesOfTimeline'
  }
  $http.post($scope.food_categoryServiceURL, allRecipesRequest).success(function(data){


    sessionStorage.setItem('allRecipe', JSON.stringify(data));
    $scope.allRecipes = JSON.parse(sessionStorage.getItem("allRecipe"));

  });
};

$scope.allRecipes = JSON.parse(sessionStorage.getItem("allRecipe"));
$scope.updateAllRecipes();
//tüm timeline tariflerinin çekildiği kod blok sonu

$scope.updateGetSearchRecipeData = function(){
  var allRecipesRequest = {
    service_type: 'getAllRecipesForSearch'
  }
  $http.post($scope.food_categoryServiceURL, allRecipesRequest).success(function(data){


    sessionStorage.setItem('AllRecForSearch', JSON.stringify(data));
    $scope.allRecipesForSearchJson = JSON.parse(sessionStorage.getItem("AllRecForSearch"));

  });
};
$scope.allRecipesForSearchJson = JSON.parse(sessionStorage.getItem("AllRecForSearch"));
$scope.updateGetSearchRecipeData();
//anasayfadan recipe detay sayfasına yapılan yönlendirme kod bloğu

$scope.goMostLikedRecipeDetailFromHomePage = function(recipeData){

  if(recipeData == null){
      console.log("Data Gelmedi!!!");
  }else{

    $state.go('app.most_liked_recipe_detail',{"most_liked_json": recipeData});
  }

};
//anasayfadai yöresele tatların detay sayfa yönlendirmesi
$scope.goTradRecipeDetailFromHomePage = function(tradData){

  if(tradData == null){
      console.log("Data Gelmedi!!!");
  }else{

    $state.go('app.trad_recipes_detail',{"trad_json": tradData});
  }

};



var likeCount = 0;
$scope.likeIcon = "icon ion-ios-heart-outline";
    $scope.likeRecipe = function(rec_id){
      if(likeCount == 0){
        $scope.likeIcon = "animate__animated animate__pulse icon ion-ios-heart";
          var ServiceRequest = {
            service_type :'likeRecipe',
            recipe_id : rec_id,
            user_id : $scope.user_Id
          }
          $http.post($scope.food_categoryServiceURL, ServiceRequest).success(function(){
              console.log("Tarif beğenildi!");
          });
          likeCount ++;
      }else if(likeCount != 0){
        $scope.likeIcon = "animate__animated animate__shakeX icon ion-ios-heart-outline";
        var ServiceRequest = {
          service_type :'removeFromLikeRecipe',
          recipe_id : rec_id,
          user_id : $scope.user_Id
        }
        $http.post($scope.food_categoryServiceURL, ServiceRequest).success(function(){
            console.log("Tarif beğenilmekten geri çıkarıldı!");
        });
        likeCount --;
      }else{
        console.log("Ne beğenildi ne dislike edildi! Else in içinde oluyor!!!");
      }//end of else statement
    };//end of likeRecipe function



      //kullanıcnını favoritelerine eklendipi recipe lerin çekildiği blok

      $scope.updateFavRecipesArray = function(){
        var favoriteRecipesRequest = {
          service_type: 'getFavoriteRecipes',
          user_id : $scope.user_Id
        }
        $http.post($scope.food_categoryServiceURL, favoriteRecipesRequest).success(function(data){

          sessionStorage.setItem('favData', JSON.stringify(data));
          $scope.favRecArray = JSON.parse(sessionStorage.getItem("favData"));
      });
      };
      $scope.favRecArray = JSON.parse(sessionStorage.getItem("favData"));
      $scope.updateFavRecipesArray();

      //favoriler sayfasından gidilen profil detay sayfası  kodları


$scope.addToFavorites = function(rec_id,rec_name){

  if(!$scope.user_Id){

        $timeout(function(){

          swal({
            title: "Uyarı!",
            text: "Favorilerinize ekleyebilmek için kullanıcı girişi yapmalısınız!",
            icon: "error",
        });
        $scope.login();
      });

  }else{

      var ServiceRequest = {
        service_type : 'addToFavorites',
        rec_Id : rec_id,
        rec_Name : rec_name,
        user_id : $scope.user_Id
      }
      $http.post($scope.addFoodServiceURL, ServiceRequest).success(function(){

        $timeout(function(){
          swal({
            title: "Başarılı!",
            text: "Favorilere eklendi!",
            icon: "success",
        });
        },50);//end of timeout function

      });//end of the http post method
  }//end of else statement

  };//end of addToFavorites function

  $scope.goFavorites = function(){

    if(!$scope.user_Id){
      swal({
        title: "Uyarı!",
        text: "Favoriler sayfasına gidebilmek için kullanıcı girişi yapmalısınız!",
        icon: "error",
     });
      $timeout(function(){
          $scope.login();
      }, 50);

    }else{
      $scope.getFavorites();
      $state.go('app.favoriler');

    }
  };



  //kullanici ve yemeklerin çekildiği data bloğu
    $scope.updateAllUsersArray = function(){
          var getAllUsersServiceRequest = {
            service_type:'getAllUsers'
          }
          $http.post($scope.loginServiceURL, getAllUsersServiceRequest).success(function(data){


            sessionStorage.setItem('allUsers', JSON.stringify(data));
            $scope.allUsersArray = JSON.parse(sessionStorage.getItem("allUsers"));

          });//end of http post method
    };

  $scope.allUsersArray = JSON.parse(sessionStorage.getItem("allUsers"));
  $scope.updateAllUsersArray();
 // $scope.searchUserOrRecipe = function(){


 // };//end of search function


 //tablar arası geçiş için ng-show kullanılan block
 $scope.recipe_tab = "recipe_tab";
 $scope.user_tab = "user_tab";

 $scope.userTab_activity_ctrl = "";
 $scope.recipeTab_activity_ctrl = "active";


 $scope.recipeDatas_IsVisible = true;
 $scope.userDatas_IsVisible = false;

 $scope.showTabResults = function(procedureParam){

  if(procedureParam == "recipe_tab"){

      $scope.recipeDatas_IsVisible = true;
      $scope.userDatas_IsVisible = false;
      $scope.userTab_activity_ctrl = "";
      $scope.recipeTab_activity_ctrl = "active";

      console.log("Recipe Tab bölümü içince : ");
      console.log("Recipe Is Visible : " + $scope.recipeDatas_IsVisible);
      console.log("User Is Visible : " + $scope.userDatas_IsVisible);
      console.log("Recipe Is Visible : " + $scope.recipeTab_activity_ctrl);
      console.log("User Is Visible : " + $scope.userTab_activity_ctrl);
  }else if(procedureParam == "user_tab"){

      $scope.recipeDatas_IsVisible = false;
      $scope.userDatas_IsVisible = true;
      $scope.userTab_activity_ctrl = "active";
      $scope.recipeTab_activity_ctrl = "";
      console.log("User Tab bölümü içince : ");
      console.log("Recipe Is Visible : " + $scope.recipeDatas_IsVisible);
      console.log("User Is Visible : " + $scope.userDatas_IsVisible);
      console.log("Recipe Is Visible : " + $scope.recipeTab_activity_ctrl);
      console.log("User Is Visible : " + $scope.userTab_activity_ctrl);
  }else{
    console.log("Bunların hiçbirisi değil. NG-MODEL alınamıyor!!!");
  }//end of else statement


 };//end of the function



//creating the followers detail page modal
      $ionicModal.fromTemplateUrl('templates/followers.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.followersModal = modal;
      });

      // Triggered in the followers modal to close it
      $scope.closeFollowers = function() {
        $scope.followersModal.hide();
      };

      $scope.goFollowers = function() {
        $scope.followersModal.show();
      };


      //creating the following detail page modal
      $ionicModal.fromTemplateUrl('templates/following.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.followingModal = modal;
      });

      // Triggered in the following modal to close it
      $scope.closeFollowing = function() {
        $scope.followingModal.hide();
      };

      $scope.goFollowing = function() {
        $scope.followingModal.show();
      };

      //See more Trad Recipes fonksiyon bloğu

      $scope.updateAllTradRecipesArray = function(){
        var ServiceRequest = {
          service_type :'getAllTradRecipes'
        }
      $http.post($scope.food_categoryServiceURL, ServiceRequest).success(function(data){

        sessionStorage.setItem('allTradRecipe', JSON.stringify(data));
        $scope.allTradRecipesArray = JSON.parse(sessionStorage.getItem("allTradRecipe"));
      });
      };
      $scope.allTradRecipesArray = JSON.parse(sessionStorage.getItem("allTradRecipe"));
      $scope.updateAllTradRecipesArray();

   $scope.seeMoreTradRecipe = function(){

          $state.go('app.seeMoreTradRecipes',{moreTradJson : $scope.allTradRecipesArray});
      };



 //See more Liked Recipes fonksiyon bloğu
      $scope.updateAllLikedRecipesArray = function(){
        var ServiceRequest = {
          service_type :'getAllLikedRecipes'
        }
      $http.post($scope.food_categoryServiceURL, ServiceRequest).success(function(data){

        sessionStorage.setItem('allLikedRecipe', JSON.stringify(data));
        $scope.allLikedRecipesArray = JSON.parse(sessionStorage.getItem("allLikedRecipe"));
      });
      };$scope.allLikedRecipesArray = JSON.parse(sessionStorage.getItem("allLikedRecipe"));
      $scope.updateAllLikedRecipesArray();

      $scope.seeMoreLikedRecipes = function(){

          $state.go('app.seeMoreLikedRecipes',{moreLikedJson : $scope.allLikedRecipesArray});
      };


//USER FOLLOWING AND FOLLOW FUNCTIONS BLOCK BEGINS



$scope.follow = function(followedId){
      if(followedId == null){
        console.log("Takip edilecek kullanıcının id si gelmedi!");
      }else{
        $scope.followButtonIsVisible = false;
        $scope.unfollowButtonIsVisible = true;

        var ServiceRequest = {
          service_type :'follow',
          localUserId : $scope.user_Id,
          followingUserId : followedId
        }
        $http.post($scope.user_followingServiceURL, ServiceRequest).success(function(){
          console.log("Following Success");

        });
      }

};

$scope.unfollow = function(followedId){

  if(followedId == null){
    console.log("Takipten çıkarılacak  kullanıcının id si gelmedi!");
  }else{

    var ServiceRequest = {
      service_type :'unfollow',
      localUserId : $scope.user_Id,
      followingUserId : followedId
    }
    $http.post($scope.user_followingServiceURL, ServiceRequest).success(function(){
      console.log("Unfollowing Success");
      $scope.followButtonIsVisible = true;
      $scope.unfollowButtonIsVisible = false;
    });
  }
};

$scope.getUserFollowers = function(){

};

$scope.getUserFollowings = function(){

    var ServiceRequest = {
      service_type :'getFollowing',
      localUser_Id : $scope.user_Id
    }
    $http.post($scope.user_followingServiceURL, ServiceRequest).success(function(data){

      sessionStorage.setItem('userFollowing', JSON.stringify(data));
      $scope.userFollowingsArray = JSON.parse(sessionStorage.getItem("userFollowing"));
    });

};
$scope.userFollowingsArray = JSON.parse(sessionStorage.getItem("userFollowing"));
$scope.getUserFollowings();
//USER FOLLOWING AND FOLLOW FUNCTIONS BLOCK ENDS


$scope.goFilter = function(){
    $state.go('app.filtre');
};



    // CAMERA FONKSİYON BAŞLANGICI

    $scope.picFromCamera = function () {

      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: true
      };

      // udpate camera image directive
      $cordovaCamera.getPicture(options).then(function (imageData) {

        console.log("camera data:" + angular.toJson(imageData));
        $scope.foodPicUrl = "data:image/jpeg;base64," + imageData;

      }, function (err) {
        console.log("camera data:" + angular.toJson(imageData));
        console.log('Failed because: ');
        console.log(err);
      });
      // FOTOĞRAF DATABASE E KAYDOLUP GERİ GELİYOR MU TEST KODU



    };


    $scope.picFromGallery = function () {

      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: false
      };

      // udpate camera image directive
      $cordovaCamera.getPicture(options).then(function (imageData) {

        console.log("camera data:" + angular.toJson(imageData));
        $scope.foodPicUrl = "data:image/jpeg;base64," + imageData;
      // $scope.tempPhotoData = imageData;



      }, function (err) {
        console.log("camera data:" + angular.toJson(imageData));
        console.log('Failed because: ');
        console.log(err);
      });
      // FOTOĞRAF DATABASE E KAYDOLUP GERİ GELİYOR MU TEST KODU

    };



// EDIT PHOTO BAŞLANGICI

$scope.editProfilePhoto = function () {

  $ionicActionSheet.show({
    titleText: 'Fotoğraf Değiştirme',
    buttons: [
      {text: '<i class="icon ion-camera"></i> Kamera'},
      {text: '<i class="icon ion-images"></i> Galeri'},
    ],
    //   destructiveText: 'Sil',
    cancelText: 'İptal',
    cancel: function () {
      console.log('CANCELLED');
    },
    buttonClicked: function (index) {
      console.log('BUTTON CLICKED', index);
      if (index == 0) {
        $scope.picFromCamera();
        return true;
      } else {
        $scope.picFromGallery();
        return true;
      }
    }
    //   destructiveButtonClicked: function() {
    //     console.log('DESTRUCT');
    //     return true;
    //   }
  });
};

    // CAMERA FONKSİYON SONU


//FAVORILERDEN ÇIKARMA FONKSIYONU
$scope.removeFromFavorites = function(yemekId){

  if(yemekId == null){
    console.log("Yemek Id si Gelmiyor");
  }else{
    var ServiceRequest = {
      service_type :'removeFromFavorites',
      rec_id :yemekId,
      log_id :$scope.user_Id
    }
    $http.post($scope.addFoodServiceURL, ServiceRequest).success(function(){
      console.log("Yemek Favorilerden başarıyla çıkarıldı");
      $scope.doRefresh();
      swal({
        title: "Başarılı!",
        text: "Favorilerde Çıkarıldı!",
        icon: "success",
    });
    });
  }


};

$scope.deleteMyFood = function(yemekId){
    if(yemekId ==  null){
      console.log("Yemek Id si gelmiyor");
    }else{
      var ServiceRequest = {
        service_type :'removeFromTariflerim',
        rec_id : yemekId,
        log_id : $scope.user_Id
      }
      $http.post($scope.addFoodServiceURL, ServiceRequest).success(function(){
        console.log("Yemek Favorilerden başarıyla çıkarıldı");
        $scope.updatePostCountOfUserDecrease();
      $scope.doRefresh();
      swal({
        title: "Başarılı!",
        text: "Tarifiniz başarıyla silinmiştir!",
        icon: "success",
    });
      });
  };
}//end of deletemyfood func


$scope.getCurrentPostCount = function(){
  var ServiceRequest = {
    service_type :'getCurrentPostCount',
    user_id : $scope.user_Id
  }
  $http.post($scope.loginServiceURL, ServiceRequest).success(function(data){

    console.log("Data : " + data);
    $scope.tempCurrentPostCount = data.POST_COUNT;
    localStorage.setItem('user_postCount', $scope.tempCurrentPostCount);
    $scope.user_postCount = localStorage.getItem('user_postCount');
  });
};
$scope.user_postCount = localStorage.getItem('user_postCount');






//End of the AppCtrl
})



.controller('PlaylistsCtrl', function($scope,$state,$http, $stateParams) {

  $scope.Categories = [
    {
      "ID": "0",
      "CATEGORY_NAME": "Kahvaltı",
      "CATEGORY_IMAGE": "img/category_images/kahvaltı.jpg"
    },
    {
      "ID": "1",
      "CATEGORY_NAME": "Öğle Yemeği",
      "CATEGORY_IMAGE": "img/category_images/öğle.jpg"
    },
    {
      "ID": "2",
      "CATEGORY_NAME": "Ara Sıcaklar",
      "CATEGORY_IMAGE": "img/category_images/arasıcak.png"
    },
    {
      "ID": "3",
      "CATEGORY_NAME": "Beyaz Etler",
      "CATEGORY_IMAGE": "img/category_images/beyazet.jpg"
    },
    {
      "ID": "4",
      "CATEGORY_NAME": "Kırmızı Etler",
      "CATEGORY_IMAGE": "img/category_images/kırmızıet.jpg"
    },
    {
      "ID": "5",
      "CATEGORY_NAME": "Mezeler",
      "CATEGORY_IMAGE": "img/category_images/mezeler.jpg"
    },
    {
      "ID": "6",
      "CATEGORY_NAME": "Balıklar",
      "CATEGORY_IMAGE": "img/category_images/balıklar.jpg"
    },
    {
      "ID": "7",
      "CATEGORY_NAME": "Zeytinyağlılar",
      "CATEGORY_IMAGE": "img/category_images/zeytinyağlı.jpg"
    },
    {
      "ID": "8",
      "CATEGORY_NAME": "Burgerler",
      "CATEGORY_IMAGE": "img/category_images/burger.jpg"
    },
    {
      "ID": "9",
      "CATEGORY_NAME": "Atıştırmalıklar",
      "CATEGORY_IMAGE": "img/category_images/atıştırmalık.jpg"
    },
    {
      "ID": "10",
      "CATEGORY_NAME": "Sandviçler",
      "CATEGORY_IMAGE": "img/category_images/sandviç.jpg"
    },
    {
      "ID": "11",
      "CATEGORY_NAME": "5 Çayı",
      "CATEGORY_IMAGE": "img/category_images/5çayı.jpg"
    },
    {
      "ID": "12",
      "CATEGORY_NAME": "Makarnalar",
      "CATEGORY_IMAGE": "img/category_images/Fettuccine-Alfredo-Recipe.jpg"
    },
    {
      "ID": "13",
      "CATEGORY_NAME": "Çorbalar",
      "CATEGORY_IMAGE": "img/category_images/beyran.jpg"
    },
    {
      "ID": "14",
      "CATEGORY_NAME": "Geleneksel Türk Mutfağı",
      "CATEGORY_IMAGE": "img/category_images/geleneksel_türk_mutfagi.jpg"
    }
  ]

//category json request block

  $scope.foodArray = sessionStorage.getItem('foodCat');
if(!$scope.foodArray){
     //category json request block
     var getCategoryServiceRequest = {
      service_type: 'getCategories'
    }
    $http.post($scope.food_categoryServiceURL, getCategoryServiceRequest).success(function(data){

      sessionStorage.setItem('foodCat', JSON.stringify(data));
      $scope.foodArray = JSON.parse(sessionStorage.getItem("foodCat"));

    });


}//end of if statement
$scope.foodArray = JSON.parse(sessionStorage.getItem("foodCat"));



if($stateParams.categoryId){

  console.log("gelen category detail  name :" + $stateParams.categoryId);
  $scope.CurrentId = $stateParams.categoryId;

  $scope.foodDetayBilgi = $scope.foodArray[$stateParams.categoryId]['CATEGORY_FOODS'];
}//end of if statement of category detail food page

$scope.category_IsVisible = true;
$scope.recipeDetail_IsVisible = false;
$scope.navBackButton_IsVisible = false;
$scope.backButton_IsVisible = false;


$scope.showRecipeDetail = function(rec_id){

if(rec_id == null){

  console.log("Rec_Id gelmiyor!!!");
}else{
  console.log("Rec_Id : " + rec_id);
  console.log($scope.foodDetayBilgi);

  $scope.tempRecDetailArray = $scope.foodDetayBilgi[rec_id];
  $scope.tempRecDetailArrayIngrediantsJson = $scope.allRecipes[rec_id];

  console.log($scope.tempRecDetailArray);
  $scope.category_IsVisible = false;
  $scope.recipeDetail_IsVisible = true;
  $scope.navBackButton_IsVisible = true;
  $scope.backButton_IsVisible = true;

}


};//end of showRecipeDetail function block

$scope.showBackCategoryDetails = function(){

  $scope.category_IsVisible = true;
  $scope.recipeDetail_IsVisible = false;
  $scope.backButton_IsVisible = false;
};

//playlists Ctrlr için versiyon check fonksiyonu


  $scope.updateTradRecipesArray = function(){
    var getTraditionalServiceRequest = {
      service_type: 'getTraditionalRecipes'
    }
    $http.post($scope.food_categoryServiceURL, getTraditionalServiceRequest).success(function(data){

      sessionStorage.setItem('tradRecipes', JSON.stringify(data));
      $scope.tradRecipesArray = JSON.parse(sessionStorage.getItem("tradRecipes"));

    });
  };
$scope.mostLikedRecipesArray = JSON.parse(sessionStorage.getItem("tradRecipes"));
$scope.updateTradRecipesArray();


    //en beğenilen tariflerin çağırıldığı block

$scope.updateMostLikedRecipesArray = function(){
  var getMostLikedRecipesServiceRequest = {
    service_type: 'getMostLikedRecipes'
  }
  $http.post($scope.food_categoryServiceURL, getMostLikedRecipesServiceRequest).success(function(data){

    sessionStorage.setItem('mostLikedRec', JSON.stringify(data));
    $scope.mostLikedRecipesArray = JSON.parse(sessionStorage.getItem("mostLikedRec"));

  });
};
 $scope.mostLikedRecipesArray = JSON.parse(sessionStorage.getItem("mostLikedRec"));
 $scope.updateMostLikedRecipesArray();


  $scope.filter = function() {
    $state.go('app.filtre');
  };



  //End of the PlaylistsCtrl
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})//end of PlaylistCtrl

.controller('UserDetailCtrl', function($scope, $stateParams) {


//diğer kullanıcıların detay sayfasının verilerinin atandığı kod bloğu
  $scope.tempUserDetailPageData = $stateParams.user_pda;
  $scope.tempUserRecipeDetailPageProfileData = $stateParams.recipeDetailJson;

  //most liked detay sayfası jason atama kodları
  $scope.tempMostLikedRecipesArray = $stateParams.most_liked_json;
  $scope.tempTradRecipesArray = $stateParams.trad_json;

})//end of PlaylistCtrl


.controller('RecipeCtrl', function($scope, $timeout,  $http, $ionicPopover) {




$scope.recipeFoodPicURL = $scope.foodPicUrl;


    $scope.ingrediantUnitQuantity = [1,	2,	3,	4,	5,	6,	7,	8,	9,	10,	11,	12,	13,	14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,	40,	41,	42,	43,	44,	45,	46,	47,	48,	49,	50,	51,	52,	53,	54,	55,	56,	57,	58,	59,	60,	61,	62,	63,	64,	65,	66,	67,	68,	69,	70,	71,	72,	73,	74,	75,	76,	77,	78,	79,	80,	81,	82,	83,	84,	85,	86,	87,	88,	89,	90,	91,	92,	93,	94,	95,	96,	97,	98,	99,	100,	101,	102,	103,	104,	105,	106,	107,	108,	109,	110,	111,	112,	113,	114,	115,	116,	117,	118,	119,	120,	121,	122,	123,	124,	125,	126,	127,	128,	129,	130,	131,	132,	133,	134,	135,	136,	137,	138,	139,	140,	141,	142,	143,	144,	145,	146,	147,	148,	149,	150,	151,	152,	153,	154,	155,	156,	157,	158,	159,	160,	161,	162,	163,	164,	165,	166,	167,	168,	169,	170,	171,	172,	173,	174,	175,	176,	177,	178,	179,	180,	181,	182,	183,	184,	185,	186,	187,	188,	189,	190,	191,	192,	193,	194,	195,	196,	197,	198,	199,	200,	201,	202,	203,	204,	205,	206,	207,	208,	209,	210,	211,	212,	213,	214,	215,	216,	217,	218,	219,	220,	221,	222,	223,	224,	225,	226,	227,	228,	229,	230,	231,	232,	233,	234,	235,	236,	237,	238,	239,	240,	241,	242,	243,	244,	245,	246,	247,	248,	249,	250,	251,	252,	253,	254,	255,	256,	257,	258,	259,	260,	261,	262,	263,	264,	265,	266,	267,	268,	269,	270,	271,	272,	273,	274,	275,	276,	277,	278,	279,	280,	281,	282,	283,	284,	285,	286,	287,	288,	289,	290,	291,	292,	293,	294,	295,	296,	297,	298,	299,	300,	301,	302,	303,	304,	305,	306,	307,	308,	309,	310,	311,	312,	313,	314,	315,	316,	317,	318,	319,	320,	321,	322,	323,	324,	325,	326,	327,	328,	329,	330,	331,	332,	333,	334,	335,	336,	337,	338,	339,	340,	341,	342,	343,	344,	345,	346,	347,	348,	349,	350,	351,	352,	353,	354,	355,	356,	357,	358,	359,	360,	361,	362,	363,	364,	365,	366,	367,	368,	369,	370,	371,	372,	373,	374,	375,	376,	377,	378,	379,	380,	381,	382,	383,	384,	385,	386,	387,	388,	389,	390,	391,	392,	393,	394,	395,	396,	397,	398,	399,	400,	401,	402,	403,	404,	405,	406,	407,	408,	409,	410,	411,	412,	413,	414,	415,	416,	417,	418,	419,	420,	421,	422,	423,	424,	425,	426,	427,	428,	429,	430,	431,	432,	433,	434,	435,	436,	437,	438,	439,	440,	441,	442,	443,	444,	445,	446,	447,	448,	449,	450,	451,	452,	453,	454,	455,	456,	457,	458,	459,	460,	461,	462,	463,	464,	465,	466,	467,	468,	469,	470,	471,	472,	473,	474,	475,	476,	477,	478,	479,	480,	481,	482,	483,	484,	485,	486,	487,	488,	489,	490,	491,	492,	493,	494,	495,	496,	497,	498,	499,	500,	501,	502,	503,	504,	505,	506,	507,	508,	509,	510,	511,	512,	513,	514,	515,	516,	517,	518,	519,	520,	521,	522,	523,	524,	525,	526,	527,	528,	529,	530,	531,	532,	533,	534,	535,	536,	537,	538,	539,	540,	541,	542,	543,	544,	545,	546,	547,	548,	549,	550,	551,	552,	553,	554,	555,	556,	557,	558,	559,	560,	561,	562,	563,	564,	565,	566,	567,	568,	569,	570,	571,	572,	573,	574,	575,	576,	577,	578,	579,	580,	581,	582,	583,	584,	585,	586,	587,	588,	589,	590,	591,	592,	593,	594,	595,	596,	597,	598,	599,	600,	601,	602,	603,	604,	605,	606,	607,	608,	609,	610,	611,	612,	613,	614,	615,	616,	617,	618,	619,	620,	621,	622,	623,	624,	625,	626,	627,	628,	629,	630,	631,	632,	633,	634,	635,	636,	637,	638,	639,	640,	641,	642,	643,	644,	645,	646,	647,	648,	649,	650,	651,	652,	653,	654,	655,	656,	657,	658,	659,	660,	661,	662,	663,	664,	665,	666,	667,	668,	669,	670,	671,	672,	673,	674,	675,	676,	677,	678,	679,	680,	681,	682,	683,	684,	685,	686,	687,	688,	689,	690,	691,	692,	693,	694,	695,	696,	697,	698,	699,	700,	701,	702,	703,	704,	705,	706,	707,	708,	709,	710,	711,	712,	713,	714,	715,	716,	717,	718,	719,	720,	721,	722,	723,	724,	725,	726,	727,	728,	729,	730,	731,	732,	733,	734,	735,	736,	737,	738,	739,	740,	741,	742,	743,	744,	745,	746,	747,	748,	749,	750,	751,	752,	753,	754,	755,	756,	757,	758,	759,	760,	761,	762,	763,	764,	765,	766,	767,	768,	769,	770,	771,	772,	773,	774,	775,	776,	777,	778,	779,	780,	781,	782,	783,	784,	785,	786,	787,	788,	789,	790,	791,	792,	793,	794,	795,	796,	797,	798,	799,	800,	801,	802,	803,	804,	805,	806,	807,	808,	809,	810,	811,	812,	813,	814,	815,	816,	817,	818,	819,	820,	821,	822,	823,	824,	825,	826,	827,	828,	829,	830,	831,	832,	833,	834,	835,	836,	837,	838,	839,	840,	841,	842,	843,	844,	845,	846,	847,	848,	849,	850,	851,	852,	853,	854,	855,	856,	857,	858,	859,	860,	861,	862,	863,	864,	865,	866,	867,	868,	869,	870,	871,	872,	873,	874,	875,	876,	877,	878,	879,	880,	881,	882,	883,	884,	885,	886,	887,	888,	889,	890,	891,	892,	893,	894,	895,	896,	897,	898,	899,	900,	901,	902,	903,	904,	905,	906,	907,	908,	909,	910,	911,	912,	913,	914,	915,	916,	917,	918,	919,	920,	921,	922,	923,	924,	925,	926,	927,	928,	929,	930,	931,	932,	933,	934,	935,	936,	937,	938,	939,	940,	941,	942,	943,	944,	945,	946,	947,	948,	949,	950,	951,	952,	953,	954,	955,	956,	957,	958,	959,	960,	961,	962,	963,	964,	965,	966,	967,	968,	969,	970,	971,	972,	973,	974,	975,	976,	977,	978,	979,	980,	981,	982,	983,	984,	985,	986,	987,	988,	989,	990,	991,	992,	993,	994,	995,	996,	997,	998,	999,	1000];
    //malzeme ekleme kısmındaki select option larının initial value larının tanımlandığı yer
    $scope.yemekKategori = "Kahvaltı";
    $scope.malzemeBirimi = "Çay Kaşığı";
    $scope.malzemeBirimiSayisi = "1";



    //eklenen malzemeleri slider da gösteren fonkisyon bloğu
    $scope.newTempIngrediantDataArray = [];

    $scope.addIngrediant = function(malzemeAdi,malzemeBirimi,malzemeBirimiSayisi){


    var ServiceRequest = {
      service_type : 'showIngrediant',
      ingrediant_name: malzemeAdi
    }
    $http.post($scope.addFoodServiceURL, ServiceRequest).success(function(data){

      $scope.tempIngrediantData = data[0];

      console.log($scope.tempIngrediantData);
        $scope.newTempIngrediantDataArray.push({id : $scope.tempIngrediantData.ID,
                                                ing_name : $scope.tempIngrediantData.INGREDIANT_NAME,
                                                ing_unit : malzemeBirimi, ing_unit_qty : malzemeBirimiSayisi,
                                              ing_image : $scope.tempIngrediantData.INGREDIANT_IMAGE});


    });
    //eklenen malzemeleri diziye atadığımız block sonu
    };//end of addIngrediant function

    $scope.updatePostCountOfUser = function(){
      var ServiceRequest = {
        service_type :'updatePostCount',
        user_id : $scope.user_Id
      }
      $http.post($scope.loginServiceURL, ServiceRequest).success(function(){


      });
    };

    $scope.updatePostCountOfUserDecrease = function(){
      var ServiceRequest = {
        service_type :'updatePostCountDecrease',
        user_id : $scope.user_Id
      }
      $http.post($scope.loginServiceURL, ServiceRequest).success(function(){


      });
    };

    // Yemek Tanımlama Fonksiyonu
    $scope.YemekTanimla = function(yemekAdi,porsiyonMiktari,porsiyonBirimi,prepTime,pisirmeSüresi,yemekKategori,tarif_text){



    if(!$scope.user_Id){
      $timeout(function(){

      swal({
        title: "Uyarı!",
        text: "Yemek Tanımlayabilmek için kullanıcı girişi yapmalısınız!",
        icon: "error",
    });
    $scope.login();
      },50);
    }else if($scope.foodPicUrl == null){

      swal({
        title: "Uyarı!",
        text: "Yemek Tanımlayabilmek için fotoğraf yüklemelisiniz!",
        icon: "error",
    });

    }else{


      var ServiceRequest = {
        service_type: 'addRecipe',
        kullaniciId : $scope.user_Id,
        recipeName: yemekAdi,
        portionQTY : porsiyonMiktari,
        portionUnit : porsiyonBirimi,
        preperationTime : prepTime,
        cookingTime : pisirmeSüresi,
        recipeCategory : yemekKategori,
        recipeText : tarif_text,
        recipePhoto : $scope.foodPicUrl
      }
      $http.post($scope.addFoodServiceURL, ServiceRequest).success(function(data){

          $scope.getMaxIdFromDb();
          $scope.maxRecipeId = localStorage.getItem("maxRecId");
          $scope.addIngrediantsToDatabase();
          $scope.updatePostCountOfUser();
          $timeout(function(){
            swal({
              title: "Tebrikler",
              text: "Yemek Tarifinizi Başarıyla Kaydettiniz!!!",
              icon: "success",
          });

          },50);

      });//end of http post method
    }//end of else statement
    };
    // Yemek Tanımlama Fonksiyonu sonu

$scope.getMaxIdFromDb = function(){
  var ServiceRequest = {
    service_type :'getMaxId'
  }
  $http.post($scope.addFoodServiceURL, ServiceRequest).success(function(data){
    var id = parseInt(data[0].MAX_ID);
    console.log("Önceki Id : " + id);
    var id = id+1;
    console.log("Sonraki Id : " + id);
    localStorage.setItem('maxRecId', id);
    $scope.maxRecipeId = localStorage.getItem("maxRecId");
  });
};

$scope.maxRecipeId = localStorage.getItem("maxRecId");



    //ingrediant ları database e eklemek için yazılan fonksiyonun başlangıcı

    $scope.addIngrediantsToDatabase = function(){
console.log("Gelen Data add to db arrayi : ");
console.log( $scope.newTempIngrediantDataArray);
var tempId = parseInt($scope.maxRecipeId);

//$scope.newTempIngrediantDataArray.splice($scope.newTempIngrediantDataArray.indexOf($scope.newTempIngrediantDataArray.length-1),1);
console.log("Burdan aşağısı berkay denemeler add to database");
console.log("RECIPE MAX ID : " + tempId);
      var ServiceRequest = {
        service_type: 'addIngrediantToDB',
        ing_array : $scope.newTempIngrediantDataArray,
        recipeId : tempId
      }


      $http.post($scope.addFoodServiceURL, ServiceRequest).success(function(){

        console.log("Malzemeler başarıyla kaydedildi!!!");


      });//end of http post method
    };//END OF addedIngrediantToDatabase Function




    /*
    $scope.$on('$ionicView.enter', function () {

    ŞABLON KOD BURDADIR!!!!

    });
    */
    //popover kodları
    $ionicPopover.fromTemplateUrl('templates/ingrediant_popover.html', {
        scope: $scope,
        backdropClickToClose: true
        }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
        console.log("Fonksiyon calisti");
    };

    $scope.closePopover = function () {
         $scope.popover.hide();
    };

    //popover içerisne çağrılan ingrediant datalarının çekildiği function

$scope.updateIngrediantsArray = function(){
  var popoverServiceRequest ={
    service_type : 'getIngrediants'
  }
  $http.post($scope.addFoodServiceURL, popoverServiceRequest).success(function(data){

    sessionStorage.setItem('ingrediants', JSON.stringify(data));
    $scope.ingrediantsArray = JSON.parse(sessionStorage.getItem("ingrediants"));

  });//end of http post method
};
   $scope.ingrediantsArray = JSON.parse(sessionStorage.getItem("ingrediants"));
   $scope.updateIngrediantsArray();

    //popover içerisne çağrılan ingrediant datalarının çekildiği function sonu

    //tıklandığında popover ı kapatıp input a seçilen malzemenin adını insert eden fonksiyon başlangıcı
    $scope.chooseIngrediant = function(malzeme){
    $scope.malzemeAdi = malzeme;
    $scope.closePopover();
    };


})//end of RecipeCtrl

.controller('DetailPagesCtrl', function($scope, $stateParams) {


  $scope.tempAllMoreTradRecipesJson = $stateParams.moreTradJson;

  $scope.tempAllMoreLikedRecipesJson = $stateParams.moreLikedJson;
  $scope.tempClassicRecDetailJson = $stateParams.classicRecDetailJson;
  $scope.tempSearchUserJson = $stateParams.searchUserJson;
  $scope.tempSearchRecipeJson = $stateParams.searchRecipeJson;


})//end of DetailPagesCtrl


;//Controllerjs sayfasının sonu yani "angular.module" fonksiyonunun sonu!!!


