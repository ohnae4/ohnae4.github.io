(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);
	
	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
    	
		$scope.roomList = []; // 객실정보 
		// 객실정보 ----------------------------
		$http.post(kaisaApi.room.getRoomList, {}, $scope.postConfig).then(function(resp){
			if(resp.data && resp.data.success){
				//console.log(resp);
				$scope.roomList = resp.data.items;
			}else{
				$scope.alert.open({message: resp.data.message});
			}
		}, function(e){
			console.log(e);
		});

		$scope.tab = {
			idx: 0,
			click: function(idx){
				this.idx = idx;
				angular.element('body,html').animate({scrollTop: 0});
			}
		}
		
		$scope.initLoad = $scope.loadComplete();
	}]);
})(window,window.angular);