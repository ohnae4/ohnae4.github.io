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
    	//예약보기
    	$scope.reservation = null;
    	$scope.getReservation = function(n){
    		$http.jsonp(kaisaApi.getMobydicReservation + $scope.jsonpParam({RESERVATION_NUMBER : n})).success(function(data){
				if(data.success){
					$scope.reservation = data.items[0];
					$scope.REPLY.RESERVATION_NUMBER = $scope.reservation.RESERVATION_NUMBER;
					$scope.REPLY.MEMBER_NAME = $scope.reservation.MEMBER_NAME;
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
		$scope.getReservationList = function() {
			$http.jsonp(kaisaApi.getMobydicReservationList + $scope.jsonpParam($scope.RESERVATION)).success(function(data){
				console.log(data);
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
						$scope.reservation = data.items[0];
						$scope.layerPwd.active = false;
						$scope.REPLY.RESERVATION_NUMBER = $scope.reservation.RESERVATION_NUMBER;
						$scope.REPLY.MEMBER_NAME = $scope.reservation.MEMBER_NAME;
						$scope.getReservationReplyList();
						$timeout(function(){
							$(window).scrollTop(angular.element('.reservation').offset().top - 50);
						},100);
					}else{
						$scope.layerPwd.failCount++;
						$scope.layerPwd.model.PASSWORD = '111999';
					}
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