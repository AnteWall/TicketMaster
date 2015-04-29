define(['angularAMD','../nwjs/nwWindow','moment'], function (angularAMD,nwWindow,moment) {

	var gui = require('nw.gui');

    var app = angular.module("ticketApp", ['ngAnimate','ngAudio','ui.bootstrap']);
    app.controller('TopCtrl',['$scope',function($scope){
    	$scope.maximize = false;
    	$scope.exit = function(){
    		nwWindow.close();
    	}
    	$scope.minimise = function(){
			nwWindow.minimize();
    	}
    	$scope.expand = function(){
    		if($scope.maximize){	
    			nwWindow.unmaximize();
    			$scope.maximize = false;
    		}
    		else{
    			nwWindow.maximize();
    			$scope.maximize = true;
    		}
    	}
	}]);


    app.controller('MessageCtrl',['$scope','ngAudio',function($scope,ngAudio){
        $scope.sound = ngAudio.load("app/alarm.ogg");
    	$scope.triggers = ["säljer", "säljes", "kränga", "kränger", "kvarn"];
    	$scope.messages = [];
    	$scope.$on('messages',function(event,data){
    		angular.forEach(data.data,function(obj){
    			if(obj.message != undefined){
	    			if(triggers(obj.message) && !alreadyExists(obj)){
	    				$scope.messages.push(obj);                        
                        $scope.sound.play();
	    			}
    			}
    		});
    		//$scope.$apply();

    	});

        $scope.fromNow = function(message){
            return moment(message.created_time).fromNow();
        }

    	$scope.openLink = function(message){
    		gui.Shell.openExternal(message.actions[0].link)
    	}

    	$scope.getEventName = function(){
    		if($scope.messages.length > 0){
    			return $scope.messages[0].to.data[0].name;
    		}
    		return "";
    	}
    	$scope.getPhone = function(message){
    		var re =  new RegExp(/((07|\+46)([0-9][ -]*){7,8}[0-9])/);    		
    		var match = re.exec(message.message);
    		if(match == null)
    			return "-";
    		else
    			return match[0];
    	}

    	function alreadyExists(message){
    		for(var i = 0; i < $scope.messages.length; i++){
    			var msg = $scope.messages[i];
    			if(msg.id == message.id){
    				return true;
    			}
    		}
    		return false;
    	}

    	function triggers(str){

    		for(var i = 0; i < $scope.triggers.length; i++){
    			var word = $scope.triggers[i];
    			var re = new RegExp(word,"i");
    			if(str.search(re) > -1){
    				return true;
    			}	
    		}
    		return false;
    	}
    }]);

    app.controller('SettingsCtrl',['$rootScope','$scope','$interval','$http','$modal', 
    	function($rootScope,$scope,$interval,$http,$modal){
    	$scope.settings = {};
        $scope.user = {}
    	/*$scope.settings.api_key = "CAACEdEose0cBAEn0ZC65ofeGGiigmEBO9mikVbCwxSGAE9Q3LnH1qj2oVcNakbjfPrq14ydhQiZAUb66XqWGDp5ihiYg5d8eGRsae7jiC5wzsH65KK0nhqUsgQ4CTLkQIZBwJJsG0kUZAsXWrmJ2qArtZBuYEQOqfygBAhmU7ylefQRsZB1JK54Kjsuu9ZBVIGofmH3ShmZAF2eDVBbgvHp7";
    	$scope.settings.event = "1584013525204819";*/
	    $scope.settings.loop = 10;
	    $scope.interval;
        var fbURL = 'https://graph.facebook.com/v2.3/';
        var appid = "710824895663274";
        var redirect_uri = "https://www.facebook.com/connect/login_success.html";
        var secret = "55767825ca6ddd8b36ef1b0329211a02";
        $scope.get_token = function(code){
            console.log("JEK!");
            var url = 'https://graph.facebook.com/v2.3/oauth/access_token?client_id='+appid;
            url += '&redirect_uri='+redirect_uri;
            url += '&client_secret='+secret;
            url += '&code='+code;
            $http.get(url).success(function(res){
                $scope.settings.api_key = res.access_token;
                $scope.get_me();
            }).error(function(err){
                console.log(err);
            })
        }

        $scope.get_me = function(){
            if($scope.settings.api_key){
                $http.get(fbURL + 'me/?fields=picture,id,name&access_token='+$scope.settings.api_key).success(function(res){
                    console.log(res);
                    $scope.user = res;
                }).error(function(err){
                    console.log(err);
                })
            }
        }

        $scope.login = function(){
            var t_url = 'https://www.facebook.com/dialog/oauth?client_id='+appid+'&redirect_uri='+ redirect_uri;
            var fb_window = gui.Window.open(t_url);            
            fb_window.on('loaded',function(){                
                var login_path = fb_window.window.location;
                if(getQueryVariable(login_path,'code') != false){
                    $scope.settings.api_key = getQueryVariable(login_path,'code');
                    $scope.get_token(getQueryVariable(login_path,'code'));
                    fb_window.close();
                }
            });
        }

    	$scope.startRequests = function(){    	 	
    		//graph.setAccessToken($scope.settings.api_key);            
    		$rootScope.searching = true;
    		sendRequest();
    		$scope.interval = $interval(function(){
    			sendRequest();
    		},$scope.settings.loop * 1000)
    	 	
    	 }
     	$scope.endRequests = function(){    	 	
						
			$rootScope.searching = false;
    		$interval.cancel($scope.interval);
    	 	
    	}

        $scope.openKeyInfo = function (size) {
           var modalInstance = $modal.open({
                templateUrl: 'app/templates/modal.html',
                controller: 'FbTokenCtrl',
                size: size,
            });
        };

        $scope.openEventInfo = function (size) {
           var modalInstance = $modal.open({
                templateUrl: 'app/templates/fbeventid.html',
                controller: 'FbTokenCtrl',
                size: size,
            });
        };

        function getQueryVariable(url,variable)
        {
               var query = url.search.substring(1);
               var vars = query.split("&");
               for (var i=0;i<vars.length;i++) {
                       var pair = vars[i].split("=");
                       if(pair[0] == variable){return pair[1];}
               }
               return(false);
        }
    	function sendRequest () {
            var defUrl = "https:/graph.facebook.com/v2.3"
            var access_token = '?access_token=' + $scope.settings.api_key;
            var url = defUrl + '/' + $scope.settings.event+'/feed' + access_token + '&format=json';
            $http.get(url)
            .success(function(res){
                $rootScope.$broadcast('messages',res);     
            })
            .error(function(err){
                console.log(err);
                alert("ERROR WITH ACCESS KEY, probably expired...");
                $scope.endRequests();
            })

    	}
    }]);

    app.controller('FbTokenCtrl',['$scope',function($scope){

        $scope.openLink = function(link){
            gui.Shell.openExternal(link);
        }

    }]);

    return angularAMD.bootstrap(app);

});