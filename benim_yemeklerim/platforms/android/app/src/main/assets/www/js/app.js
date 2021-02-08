// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','sw2.ionic.input-clearable','ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.yemek-tanımla', {
    url: '/yemek-tanımla',
    views: {
      'menuContent': {
        templateUrl: 'templates/yemek-tanımla.html',
        controller: 'RecipeCtrl'
      }
    }
  })




  .state('app.kategoriler', {
      url: '/kategoriler',
      views: {
        'menuContent': {
          templateUrl: 'templates/kategoriler.html',
          controller:'PlaylistsCtrl'
        }
      }
    })

    .state('searchUsersOrRecipes', {
      url: '/searchUsersOrRecipes',
      abstract:true,
      templateUrl:"templates/searchUsersOrRecipes.html"
    })


    .state('app.tariflerim', {
      url: '/tariflerim',
      views: {
        'menuContent': {
          templateUrl: 'templates/tariflerim.html',
          controller:'PlaylistsCtrl'
        }
      }
    })



    .state('app.favoriler', {
      url: '/favoriler',
      views: {
        'menuContent': {
          templateUrl: 'templates/favoriler.html'
        }
      }
    })

    .state('app.anasayfa', {
      url: '/anasayfa',
      views: {
        'menuContent': {
          templateUrl: 'templates/anasayfa.html',
          controller:'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/category_detail/:categoryId',
    views: {
      'menuContent': {
        templateUrl: 'templates/category-detail.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.userDetail', {
    url: '/userDetail',
    params: {
      user_pda: null,//eğer default değer göndermek istersem buraya bir json koyabilirim ve defalt değeri atayabilirim
      recipeDetailJson: null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/userDetail.html',
        controller : 'UserDetailCtrl'
      }
    }
  })


  .state('app.most_liked_recipe_detail', {
    url: '/most_liked_recipe_detail',
    params: {
      most_liked_json: null//eğer default değer göndermek istersem buraya bir json koyabilirim ve defalt değeri atayabilirim
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/most_liked_recipe_detail.html'
      }
    }
  })

  .state('app.trad_recipes_detail', {
    url: '/trad_recipes_detail',
    params: {
      trad_json: null//eğer default değer göndermek istersem buraya bir json koyabilirim ve defalt değeri atayabilirim
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/trad_recipes_detail.html'
      }
    }
  })

  .state('app.seeMoreLikedRecipes', {
    url: '/seeMoreLikedRecipes',
    params: {
      moreLikedJson: null//eğer default değer göndermek istersem buraya bir json koyabilirim ve defalt değeri atayabilirim
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/seeMoreLikedRecipes.html'
      }
    }
  })

  .state('app.seeMoreTradRecipes', {
    url: '/seeMoreTradRecipes',
    params: {
      moreTradJson: null//eğer default değer göndermek istersem buraya bir json koyabilirim ve defalt değeri atayabilirim
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/seeMoreTradRecipes.html'
      }
    }
  })


  .state('app.recipeDetail', {
    url: '/recipeDetail',
    params: {
      classicRecDetailJson : null//eğer default değer göndermek istersem buraya bir json koyabilirim ve defalt değeri atayabilirim
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/recipeDetail.html'
      }
    }
  })

  .state('app.searchUsersOrRecipes', {
    url: '/searchUsersOrRecipes',
    params: {
      searchUserJson : null,
      searchRecipeJson : null//eğer default değer göndermek istersem buraya bir json koyabilirim ve defalt değeri atayabilirim
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/searchUsersOrRecipes.html'
      }
    }
  })

    .state('app.filtre', {
    url: '/filtre',
    views: {
      'menuContent': {
        templateUrl: 'templates/filtre.html'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html'
      }
    }
  })
 //end of the state definition!!!
 ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/anasayfa');
});
