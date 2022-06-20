(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
		var getAddZero = function(n){
			return n < 10 ? '0' + n: ''+n;
		};
		
		$scope.holidayList = []; // 휴일정보 
		$scope.reservationList = []; // 객실 예약정보

		$scope.roomList = []; // 객실정보 
		 // 객실정보 ----------------------------
		$http.post(kaisaApi.room.getRoomList, {}, $scope.postConfig).then(function(resp){
			if(resp.data && resp.data.success){
				//console.log(resp);
				$scope.roomList = resp.data.items;
				$scope.getReservationList();
			}else{
				$scope.alert.open({message: resp.data.message});
			}
		}, function(e){
			console.log(e);
		});
		
		//객실 예약정보
    	$scope.getReservationList = function(){
    		$scope.loading.active = true;
			$http.post(kaisaApi.reservation.getFrontReservationList,
				{
					searchYear: $filter('date')($scope.rvCalendar.start.date,'yyyy') ,
					searchMonth: $filter('date')($scope.rvCalendar.start.date,'MM')
				}
				, $scope.postConfig).then(function(resp){
				if(resp.data && resp.data.success){
					//console.log(resp);
					$scope.reservationList = resp.data.items;
					$scope.rvCalendar.start.date = new Date(resp.data.date);
					$scope.rvCalendar.start.now = new Date(resp.data.now); // 서버시간
					$scope.rvCalendar.init();
					$scope.rvCalendar.start.year = $filter('date')($scope.rvCalendar.start.date,'yyyy');
					$scope.rvCalendar.start.month = $filter('date')($scope.rvCalendar.start.date,'MM');
					for(var i in $scope.reservationList){
						$scope.reservationList[i].STATUS_CODE_ORIGIN = $scope.reservationList[i].STATUS_CODE;
						for(var j in $scope.rvCalendar.start.day){
							if($scope.reservationList[i].RESERVATION_DATE.substring(8,10) == $scope.rvCalendar.start.day[j].date){
								$scope.rvCalendar.start.day[j].reservation.push($scope.reservationList[i]);
							}
						}
					}
					$scope.getHolidayList(); // 휴일정보 
				}else{
					$scope.alert.open({message: resp.data.message});
					//$scope.alert.open({message: '예약할 수 없는 날짜 입니다.'});
				}
			}, function(e){
				console.log(e);
				$scope.loading.active = false;
			});
		}

		// 휴일정보  ----------------------------
		$scope.getHolidayList = function(){
			$http.post(kaisaApi.holiday.getHolidayList, {
					searchYear: $scope.rvCalendar.start.year,
					searchMonth: $scope.rvCalendar.start.month
				}, $scope.postConfig).then(function(response){
				if(response.data && response.data.success){
					// console.log(response); // 
					$scope.holidayList = response.data.items;
					for(var i in $scope.holidayList){
						$scope.holidayList[i].STATUS_CODE_ORIGIN = $scope.holidayList[i].STATUS_CODE;
						for(var j in $scope.rvCalendar.start.day){
							if($scope.holidayList[i].DAY_DATE.substring(8,10) == $scope.rvCalendar.start.day[j].date){
								// console.log($scope.rvCalendar.start.day[j].peakCode);  //1:비수기, 2:준성수기, 3:성수기, 4:극성수기
								// console.log($scope.rvCalendar.start.day[j].priceCode); //1:비수기주중요금,2:비수기금요일요금,3:비수기주말요금,4:준성수기주중요금,5:준성수기금요일요금,6:준성수기주말요금,7:성수기주중요금,8:성수기금요일요금,9:성수기주말요금,10:극성수기주중요금,11:극성수기금요일요금,12:극성수기주말요금
								if($scope.holidayList[i].PRICE){ // 휴일또는 특정일정보에 가격이 있으면 오버라이드...
									$scope.rvCalendar.start.day[j].price = $scope.holidayList[i].PRICE;
								}
								/**
								 * 휴일인경우 휴일전날을 금요일가격으로 간주(예외의 경우 특정일로 등록)
								 */
								if($scope.holidayList[i].HOLIDAY_CODE == '1') { // 1: 휴일 , 2: 특정일 
									switch ($scope.rvCalendar.start.day[j].peakCode) { //1:비수기,2:준성수기,3:성수기,4:극성수기
										case 1:
											// TODO 전날체크...
											$scope.rvCalendar.start.day[j-1].priceCode = 2 // 3:비수기금요일요금
											$scope.rvCalendar.start.day[j].priceCode = 3 // 3:비수기주말요금
											break;
										case 2:
											$scope.rvCalendar.start.day[j-1].priceCode = 5 // 6:준성수기금요일요금
											$scope.rvCalendar.start.day[j].priceCode = 6 // 6:준성수기주말요금
											break;
										case 3:
											$scope.rvCalendar.start.day[j-1].priceCode = 8 // 8:성수기금요일요금
											$scope.rvCalendar.start.day[j].priceCode = 9 // 9:성수기주말요금
											break;
										default: break;
									}
								}
								if($scope.holidayList[i].HOLIDAY_CODE == '2') { // 1: 휴일 , 2: 특정일 
									// 특정일은 가격덮기용
									// console.log($scope.holidayList[i].PRICE);
								}
								
								// 휴일정보
								$scope.rvCalendar.start.day[j].holiday.push($scope.holidayList[i]);
							}
						}
					}
				}else{
					$scope.alert.open({message: response.data.message});
				}
			}, function(e){
				console.log(e);
			});
		}

		//rvCalendar
    	$scope.rvCalendar = {
			init: function(){
		        for (var i in this) {
		            if (typeof this[i] == 'object') {
		            	this[i].parent = this;
		            }
		        }
                this.start.makeDays();
		        this.start.selectIdx = this.start.today();
		        return this;
		    },
		    selectDay: {},
		    selectRoom: {},
		    selectRoomOption: [],
		    tomorrowYn: false,
			isShowPrev: false,
			isShowNext: true,
		    clickRoom: function(room, day){
				var price = day.price;
				if(!price || price == '0') {
					price = room['PRICE_' + day.priceCode];
				}
		    	$scope.RESERVATION.ROOM_NUMBER = room.ROOM_NUMBER;
		    	$scope.RESERVATION.RESERVATION_DATE = $filter('date')($scope.rvCalendar.start.date,'yyyy-MM-') + day.date;
		    	this.start.pick(day.idx);
		    	var tomorrow = new Date($scope.RESERVATION.RESERVATION_DATE);
		    	tomorrow = tomorrow.setDate(tomorrow.getDate() + 1);
		    	//$scope.rvCalendar.tomorrowYn = true;
		    	for(var i in $scope.reservationList){
		    		if($scope.reservationList[i].RESERVATION_DATE == $filter('date')(tomorrow,'yyyy-MM-dd') && $scope.reservationList[i].ROOM_NUMBER == room.ROOM_NUMBER){
		    			$scope.rvCalendar.tomorrowYn = false;
		    		}
		    	}
		    	$scope.layerReservation.open(price);
		    	this.selectRoom = room;
		    	this.selectDay = day;
		    },
    		start: {
    			date: new Date(),
    			now: new Date(),
    			peakCode: null, //1:비수기, 2:준성수기, 3:성수기, 4:극성수기
    			today: function(){
    				return this.now.getDate()
    			},
				idx: null,
				click: function(day){
					this.idx = day.idx;
					$scope.layerRoom.open(day);
				},
    			month: null,
    			firstDay : function(){
    				return new Date(this.date.getFullYear(),this.date.getMonth()).getDay();
    			},
    			lastDay : function(){
    				return new Date(this.date.getFullYear(),this.date.getMonth() + 1, 0).getDate();
    			},
	            datePrev: function(){
	                this.date.setMonth(this.date.getMonth() - 1);
	                this.makeDays();
	                $scope.getReservationList();
	            },
	            dateNext: function(){
	            	this.date.setMonth(this.date.getMonth() + 1);
	            	this.makeDays();
	            	$scope.getReservationList();
	            },
	            pick: function(i){
	            	this.date.setDate(i);
	            	this.selectIdx = i;
	            	if(this.parent.startCallback){
	            		this.parent.startCallback();
	            	}
	            },
	            day: [],
    			makeDays: function(){
					// 날짜 이동제어 
					var nowMonth = parseInt($filter('date')($scope.rvCalendar.start.now,'yyyyMM'))
					var targetMonth = parseInt($filter('date')($scope.rvCalendar.start.date,'yyyyMM'))
					if(nowMonth - targetMonth > -3){
						$scope.rvCalendar.isShowNext = true;
					} else {
						$scope.rvCalendar.isShowNext = false;
					}
					if(nowMonth < targetMonth){
						$scope.rvCalendar.isShowPrev = true;
					} else {
						$scope.rvCalendar.isShowPrev = false;
					}
					// 달력 그리기 시작 
	                this.day = [];
	                for (var i = 0 ; i < this.firstDay() ; i++) {
	                	this.day.push({
							peakCode: null,
							dayCode: null,
							idx: 0-i,
							date: getAddZero(0-i),
							list: [],
							reservation: [],
							holiday: [],
							price: 0
						});
	                }
	                for (var i = 0 ; i < this.lastDay() ; i++) {
	                	var nowInt = parseInt($filter('date')($scope.rvCalendar.start.now,'yyyyMMdd'));
	                	var dateInt = parseInt($filter('date')($scope.rvCalendar.start.date,'yyyyMM') + getAddZero(i+1))
	                	var off = false;
	                	if(nowInt > dateInt){
	                		off = true;
	                	}
	                	var fullDate = $filter('date')($scope.rvCalendar.start.date,'yyyy-MM') + '-' + getAddZero(i+1); //yyy-MM-dd
	                	var date = $filter('date')($scope.rvCalendar.start.date,'MM') + '-' + getAddZero(i+1); //MM-dd
	                	var dayCode = new Date(fullDate).getDay(); //요일 0:일,1:월,2:화,3:수,4:목,5:금,6:토 
	                	var peakCode = 1; //비수기

						if(date >= $scope.code.dateArr2.startDate && date <= $scope.code.dateArr2.endDate){
	                		peakCode = 2; //준성수기
	                	}
						if(date >= $scope.code.dateArr3.startDate && date <= $scope.code.dateArr3.endDate){
	                		peakCode = 3; //성수기
	                	}
						var priceCode = $scope.getPriceCode(peakCode, dayCode);

	                	this.day.push({
							off: off, 
							priceCode: priceCode, 
							peakCode: peakCode,
							dayCode: dayCode, 
							idx: i+1, 
							date: getAddZero(i+1), 
							list: $scope.roomList, 
							reservation: [],
							holiday: [],
							price: 0
						});
	                }
	            },
	            selectDate: function(i){
    				return this.date.getYear() + this.date.getMonth() + this.date.getDate(i);
    			},
    			selectIdx: null
    		}
    	};

		$scope.getPriceCode = function(peakCode, dayCode){
			var priceCode = 0;
			switch (peakCode) { //1:비수기,2:준성수기,3:성수기,4:극성수기
				case 1:
					switch (dayCode) { //dayCode 0:일,1:월,2:화,3:수,4:목,5:금,6:토 
						case 5: priceCode = 2; break; // 비수기 금요일요금 
						case 6: priceCode = 3; break; // 비수기 주말요금 (토)
						case 0: priceCode = 2; break; // 비수기 주말요금 (일)
						default: priceCode = 1; break; // 비수기 주중요금 
					}
					break;
				case 2:
					switch (dayCode) {
						case 5: priceCode = 5; break; // 준성수기 금요일요금 
						case 6: priceCode = 6; break; // 준성수기 주말요금 (토) 
						case 0: priceCode = 5; break; // 준성수기 주말요금 (일) 
						default: priceCode = 4; break; // 준성수기 주중요금 
					}
					break;
				case 3:
					switch (dayCode) {
						case 5: priceCode = 8; break; // 성수기 금요일요금 
						case 6: priceCode = 9; break; // 성수기 주말요금 (토) 
						case 0: priceCode = 8; break; // 성수기 주말요금 (일) 
						default: priceCode = 7; break; // 성수기 주중요금 
					}
					break;
				default: break;
			}
			return priceCode;
		};

    	$scope.RESERVATION = {
    		RESERVATION_NUMBER: null,
			RESERVATION_DATE: null,
			ROOM_NUMBER: null,
			PRICE: 0,
			MEMBER_NAME: '',
			MEMBER_PHONE: '',
			MEMBER_EMAIL: '',
			PASSWORD: '',
			STATUS_CODE: '1',
			DESCRIPTION: '',
			ADD_COUNT_1: '0', // 추가인원
			ADD_COUNT_2: '0', // 바베큐
			ADD_COUNT_3: '0', // 온수
			ADD_COUNT_4: '0',
			ADD_COUNT_5: '0',
			CAPTCHA_CODE: '',
			PRICE_SUM: 0,
			PRICE_ADD_1: 0,
			PRICE_ADD_2: 0,
			PRICE_ADD_3: 0
		};

		// 인원 금액 
		$scope.$watch('RESERVATION.ADD_COUNT_1', function(val){
    		if(val){
				if(!$scope.RESERVATION.ROOM_NUMBER) {
					return;
				}
				for (var i in $scope.roomList) {
					// $scope.roomList[i].MAX_PERSONNEL: "10"
					// $scope.roomList[i].MIN_PERSONNEL: "5"
					if($scope.RESERVATION.ROOM_NUMBER == $scope.roomList[i].ROOM_NUMBER){
						$scope.RESERVATION.PRICE_ADD_1 = parseInt($scope.roomList[i].PRICE_ADD_1 * val);
						break;
					}
				}
				$scope.RESERVATION.PRICE_SUM = parseInt($scope.RESERVATION.PRICE) + parseInt($scope.RESERVATION.PRICE_ADD_1) + parseInt($scope.RESERVATION.PRICE_ADD_2) + parseInt($scope.RESERVATION.PRICE_ADD_3)
    		}
        },true);

		// 바베큐추가 금액 
		$scope.$watch('RESERVATION.ADD_COUNT_2', function(val){
    		if(val){
				if(!$scope.RESERVATION.ROOM_NUMBER) {
					return;
				}
				for (var i in $scope.roomList) {
					if($scope.RESERVATION.ROOM_NUMBER == $scope.roomList[i].ROOM_NUMBER){
						$scope.RESERVATION.PRICE_ADD_2 = parseInt($scope.roomList[i].PRICE_ADD_2 * val);
						break;
					}
				}
				$scope.RESERVATION.PRICE_SUM = parseInt($scope.RESERVATION.PRICE) + parseInt($scope.RESERVATION.PRICE_ADD_1) + parseInt($scope.RESERVATION.PRICE_ADD_2) + parseInt($scope.RESERVATION.PRICE_ADD_3)
    		}
        },true);

		// 온수추가 금액 
		$scope.$watch('RESERVATION.ADD_COUNT_3', function(val){
    		if(val){
				if(!$scope.RESERVATION.ROOM_NUMBER) {
					return;
				}
				for (var i in $scope.roomList) {
					if($scope.RESERVATION.ROOM_NUMBER == $scope.roomList[i].ROOM_NUMBER){
						$scope.RESERVATION.PRICE_ADD_3 = parseInt($scope.roomList[i].PRICE_ADD_3 * val);
						break;
					}
				}
				$scope.RESERVATION.PRICE_SUM = parseInt($scope.RESERVATION.PRICE) + parseInt($scope.RESERVATION.PRICE_ADD_1) + parseInt($scope.RESERVATION.PRICE_ADD_2) + parseInt($scope.RESERVATION.PRICE_ADD_3)
    		}
        },true);

		// 예약팝업 
    	$scope.layerReservation = {
    		active: false,
    		close: function(){
    			this.active = false;
    		},
			open: function(price){
    			this.active = true;
				$scope.RESERVATION.PRICE = price;
				$scope.RESERVATION.PRICE_SUM = price;
    		},
    		submit: function(){
				if(!($scope.RESERVATION.CAPTCHA_CODE == $scope.captcha.code)) {
					$scope.alert.open({message: '자동등록방지번호가 잘못되었습니다.'});
					return false;
				}
				$http.post(kaisaApi.reservation.setReservation, 
					{
						RESERVATION_NUMBER: $scope.RESERVATION.RESERVATION_NUMBER,
						RESERVATION_DATE: $scope.RESERVATION.RESERVATION_DATE,
						ROOM_NUMBER: $scope.RESERVATION.ROOM_NUMBER,
						PRICE: $scope.RESERVATION.PRICE_SUM,
						MEMBER_NAME: $scope.RESERVATION.MEMBER_NAME,
						MEMBER_PHONE: $scope.RESERVATION.MEMBER_PHONE,
						MEMBER_EMAIL: $scope.RESERVATION.MEMBER_EMAIL,
						PASSWORD: $scope.RESERVATION.PASSWORD,
						STATUS_CODE: $scope.RESERVATION.STATUS_CODE,
						DESCRIPTION: $scope.RESERVATION.DESCRIPTION,
						ADD_COUNT_1: $scope.RESERVATION.ADD_COUNT_1, // 추가인원
						ADD_COUNT_2: $scope.RESERVATION.ADD_COUNT_2, // 바베큐
						ADD_COUNT_3: $scope.RESERVATION.ADD_COUNT_3 // 온수
					}
					, $scope.postConfig).then(function(resp){
					if(resp.data && resp.data.success){
						// console.log(resp);
						$scope.alert.open({message: '정상적으로 예약되었습니다.', callback: $scope.reload});
					}else{
						$scope.alert.open({message: resp.data.message});
						//$scope.alert.open({message: '예약할 수 없는 날짜 입니다.'});
					}
				}, function(e){
					console.log(e);
					$scope.loading.active = false;
				});
    		}
    	};
		// 객실선택팝업 
    	$scope.layerRoom = {
    		active: false,
			day: null,
    		close: function(){
    			this.active = false;
    		},
			open: function(day){
    			this.active = true;
				this.day = day;
    		}
    	};
	 	$scope.initLoad = $scope.loadComplete();
	}]);
})(window,window.angular);