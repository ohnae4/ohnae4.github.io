(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','datePicker']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
		
		
		/*
		 * date
		 * */
		$scope.date = {
			start : null,
			end : null
		}
		
		/*
		 * TEST date
		 * */
		$scope.option = {
			time : [
				{id: '7', name: '7시'},
				{id: '8', name: '8시'},
				{id: '9', name: '9시'},
				{id: '10', name: '10시'},
				{id: '11', name: '11시'},
				{id: '12', name: '12시'},
				{id: '13', name: '13시'},
				{id: '14', name: '14시'},
				{id: '15', name: '15시'},
				{id: '16', name: '16시'},
				{id: '17', name: '17시'},
				{id: '18', name: '18시'}
		    ]
		};
		
		//model
		$scope.RESERVATION = {
			MEMBER_NAME: '최재호',
            VISIT_DATE: '',
            VISIT_TIME: '12',
			PERSONNEL: '2',
			PICK_YN: 'N',
			MEMBER_PHONE: '01055556666',
			MEMBER_EMAIL: '234098@hanmail.net',
			DESCRIPTION: '안녕하세요',
			PASSWORD: '111999',
			PASSWORD2: '111999',
			PACKAGE_CODE : '3',
			PAY_STATUS_CODE : '1',
			CAPTCHA_CODE : ''
		};

		$scope.date.startDate = $filter('date')(new Date(),'yyyy-MM-dd')
		
		//예약 날짜
		$scope.$watch('reservationDate.start.date', function(val){
			if(val){
				$scope.date.startDate = $filter('date')(val,'yyyy-MM-dd');
				$scope.RESERVATION.VISIT_DATE = $filter('date')(val,'yyyy-MM-dd');
			}
        },true);
		
		//예약하기
		$scope.setMobydicReservation = function() {
			$http.jsonp(kaisaApi.setMobydicReservation + $scope.jsonpParam($scope.RESERVATION)).success(function(data){
				if(data.success){
					console.log(data);
				}else{
					$scope.alert.open({message : data.message});
				}
		    }).error(function(data){
		    	$scope.alert.open({message : '예약할 수 없는 날짜 입니다.'});
		    	$scope.loading.active = false;
		    });
		};
		
	}]);
})(window,window.angular);