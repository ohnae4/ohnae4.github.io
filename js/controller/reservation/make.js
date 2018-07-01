(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$filter','kaisaApi','$httpParamSerializerJQLike','$http','dateFilter','kaisaParam',function($scope,$filter,kaisaApi,$httpParamSerializerJQLike,$http,dateFilter,kaisaParam){
		
		$scope.typeCode =  [
			{no: '1', name: '원룸(침실)'},
			{no: '2', name: '방1+거실+화1'},
			{no: '3', name: '원룸(온돌)'},
	    ];
		
		$scope.roomArray = [
			{
				ROOM_NUMBER : '1',
				ROOM_NAME : '다크엔젤',
				ROOM_TYPE_CODE : '1',
				ROOM_M2 : '12',
				MIN_PERSONNEL : '4',
				MAX_PERSONNEL : '6',
				PRICE_1 : '10',
				PRICE_2 : '11',
				PRICE_3 : '15',
				PRICE_4 : '12',
				PRICE_5 : '15',
				PRICE_6 : '18',
				PRICE_7 : '15',
				PRICE_8 : '18',
				PRICE_9 : '18',
				PRICE_ADD : '0',
				DESCRIPTION : '퀸베드,42TV,냉장고,에어컨,화장대,쿡탑,전기밥솥,취사도구,세면도구(샴푸,린스,비누,치약) 수건',
				PRIORITY : '1'
			},
			{
				ROOM_NUMBER : '2',
				ROOM_NAME : '화이트샤인',
				ROOM_TYPE_CODE : '1',
				ROOM_M2 : '12',
				MIN_PERSONNEL : '4',
				MAX_PERSONNEL : '6',
				PRICE_1 : '10',
				PRICE_2 : '11',
				PRICE_3 : '15',
				PRICE_4 : '12',
				PRICE_5 : '15',
				PRICE_6 : '18',
				PRICE_7 : '15',
				PRICE_8 : '18',
				PRICE_9 : '18',
				PRICE_ADD : '0',
				DESCRIPTION : '퀸베드,42TV,냉장고,에어컨,화장대,쿡탑,전기밥솥,취사도구,세면도구(샴푸,린스,비누,치약) 수건',
				PRIORITY : '2'
			},
			{
				ROOM_NUMBER : '3',
				ROOM_NAME : '핑크레이디',
				ROOM_TYPE_CODE : '1',
				ROOM_M2 : '11',
				MIN_PERSONNEL : '2',
				MAX_PERSONNEL : '2',
				PRICE_1 : '7',
				PRICE_2 : '8',
				PRICE_3 : '11',
				PRICE_4 : '9',
				PRICE_5 : '11',
				PRICE_6 : '15',
				PRICE_7 : '12',
				PRICE_8 : '15',
				PRICE_9 : '15',
				PRICE_ADD : '0',
				DESCRIPTION : '퀸베드,42TV,냉장고,에어컨,화장대,쿡탑,전기밥솥,취사도구,세면도구(샴푸,린스,비누,치약) 수건',
				PRIORITY : '3'
			},
			{
				ROOM_NUMBER : '4',
				ROOM_NAME : '라임오렌지',
				ROOM_TYPE_CODE : '2',
				ROOM_M2 : '13',
				MIN_PERSONNEL : '4',
				MAX_PERSONNEL : '6',
				PRICE_1 : '9',
				PRICE_2 : '10',
				PRICE_3 : '14',
				PRICE_4 : '11',
				PRICE_5 : '14',
				PRICE_6 : '17',
				PRICE_7 : '14',
				PRICE_8 : '17',
				PRICE_9 : '17',
				PRICE_ADD : '0',
				DESCRIPTION : '퀸베드,TV,냉장고,에어컨,화장대,전기밥솥,취사도구,세면도구(샴푸,린스,비누,치약) 수건',
				PRIORITY : '4'
			},
			{
				ROOM_NUMBER : '5',
				ROOM_NAME : '블루밍',
				ROOM_TYPE_CODE : '2',
				ROOM_M2 : '13',
				MIN_PERSONNEL : '4',
				MAX_PERSONNEL : '6',
				PRICE_1 : '9',
				PRICE_2 : '10',
				PRICE_3 : '14',
				PRICE_4 : '11',
				PRICE_5 : '14',
				PRICE_6 : '17',
				PRICE_7 : '14',
				PRICE_8 : '17',
				PRICE_9 : '17',
				PRICE_ADD : '0',
				DESCRIPTION : 'TV,냉장고,에어컨,화장대,전기밥솥,취사도구,세면도구(샴푸,린스,비누,치약) 수건',
				PRIORITY : '5'
			},
			{
				ROOM_NUMBER : '6',
				ROOM_NAME : '산들바람',
				ROOM_TYPE_CODE : '3',
				ROOM_M2 : '10',
				MIN_PERSONNEL : '4',
				MAX_PERSONNEL : '6',
				PRICE_1 : '6',
				PRICE_2 : '7',
				PRICE_3 : '11',
				PRICE_4 : '11',
				PRICE_5 : '12',
				PRICE_6 : '15',
				PRICE_7 : '12',
				PRICE_8 : '15',
				PRICE_9 : '15',
				PRICE_ADD : '0',
				DESCRIPTION : 'TV,냉장고,에어컨,화장대,전기밥솥,취사도구,세면도구(샴푸,린스,비누,치약) 수건',
				PRIORITY : '6'
			}
		];
		$scope.ROOM_BASE = null;
		$scope.ROOM_BASE_IDX = -1;
		$scope.roomArraySelect = function(n){
			$scope.ROOM_BASE_IDX = n;
			$scope.ROOM_BASE = $scope.roomArray[n];
		};
		//객실추가
		$scope.setRoom = function() {
			$http.jsonp(kaisaApi.setRoom + $scope.jsonpParam($scope.ROOM_BASE)).success(function(data){
		        console.log(data);
		    }).error(function(data){
		    	$scope.alert.open({message : '객실추가 실패.'});
		    	$scope.loading.active = false;
		    });
		};
		
	}]);
})(window,window.angular);