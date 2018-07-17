(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);
	
	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
    	//QNA
    	$scope.QNA = {
    		QNA_NUMBER : null,
			MEMBER_NAME : '최재호',
			MEMBER_PHONE : '01055555552',
			MEMBER_EMAIL : '232@email.com',
			PASSWORD : '111',
			SUBJECT : '제목',
			CONTENT : '내용'
		};
    	//문의하기
    	$scope.layerQna = {
    		active : false,
    		close : function(){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.setQna + $scope.jsonpParam($scope.QNA)).success(function(data){
					if(data.success){
						$scope.getQnaList();
						$scope.layerQna.close();
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
				SUBJECT : '',
				CONTENT : ''
			},
			reset : function(){
				$scope.paging.SUBJECT = '';
				$scope.paging.CONTENT = '';
				$scope.paging.currentPage = 0;
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
				return Math.ceil($scope.qnaList.length / this.pageSize);
			}
    	};
    	//문의보기
    	$scope.qna = {};
    	$scope.getQna = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getQna + $scope.jsonpParam({ QNA_NUMBER : $scope.QNA.QNA_NUMBER })).success(function(data){
				$scope.qna = data.items;
				$scope.loading.active = false
		    }).error(function(data){
		    	$scope.alert.open({message : '문의 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
		//문의리스트
    	$scope.qnaList = {};
    	$scope.getQnaList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getQnaList + $scope.jsonpParam({  })).success(function(data){
				$scope.qnaList = data.items;
				$scope.loading.active = false
		    }).error(function(data){
		    	$scope.alert.open({message : '문의리스트 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.getQnaList();
    	//문의삭제
    	$scope.deleteQna = { //<!-- <button type="button" class="normal" data-ng-click="deleteQna.click(i.QNA_NUMBER)">삭제</button> -->
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteQna + $scope.jsonpParam({ QNA_NUMBER : $scope.deleteQna.no })).success(function(data){
					console.log(data);
    				$scope.alert.open({message : data.message});
    				$scope.getQnaList();
    				$scope.loading.active = false
    		    }).error(function(data){
    		    	console.log('update error');
    		    	$scope.loading.active = false;
    		    });
    		},
    		click : function(no){
				this.no = no;
				debugger;
    			$scope.alert.open({message : '정말 삭제하시겠습니까?' , confirm : true, callback : $scope.deleteQna.callback});
    		}
    	};
    	$scope.test = function(n){
    		console.log(n);
    	}
    	//비밀번호 확인
    	$scope.layerPwd = {
    		failCount : 0,
    		active : false,
    		model : {
    			QNA_NUMBER : null,
    			PASSWORD : null
    		},
    		open : function(n){
    			this.model.QNA_NUMBER = n;
    			this.model.PASSWORD = '';
    			this.active = true;
    		},
    		close : function(n){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.getQnaPwdCheck + $scope.jsonpParam({QNA_NUMBER : $scope.layerPwd.model.QNA_NUMBER, PASSWORD : $scope.layerPwd.model.PASSWORD})).success(function(data){
					if(data.success){
						$scope.qna = data.items[0];
						$scope.layerPwd.active = false;
					}else{
						$scope.layerPwd.failCount++;
						$scope.layerPwd.model.PASSWORD = '';
					}
					if($scope.layerPwd.failCount > 4){
						location.reload();
					}
					/*if(data.success){
						$scope.getQna();
						$scope.layerQna.close();
					}else{
						$scope.alert.open({message : data.message});
					}*/
			    }).error(function(data){
			    	$scope.alert.open({message : '문의 조회를 실패하였습니다.'});
			    	$scope.loading.active = false;
			    });
    		}
    	};
	}]);
})(window,window.angular);