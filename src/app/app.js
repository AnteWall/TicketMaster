define(['angularAMD','../nwjs/nwWindow'], function (angularAMD,nwWindow) {

	var gui = require('nw.gui');

    var app = angular.module("ticketApp", ['ngAnimate','ngAudio']);
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
	    				console.log("adding", obj);	    				
	    				$scope.messages.push(obj);                        
                        $scope.sound.play();
	    			}
    			}
    		});
    		//$scope.$apply();

    	});

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

    app.controller('SettingsCtrl',['$rootScope','$scope','$interval','$http', 
    	function($rootScope,$scope,$interval,$http){
    	$scope.settings = {};
    	$scope.settings.api_key = "CAACEdEose0cBAGNMTzWtR5w4Rtma2xVIXZCuYZCTOIMrzWEKN6xZBQDMlv3IPUX6I54r1vpvRdHZA9JHeCrxZC46gjHkdZAIIiu68ZCvMIJPvGoflfyVJtQmcZA42RPY13ZBcMNe9eXQ3XfNpWOrzn5yFZAK9uJ2tMxAZAC2LiQMatoDRn22sDEZC5iGGyhqUN3SZBUUFlDQNEt9dgnIGYnt4A4oN";
    	$scope.settings.event = "1584013525204819";
	    $scope.settings.loop = 10;
	    $scope.interval;
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

    	function sendRequest () {
            var defUrl = "https:/graph.facebook.com/v2.3"
            var access_token = '?access_token=' + $scope.settings.api_key;
            var url = defUrl + '/' + $scope.settings.event+'/feed' + access_token + '&format=json';
            $http.get(url)
            .success(function(res){
                $rootScope.$broadcast('messages',res);     
            })
            .error(function(err){
                alert("ERROR WITH ACCESS KEY, probably expired...");
                $scope.endRequests();
            })

    	}
    }]);

    return angularAMD.bootstrap(app);

});