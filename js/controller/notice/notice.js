(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);
	
	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
    	/**
    	 * NOTICE
    	 */
    	$scope.NOTICE = {
    		NOTICE_NUMBER : null,
			SUBJECT : '공지사항제목입니다.',
			CONTENT : '공지사항내용입니다공지사항내용입니다공지사항내용입니다공지사항내용입니다공지사항내용입니다'
		};
    	//공지사항등록
    	$scope.layerNotice = {
    		active : false,
    		close : function(){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.setNotice + $scope.jsonpParam($scope.NOTICE)).success(function(data){
					if(data.success){
						$scope.getNoticeList();
						$scope.layerNotice.close();
					}else{
						$scope.alert.open({message : data.message});
					}
			    }).error(function(data){
			    	$scope.alert.open({message : '예약할 수 없는 날짜 입니다.'});
			    	$scope.loading.active = false;
			    });
    		}
    	};
    	//noticePaging
    	$scope.noticePaging = {
	    	orderBy: null,
			search: {
				SUBJECT : '',
				NOTICE_NUMBER : ''
			},
			reset : function(){
				$scope.noticePaging.SUBJECT = '';
				$scope.noticePaging.NOTICE_NUMBER = '';
				$scope.noticePaging.currentPage = 0;
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
				return Math.ceil($scope.noticeList.length / this.pageSize);
			}
    	};
    	//공지사항보기
    	$scope.notice = null;
    	$scope.getNotice = function(n){
    		$http.jsonp(kaisaApi.getNotice + $scope.jsonpParam({NOTICE_NUMBER : n})).success(function(data){
				if(data.success){
					$scope.notice = data.items[0];
					$timeout(function(){
						$(window).scrollTop(angular.element('.notice').offset().top - 50);
					},100);
				}else{
					$scope.alert.open({message : data.message });
				}
		    }).error(function(data){
		    	$scope.alert.open({message : '공지사항 조회를 실패하였습니다.'});
		    	$scope.loading.active = false;
		    });
    	};
		//공지사항리스트
    	$scope.noticeList = {};
    	$scope.getNoticeList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getNoticeList + $scope.jsonpParam({  })).success(function(data){
				$scope.noticeList = data.items;
				$scope.loading.active = false
		    }).error(function(data){
		    	$scope.alert.open({message : '공지사항리스트 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.getNoticeList();
    	//공지사항삭제
    	$scope.deleteNotice = { //<!-- <button type="button" class="normal" data-ng-click="deleteNotice.click(i.NOTICE_NUMBER)">삭제</button> -->
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteNotice + $scope.jsonpParam({ NOTICE_NUMBER : $scope.deleteNotice.no })).success(function(data){
    				$scope.getNoticeList();
    				$scope.loading.active = false
    		    }).error(function(data){
    		    	console.log('update error');
    		    	$scope.loading.active = false;
    		    });
    		},
    		click : function(no){
				this.no = no;
    			$scope.alert.open({message : '정말 삭제하시겠습니까?' , confirm : true, callback : $scope.deleteNotice.callback});
    		}
    	};
	}]);
})(window,window.angular);