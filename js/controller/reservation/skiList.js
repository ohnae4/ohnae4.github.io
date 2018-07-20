(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','datePicker']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
		
		
		
		//reservationPaging
    	$scope.reservationPaging = {
	    	orderBy: null,
			search: {
				RESERVATION_NUMBER : ''
			},
			reset : function(){
				$scope.reservationPaging.RESERVATION_NUMBER = '';
				$scope.reservationPaging.currentPage = 0;
			},
			sorting : function(key){
				if(this.orderBy == key){
					this.orderBy = '-' + key;
					return;
				}
				this.orderBy = '' + key;
			},
			currentPage : 0,
			pageSize : 10,
			numberOfPages : function(){
				return Math.ceil($scope.reservationList.length / this.pageSize);
			}
    	};
    	//공지사항보기
    	$scope.reservation = null;
    	$scope.getReservation = function(n){
    		$http.jsonp(kaisaApi.getReservation + $scope.jsonpParam({RESERVATION_NUMBER : n})).success(function(data){
				if(data.success){
					$scope.reservation = data.items[0];
					$timeout(function(){
						$(window).scrollTop(angular.element('.reservation').offset().top - 50);
					},100);
				}else{
					$scope.alert.open({message : data.message });
				}
		    }).error(function(data){
		    	$scope.alert.open({message : '예약목록 조회를 실패하였습니다.'});
		    	$scope.loading.active = false;
		    });
    	};
    	//예약목록삭제
    	$scope.deleteReservation = { //<!-- <button type="button" class="normal" data-ng-click="deleteReservation.click(i.RESERVATION_NUMBER)">삭제</button> -->
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteReservation + $scope.jsonpParam({ RESERVATION_NUMBER : $scope.deleteReservation.no })).success(function(data){
    				$scope.getReservationList();
    				$scope.loading.active = false
    		    }).error(function(data){
    		    	console.log('update error');
    		    	$scope.loading.active = false;
    		    });
    		},
    		click : function(no){
				this.no = no;
    			$scope.alert.open({message : '정말 삭제하시겠습니까?' , confirm : true, callback : $scope.deleteReservation.callback});
    		}
    	};
		//예약목록조회
		$scope.reservationList = null;
		$scope.getReservationList = function() {
			$http.jsonp(kaisaApi.getMobydicReservationList + $scope.jsonpParam($scope.RESERVATION)).success(function(data){
				if(data.success){
					$scope.reservationList = data.items;
				}else{
					$scope.alert.open({message : data.message});
				}
		    }).error(function(data){
		    	$scope.alert.open({message : '목록 조회 실패'});
		    	$scope.loading.active = false;
		    });
		};
		$scope.getReservationList();
	}]);
})(window,window.angular);