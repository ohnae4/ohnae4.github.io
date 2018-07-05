(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
		var getAddZero = function(n){
			return n < 10 ? '0' + n : ''+n;
		};
		//rvCalendar
    	$scope.rvCalendar = {
			init : function(){
		        for (var i in this) {
		            if (typeof this[i] == 'object') {
		            	this[i].parent = this;
		            }
		        }
                this.start.makeDays();
		        this.start.selectIdx = this.start.today();
		        return this;
		    },
		    clickRoom : function(n,i){
		    	this.start.pick(i);
		    	$scope.ROOM_RESERVATION.ROOM_NUMBER = n;
		    	$scope.ROOM_RESERVATION.RESERVATION_DATE = $filter('date')($scope.rvCalendar.start.date,'yyyy-MM-dd');
		    	$scope.layerReservation.active = true;
		    },
    		start : {
    			date : new Date(),
    			now : null,
    			today : function(){
    				return this.now.getDate()
    			},
    			month : function(){
    				return this.date.getMonth()
    			},
    			firstDay  : function(){
    				return new Date(this.date.getFullYear(),this.date.getMonth()).getDay();
    			},
    			lastDay  : function(){
    				return new Date(this.date.getFullYear(),this.date.getMonth() + 1, 0).getDate();
    			},
    			dateHead : ['일','월','화','수','목','금','토'],
	            datePrev : function(){
	                this.date.setMonth(this.date.getMonth() - 1);                                
	                this.makeDays();
	                $scope.getReservationList();
	            },
	            dateNext : function(){
	            	this.date.setMonth(this.date.getMonth() + 1);
	            	this.makeDays();
	            	$scope.getReservationList();
	            },
	            pick : function(i){
	            	this.date.setDate(i);
	            	this.selectIdx = i;
	            	if(this.parent.startCallback){
	            		this.parent.startCallback();
	            	}
	            },
	            day : [],
    			makeDays : function(){
	                this.day = [];
	                for (var i = 0 ; i < this.firstDay() ; i++) {
	                	this.day.push({idx : 0-i, date : getAddZero(0-i), list : $scope.roomList.items, reservation : []});
	                }                
	                for (var i = 0 ; i < this.lastDay() ; i++) {
	                	this.day.push({idx : i+1, date : getAddZero(i+1), list : $scope.roomList.items, reservation : []});
	                }
	            },
	            selectDate : function(i){
    				return this.date.getYear() + this.date.getMonth() + this.date.getDate(i);
    			},
    			selectIdx : null
    		}
    	};
		
    	$scope.ROOM_RESERVATION = {
    		RESERVATION_NUMBER : null,
			RESERVATION_DATE : null,
			ROOM_NUMBER : null,
			MEMBER_NAME : '최재호',
			MEMBER_PHONE : '01055555552',
			PASSWORD : '111',
			ROOM_STATUS_CODE : 2,
			DESCRIPTION : '',
			DATE_NUMBER : 1,
			PERSONNEL_1 : 1,
			PERSONNEL_2 : 0,
			CAPTCHA_CODE : ''
		};
		
    	$scope.layerReservation = {
    		active : false,
    		close : function(){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.setReservation + $scope.jsonpParam($scope.ROOM_RESERVATION)).success(function(data){
			        //location.reload();
					$scope.getReservationList();
					$scope.layerReservation.close();
			    }).error(function(data){
			    	$scope.alert.open({message : '예약할 수 없는 날짜 입니다.'});
			    	$scope.loading.active = false;
			    });
    		}
    	};
		//객실 예약정보
    	$scope.reservationList = {};
    	$scope.getReservationList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getReservationList + $scope.jsonpParam({ searchDateYear : $filter('date')($scope.rvCalendar.start.date,'yyyy') , searchDateMonth : $filter('date')($scope.rvCalendar.start.date,'MM') })).success(function(data){
				$scope.reservationList = data.items;
				$scope.rvCalendar.start.date = new Date(data.date);
				$scope.rvCalendar.start.now = new Date(data.now);
				$scope.rvCalendar.init();
				for(var i in $scope.reservationList){
					$scope.reservationList[i].ROOM_STATUS_CODE_ORIGIN = $scope.reservationList[i].ROOM_STATUS_CODE;
					for(var j in $scope.rvCalendar.start.day){
						if($scope.reservationList[i].RESERVATION_DATE.substring(8,10) == $scope.rvCalendar.start.day[j].date){
							$scope.rvCalendar.start.day[j].reservation.push($scope.reservationList[i]);
						}
					}
				}
				$scope.loading.active = false
		    }).error(function(data){
		    	$scope.alert.open({message : '객실 예약정보 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.getReservationList();
    	$scope.updateReservation = function(no,code){
    		$http.jsonp(kaisaApi.updateReservation + $scope.jsonpParam({ RESERVATION_NUMBER : no , ROOM_STATUS_CODE : code })).success(function(data){
    			if(data.success){
    				$scope.alert.open({message : data.message});
    				$scope.getReservationList();
    			}else{
    				$scope.alert.open({message : data.message});
    			}
				$scope.loading.active = false
		    }).error(function(data){
		    	console.log('update error');
		    	$scope.loading.active = false;
		    });
    	};
    	
    	
    	$scope.deleteReservation = {
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteReservation + $scope.jsonpParam({ RESERVATION_NUMBER : $scope.deleteReservation.no })).success(function(data){
    				$scope.alert.open({message : data.message});
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
	}]);
})(window,window.angular);