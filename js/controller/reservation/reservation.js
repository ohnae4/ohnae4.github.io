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
		    selectDay : {},
		    selectRoom : {},
		    selectRoomOption : [],
		    tomorrowYn : false,
		    clickRoom : function(room,day){
		    	$scope.ROOM_RESERVATION.ROOM_NUMBER = room.ROOM_NUMBER;
		    	$scope.ROOM_RESERVATION.RESERVATION_DATE = $filter('date')($scope.rvCalendar.start.date,'yyyy-MM-dd');
		    	this.start.pick(day.idx);
		    	var tomorrow = new Date($scope.ROOM_RESERVATION.RESERVATION_DATE);
		    	tomorrow = tomorrow.setDate(tomorrow.getDate() + 1);
		    	//$scope.rvCalendar.tomorrowYn = true;
		    	for(var i in $scope.reservationList){
		    		if($scope.reservationList[i].RESERVATION_DATE == $filter('date')(tomorrow,'yyyy-MM-dd') && $scope.reservationList[i].ROOM_NUMBER == room.ROOM_NUMBER){
		    			$scope.rvCalendar.tomorrowYn = false;
		    		}
		    	}
		    	$scope.ROOM_RESERVATION.PRICE = room['PRICE_'+day.priceCode];
		    	$scope.layerReservation.active = true;
		    	this.selectRoom = room;
		    	this.selectDay = day;
		    	this.selectRoomOption = [];
		    	for(var i=room.MIN_PERSONNEL; i <= room.MAX_PERSONNEL; i++){
		    		this.selectRoomOption.push({personnel : i});
		    	}
		    	$scope.ROOM_RESERVATION.PERSONNEL_1 = this.selectRoomOption[0].personnel;
		    },
    		start : {
    			date : new Date(),
    			now : null,
    			peakCode : null, //1:준성수기, 2:성수기, 3:극성수기
    			today : function(){
    				return this.now.getDate()
    			},
    			month : null,
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
	                	this.day.push({peakCode : null, dayCode : null, idx : 0-i, date : getAddZero(0-i), list : [], reservation : []});
	                }
	                for (var i = 0 ; i < this.lastDay() ; i++) {
	                	var nowInt = parseInt($filter('date')($scope.rvCalendar.start.now,'yyyyMMdd'));
	                	var dateInt = parseInt($filter('date')($scope.rvCalendar.start.date,'yyyyMM') + getAddZero(i+1))
	                	var off = false;
	                	if(nowInt > dateInt){
	                		off = true;
	                	}
	                	var date = $filter('date')($scope.rvCalendar.start.date,'yyyy-MM') + '-' + getAddZero(i+1);
	                	var dayCode = new Date(date).getDay();
	                	var peakCode = 0;
	                	var priceCode = 0;
	                	if(date >= '2018-07-14' && date <= '2018-07-20'){
	                		peakCode = 1; //준성수기
	                	}else if(date >= '2018-07-21' && date <= '2018-08-14'){
	                		peakCode = 2; //성수기
	                	}else if(date >= '2018-08-15' && date <= '2018-08-18'){
	                		peakCode = 3; //극성수기
	                	}
	                	if(peakCode == 0){
	                		if(dayCode == 5){
	                			priceCode = 2;
	                		}else if(dayCode == 6){
	                			priceCode = 3;
	                		}else{
	                			priceCode = 1;
	                		}
	                	}else if(peakCode == 1){
	                		if(dayCode == 5){
	                			priceCode = 5;
	                		}else if(dayCode == 6){
	                			priceCode = 6;
	                		}else{
	                			priceCode = 4;
	                		}
	                	}else if(peakCode == 2 || peakCode == 3){
	                		if(dayCode == 5){
	                			priceCode = 8;
	                		}else if(dayCode == 6){
	                			priceCode = 9;
	                		}else{
	                			priceCode = 7;
	                		}
	                	}
	                	this.day.push({off : off, priceCode : priceCode, peakCode : peakCode, dayCode : dayCode, idx : i+1, date : getAddZero(i+1), list : $scope.roomList.items, reservation : []});
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
			MEMBER_EMAIL : '232@email.com',
			PASSWORD : '111',
			ROOM_STATUS_CODE : 2,
			DESCRIPTION : '',
			DATE_NUMBER : '1',
			PERSONNEL_1 : null,
			PERSONNEL_2 : 0,
			PRICE : 0,
			CAPTCHA_CODE : ''
		};

    	$scope.$watch('ROOM_RESERVATION.PERSONNEL_1', function(val){
    		if(val){
    			var int = parseInt(val) - parseInt($scope.rvCalendar.selectRoom.MIN_PERSONNEL);
    			var price = parseInt($scope.rvCalendar.selectRoom['PRICE_'+ $scope.rvCalendar.selectDay.priceCode]);
    			$scope.ROOM_RESERVATION.PRICE = price + int;
    		}
        },true);

    	$scope.$watch('ROOM_RESERVATION.DATE_NUMBER', function(val){
    		if(val){
    			var int = parseInt($scope.ROOM_RESERVATION.PERSONNEL_1) - parseInt($scope.rvCalendar.selectRoom.MIN_PERSONNEL);
    			var price = parseInt($scope.rvCalendar.selectRoom['PRICE_'+ $scope.rvCalendar.selectDay.priceCode]);
    			$scope.ROOM_RESERVATION.PRICE = (price + int) * parseInt(val);
    		}
        },true);

    	$scope.layerReservation = {
    		active : false,
    		close : function(){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.setReservation + $scope.jsonpParam($scope.ROOM_RESERVATION)).success(function(data){
					if(data.success){
						$scope.getReservationList();
						$scope.layerReservation.close();
					}else{
						$scope.alert.open({message : data.message});
					}
			    }).error(function(data){
			    	$scope.alert.open({message : '예약할 수 없는 날짜 입니다.'});
			    	$scope.loading.active = false;
			    });
    		}
    	};
    	//paging
    	$scope.paging = {
	    	orderBy: null,
			search: {
				ROOM_NUMBER : '',
				RESERVATION_DATE : '',
				RESERVATION_NUMBER : '',
				ROOM_STATUS_CODE : ''
			},
			reset : function(){
				$scope.paging.search.ROOM_NUMBER = '';
				$scope.paging.search.RESERVATION_DATE = '';
				$scope.paging.search.RESERVATION_NUMBER = '';
				$scope.paging.search.ROOM_STATUS_CODE = '';
				$scope.paging.currentPage = 0;
			},
			sorting: function(key){
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
		//객실 예약정보
    	$scope.reservationList = {};
    	$scope.getReservationList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getReservationList + $scope.jsonpParam({ searchDateYear : $filter('date')($scope.rvCalendar.start.date,'yyyy') , searchDateMonth : $filter('date')($scope.rvCalendar.start.date,'MM') })).success(function(data){
				$scope.reservationList = data.items;
				$scope.rvCalendar.start.date = new Date(data.date);
				$scope.rvCalendar.start.now = new Date(data.now);
				$scope.rvCalendar.init();
				$scope.rvCalendar.start.month = $filter('date')($scope.rvCalendar.start.date,'MM');
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
    	$scope.deleteReservation = { //<!-- <button type="button" class="normal" data-ng-click="deleteReservation.click(i.RESERVATION_NUMBER)">삭제</button> -->
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