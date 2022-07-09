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

		$scope.page = {
			idx : 0	
		};
		$scope.visualList1 = [
			{url : '/img/visual/large/a1.png'},
			{url : '/img/visual/large/a2.png'},
			{url : '/img/visual/large/i2.png'},
			{url : '/img/visual/large/i3.png'},
			{url : '/img/visual/large/i4.png'},
			{url : '/img/visual/large/i5.png'},
			{url : '/img/visual/large/i6.png'},
			{url : '/img/visual/large/i7.png'},
			{url : '/img/visual/large/i8.png'},
			{url : '/img/visual/large/i9.png'},
			{url : '/img/visual/large/i10.png'},
			{url : '/img/visual/large/i11.png'},
			{url : '/img/visual/large/i12.png'},
			{url : '/img/visual/large/i13.png'},
			{url : '/img/visual/large/i14.png'},
			{url : '/img/visual/large/i15.png'},
			{url : '/img/visual/large/i16.png'}
		];
		$scope.visualList2 = [
			{url : '/img/visual/large/b1.png'},
			{url : '/img/visual/large/i2.png'},
			{url : '/img/visual/large/i3.png'},
			{url : '/img/visual/large/i4.png'},
			{url : '/img/visual/large/i5.png'},
			{url : '/img/visual/large/i6.png'},
			{url : '/img/visual/large/i7.png'},
			{url : '/img/visual/large/i8.png'},
			{url : '/img/visual/large/i9.png'},
			{url : '/img/visual/large/i10.png'},
			{url : '/img/visual/large/i11.png'},
			{url : '/img/visual/large/i12.png'},
			{url : '/img/visual/large/i13.png'},
			{url : '/img/visual/large/i14.png'},
			{url : '/img/visual/large/i15.png'},
			{url : '/img/visual/large/i16.png'}
		];
		$scope.visualList3 = [
			{url : '/img/visual/large/c1.png'},
			{url : '/img/visual/large/i1.png'},
			{url : '/img/visual/large/i3.png'},
			{url : '/img/visual/large/i4.png'},
			{url : '/img/visual/large/i5.png'},
			{url : '/img/visual/large/i6.png'},
			{url : '/img/visual/large/i7.png'},
			{url : '/img/visual/large/i8.png'},
			{url : '/img/visual/large/i9.png'},
			{url : '/img/visual/large/i10.png'},
			{url : '/img/visual/large/i11.png'},
			{url : '/img/visual/large/i12.png'},
			{url : '/img/visual/large/i13.png'},
			{url : '/img/visual/large/i14.png'},
			{url : '/img/visual/large/i15.png'},
			{url : '/img/visual/large/i16.png'}
		];


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