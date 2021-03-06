(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','layerDatePicker']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
		$scope.option = {
		    pay : [
		    	{val : '1', name : '예약중'},
		    	{val : '2', name : '결제완료'},
		    	{val : '3', name : '취소'}
		    ]
		};
		//reservationPaging
		
		
		/*<!-- data-ng-value="reservationDate.start.selectDate | date : 'yyyy-MM-dd'" -->
		$rootScope.$watch('reservationDate.start.selectDate', function(val){
			$scope.loading = loading;
			if(loading.status == 419){ // session error
        		$scope.commonLink('login',{returnURL : location.href},'move');
        		$scope.loading.active = false;
        	}
			if(loading.status != 200){
        		console.debug('error : ' + loading.status);
        		$scope.loading.active = false;
        	}			
			if(loading.first){
				$scope.historyChecker();
			}
        },true);*/
		
		
    	$scope.reservationPaging = {
	    	orderBy: null,
			search: {
				RESERVATION_NUMBER : '',
				VISIT_DATE : ''
			},
			reset : function(){
				$scope.reservationPaging.RESERVATION_NUMBER = '';
				$scope.reservationPaging.VISIT_DATE = '';
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
    	//예약보기
    	$scope.RESERVATION = null;
    	$scope.getReservation = function(n){
    		$http.jsonp(kaisaApi.getMobydicReservation + $scope.jsonpParam({RESERVATION_NUMBER : n})).success(function(data){
				if(data.success){
					$scope.RESERVATION = data.items[0];
					$scope.REPLY.RESERVATION_NUMBER = $scope.RESERVATION.RESERVATION_NUMBER;
					$scope.REPLY.MEMBER_NAME = $scope.RESERVATION.MEMBER_NAME;
					$scope.getReservationReplyList();
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
    	$scope.updatePayStatusCode = {
    		callback : function(){
    			$http.jsonp(kaisaApi.updatePayStatusCode + $scope.jsonpParam({PAY_STATUS_CODE : $scope.RESERVATION.PAY_STATUS_CODE, RESERVATION_NUMBER : $scope.RESERVATION.RESERVATION_NUMBER})).success(function(data){
    				if(data.success){
    					$scope.alert.open({message : data.message });
    					$scope.reload();
    				}
    		    }).error(function(data){
    		    	$scope.alert.open({message : '예약상태 변경을 실패하였습니다.'});
    		    	$scope.loading.active = false;
    		    });
    		},
    		click : function(no){
    			if($scope.RESERVATION.PAY_STATUS_CODE){
    				$scope.alert.open({message : '예약상태를 변경하시겠습니까?' , confirm : true, callback : $scope.updatePayStatusCode.callback});
    			}
    		}
    	};
    	//예약목록삭제
    	$scope.deleteReservation = { //<!-- <button type="button" class="normal" data-ng-click="deleteReservation.click(i.RESERVATION_NUMBER)">삭제</button> -->
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteMobydicReservation + $scope.jsonpParam({ RESERVATION_NUMBER : $scope.deleteReservation.no })).success(function(data){
    				if(data.success){
    					$scope.getReservationList();
    				}else{
    					$scope.alert.open({message : data.message});
    				}
    				$scope.loading.active = false
    		    }).error(function(data){
    		    	console.log('delete error');
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
		$scope.getReservationList = function(searchDate) {
			$http.jsonp(kaisaApi.getMobydicReservationList + $scope.jsonpParam({VISIT_DATE : (searchDate) ? searchDate : ''})).success(function(data){
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
		//비밀번호 확인
    	$scope.layerPwd = {
    		failCount : 0,
    		active : false,
    		model : {
    			RESERVATION_NUMBER : null,
    			PASSWORD : '111999'
    		},
    		open : function(n){
    			if($scope.admin.user){
    				$scope.getReservation(n);
    				return;
    			}
    			this.model.RESERVATION_NUMBER = n;
    			this.model.PASSWORD = '111999';
    			this.active = true;
    		},
    		close : function(n){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.getReservationPwdCheck + $scope.jsonpParam({RESERVATION_NUMBER : $scope.layerPwd.model.RESERVATION_NUMBER, PASSWORD : $scope.layerPwd.model.PASSWORD})).success(function(data){
					if(data.success){
						$scope.RESERVATION = data.items[0];
						$scope.layerPwd.active = false;
						$scope.REPLY.RESERVATION_NUMBER = $scope.RESERVATION.RESERVATION_NUMBER;
						$scope.REPLY.MEMBER_NAME = $scope.RESERVATION.MEMBER_NAME;
						$scope.getReservationReplyList();
						$timeout(function(){
							$(window).scrollTop(angular.element('.reservation').offset().top - 50);
						},100);
					}else{
						$scope.layerPwd.failCount++;
					}
					$scope.layerPwd.model.PASSWORD = '';
					if($scope.layerPwd.failCount > 2){
						$scope.alert.open({message : '총 3회 실패하셨습니다.', callback : $scope.reload});
					}
			    }).error(function(data){
			    	$scope.alert.open({message : '문의 조회를 실패하였습니다.'});
			    	$scope.loading.active = false;
			    });
    		}
    	};
    	//댓글
    	$scope.REPLY = {
	    	RESERVATION_REPLY_NUMBER : '',
	    	RESERVATION_NUMBER : '',
	    	MEMBER_NAME : '',
	    	CONTENT : '',
	    	CREATE_DATE : '',
	    	UPDATE_DATE : ''
    	};
    	$scope.replyList = [];
    	$scope.getReservationReplyList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getReservationReplyList + $scope.jsonpParam({ RESERVATION_NUMBER : $scope.REPLY.RESERVATION_NUMBER })).success(function(data){
				$scope.replyList = data.items;
				$scope.loading.active = false;
		    }).error(function(data){
		    	$scope.alert.open({message : '댓글 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.deleteReservationReply = {
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteReservationReply + $scope.jsonpParam({ RESERVATION_REPLY_NUMBER : $scope.deleteReservationReply.no })).success(function(data){
    				if(data.success){
    					$scope.getReservationReplyList();
    				}else{
    					$scope.alert.open({message : data.message});
    				}
    				$scope.loading.active = false
    		    }).error(function(data){
    		    	console.log('delete error');
    		    	$scope.loading.active = false;
    		    });
    		},
    		click : function(no){
    			
				this.no = no;
    			$scope.alert.open({message : '정말 삭제하시겠습니까?' , confirm : true, callback : $scope.deleteReservationReply.callback });
    		}
    	};
    	$scope.setReservationReply = function(){
    		if($scope.REPLY.CONTENT.length < 5){
    			$scope.alert.open({message : '5글자 이상 입력해주세요.'});
    			return;
    		}
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.setReservationReply + $scope.jsonpParam({ RESERVATION_NUMBER : $scope.REPLY.RESERVATION_NUMBER , MEMBER_NAME : ($scope.admin.user)? '관리자':$scope.REPLY.MEMBER_NAME , CONTENT : $scope.REPLY.CONTENT })).success(function(data){
				$scope.loading.active = false;
				$scope.REPLY.CONTENT = '';
				$scope.getReservationReplyList();
		    }).error(function(data){
		    	$scope.alert.open({message : '댓글 입력 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
	}]);
})(window,window.angular);