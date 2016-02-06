define(['angularAMD', '../nwjs/nwWindow', 'moment'], function(angularAMD, nwWindow, moment) {

    var gui = require('nw.gui');

    var app = angular.module("ticketApp", ['ngAnimate', 'ngAudio', 'ui.bootstrap']);
    app.controller('TopCtrl', ['$scope',
        function($scope) {
            $scope.maximize = false;
            $scope.exit = function() {
                nwWindow.close();
            };
            $scope.minimise = function() {
                nwWindow.minimize();
            };
            $scope.expand = function() {
                if ($scope.maximize) {
                    nwWindow.unmaximize();
                    $scope.maximize = false;
                } else {
                    nwWindow.maximize();
                    $scope.maximize = true;
                }
            };
        }
    ]);

    app.controller('EventCtrl', ['$scope',
        function($scope) {

            $scope.$on('event_info', function(event, data) {
                $scope.fb_event = data;
            });

            $scope.coverImage = function() {
                if ($scope.fb_event === undefined) return;
                if ($scope.fb_event.cover) {
                    return $scope.fb_event.cover.source;
                }
                return 'img/event_default.png';
            };

        }
    ]);


    app.controller('MessageCtrl', ['$scope', 'ngAudio', '$rootScope',
        function($scope, ngAudio, $rootScope) {
            $scope.sound = ngAudio.load("app/alarm.ogg");
            $scope.triggers = ["säljer", "säljes", "kränga", "kränger", "kvarn"];
            $scope.messages = [];

            $scope.$on('messages', function(event, data) {
                angular.forEach(data.data, function(obj) {
                    if (obj.message !== undefined) {
                        if (triggers(obj.message) && !alreadyExists(obj)) {
                            $scope.messages.push(obj);
                            $scope.sound.play();
                            $rootScope.$broadcast('send-comment', obj);
                            //$rootScope.$broadcast('send-sms', obj);
                        }
                    }
                });
            });

            $scope.$on('clear_messages', function(event) {
                $scope.messages = [];
            });

            $scope.fromNow = function(message) {
                return moment(message.created_time).fromNow();
            };

            $scope.openLink = function(message) {
                gui.Shell.openExternal(message.actions[0].link);
            };

            $scope.getEventName = function() {
                if ($scope.messages.length > 0) {
                    return $scope.messages[0].to.data[0].name;
                }
                return "";
            };

            $scope.ShowNoMessages = function(searching) {
                if ($scope.messages.length === 0 && searching) {
                    return true;
                }
                return false;
            };

            function alreadyExists(message) {
                for (var i = 0; i < $scope.messages.length; i++) {
                    var msg = $scope.messages[i];
                    if (msg.id == message.id) {
                        return true;
                    }
                }
                return false;
            }

            function triggers(str) {

                for (var i = 0; i < $scope.triggers.length; i++) {
                    var word = $scope.triggers[i];
                    var re = new RegExp(word, "i");
                    if (str.search(re) > -1) {
                        return true;
                    }
                }
                return false;
            }
        }
    ]);

    app.controller('SettingsCtrl', ['$rootScope', '$scope', '$interval', '$http', '$modal', 'facebook',
        function($rootScope, $scope, $interval, $http, $modal, facebook) {
            $scope.settings = {};
            $scope.user = {};
            $scope.settings.loop = 10;
            $scope.settings.send_comment = false;
            $scope.interval = null;

            var fbURL = 'https://graph.facebook.com/v2.3/';
            var appid = "710824895663274";
            var redirect_uri = "https://www.facebook.com/connect/login_success.html";
            var secret = "55767825ca6ddd8b36ef1b0329211a02";
            $scope.get_token = function(code) {
                facebook.get_token(code)
                    .success(function(res) {
                        $scope.settings.api_key = res.access_token;
                        $scope.get_me();
                    })
                    .error(function(err) {
                        console.log(err);
                    });
            };

            $scope.get_me = function() {
                if ($scope.settings.api_key) {
                    facebook.me($scope.settings.api_key)
                        .success(function(res) {
                            $scope.user = res;
                            facebook.get_user_events($scope.user.id, $scope.settings.api_key)
                                .success(function(res) {
                                    $scope.user_events = res.data;
                                })
                                .error(function(err) {
                                    console.log(err);
                                });
                        })
                        .error(function(err) {
                            console.log(err);
                        });
                }
            };

            $scope.login = function() {
                var t_url = 'https://www.facebook.com/dialog/oauth?client_id=' + appid + '&redirect_uri=' + redirect_uri + '&scope=user_events,public_profile,publish_actions';
                var fb_window = gui.Window.open(t_url);
                fb_window.on('loaded', function() {
                    var login_path = fb_window.window.location;
                    if (getQueryVariable(login_path, 'code') !== false) {
                        $scope.settings.api_key = getQueryVariable(login_path, 'code');
                        $scope.get_token(getQueryVariable(login_path, 'code'));
                        fb_window.close();
                    }
                });
            };

            $scope.startRequests = function() {
                $scope.endRequests(); //Call this incase old request are active.
                $rootScope.searching = true;
                sendRequest();

                facebook.get_event($scope.settings.event, $scope.settings.api_key)
                    .success(function(res) {
                        $rootScope.$broadcast('event_info', res);
                    })
                    .error(function(err) {
                        console.log(err);
                    });

                $scope.interval = $interval(function() {
                    sendRequest();
                }, $scope.settings.loop * 1000);
            };
            $scope.$on('send-comment', function(event, msgObj) {
                if ($scope.settings.send_comment) {
                    facebook.send_comment($scope.settings.api_key, msgObj, "Köper!").success(function(res) {
                        console.log(res);
                    }).error(function(err) {
                        console.log(err);
                    });
                }
            });
            $scope.$on('send-sms', function(event, msgObj) {
                if ($scope.settings.phone.length > 8) {
                    //var api_key =
                    //var URL = 'http://sms.inleed.se/skickaSMS/?nummer=0101010101&text=Meddelande&nyckel=XXX';
                    var URL = 'http://textbelt.com/intl';

                    var data = {
                        'number': $scope.settings.phone,
                        'message': msgObj.message
                    };

                    /*$http.post(URL, data).success(function(res) {
                        console.log(res);
                    }).error(function(err) {
                        console.log(err);
                    });*/
                    //$http.get()
                }
            });

            $scope.endRequests = function() {
                $rootScope.searching = false;
                $interval.cancel($scope.interval);
            };

            $scope.openEventInfo = function(size) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/templates/fbeventid.html',
                    controller: 'FbTokenCtrl',
                    size: size,
                });
            };

            function getQueryVariable(url, variable) {
                var query = url.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == variable) {
                        return pair[1];
                    }
                }
                return (false);
            }

            function sendRequest() {

                facebook.get_feed($scope.settings.event, $scope.settings.api_key)
                    .success(function(res) {
                        $rootScope.$broadcast('messages', res);
                    })
                    .error(function(err) {
                        console.log(err);
                        alert("ERROR WITH ACCESS KEY, probably expired...");
                        $scope.endRequests();
                    });

            }
        }
    ]);

    app.controller('FbTokenCtrl', ['$scope',
        function($scope) {

            $scope.openLink = function(link) {
                gui.Shell.openExternal(link);
            };

        }
    ]);

    app.factory('facebook', ['$http',
        function($http) {
            var facebook = {};
            var fbURL = "https:/graph.facebook.com/v2.3/";
            var appid = "710824895663274";
            //var appid = "964747870270974"; //TEST
            var redirect_uri = "https://www.facebook.com/connect/login_success.html";
            var secret = "55767825ca6ddd8b36ef1b0329211a02";
            //var secret = "0ed97d9d7cadfa95654e98f00fe30c71"; //TEST

            facebook.me = function(token) {
                return $http.get(fbURL + 'me/?fields=picture,id,name&access_token=' + token);
            };

            facebook.get_token = function(code) {
                //var scopes = 'user_events,public_profile,publish_actions';
                var url = fbURL + 'oauth/access_token?client_id=' + appid;
                url += '&redirect_uri=' + redirect_uri;
                url += '&client_secret=' + secret;
                url += '&code=' + code;
                //url += '&granted_scopes=' + scopes;
                return $http.get(url);
            };

            facebook.send_comment = function(token, fbObj, msg) {
                console.log(fbObj);
                return $http.post(fbURL + fbObj.id + "/comments" + '?access_token=' + token, {
                    'message': msg
                });
            };

            facebook.get_feed = function(event, token) {
                return $http.get(fbURL + event + '/feed' + '?access_token=' + token);
            };

            facebook.get_event = function(event, token) {
                return $http.get(fbURL + event + '?fields=id,name,cover,description&access_token=' + token);
            };

            facebook.get_user_events = function(user, token) {
                return $http.get(fbURL + 'me/events?access_token=' + token);
            };

            return facebook;
        }
    ]);

    return angularAMD.bootstrap(app);

});
