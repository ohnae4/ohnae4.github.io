(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);
	
	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
    	
		$scope.qnaSearchParam = {
			searchYear: $filter('date')(new Date(),'yyyy'),
			searchMonth: $filter('date')(new Date(),'MM'),
			limitPage: '100',
			currentPage: '1'
		};
		//문의리스트
    	$scope.qnaList = {};
    	$scope.getQnaList = function(){
    		$scope.loading.active = true;

			$http.post(kaisaApi.qna.getQnaList, $scope.qnaSearchParam, $scope.postConfig).then(function(resp){
				if(resp.data && resp.data.success){
					console.log(resp);
					$scope.qnaList = resp.data.items;
					$scope.loading.active = false
				}else{
					console.log(resp);
					$scope.alert.open({message: resp.data.message});
				}
			}, function(e){
				console.log(e);
			});

    	};
    	$scope.getQnaList();

		/**
    	 * QNA
    	 */
    	$scope.QNA = {
    		QNA_NUMBER: null,
    		QNA_NUMBER: null,
			MEMBER_NAME: '',
			MEMBER_PHONE: '',
			MEMBER_EMAIL: '',
			PASSWORD: '',
			SUBJECT: '.',
			CONTENT: ''
		};
    	
    	//문의하기
    	$scope.layerQna = {
    		active: false,
    		close: function(){
    			this.active = false;
    		},
    		submit: function(){
				$http.post(kaisaApi.qna.setQna, $scope.QNA, $scope.postConfig).then(function(resp){
					if(resp.data && resp.data.success){
						$scope.alert.open({message: resp.data.message, callback: $scope.reload});
					}else{
						$scope.alert.open({message: resp.data.message});
					}
				}, function(e){
					console.log(e);
				});
    		}
    	};
		// 답변확인팝업
    	$scope.layerMyQna = {
    		active: false,
    		close: function(){
    			this.active = false;
    		},
    		submit: function(){
				$http.post(kaisaApi.qna.setQna, $scope.QNA, $scope.postConfig).then(function(resp){
					if(resp.data && resp.data.success){
						$scope.alert.open({message: resp.data.message, callback: $scope.reload});
					}else{
						$scope.alert.open({message: resp.data.message});
					}
				}, function(e){
					console.log(e);
				});
    		}
    	};
    	
    	//비밀번호 확인
    	$scope.MYQNA = {};
    	$scope.layerPwd = {
    		failCount: 0,
    		active: false,
    		model: {
    			QNA_NUMBER: null,
    			PASSWORD: ''
    		},
    		open: function(n){
    			this.model.QNA_NUMBER = n;
    			this.model.PASSWORD = '';
    			this.active = true;
    		},
    		close: function(n){
    			this.active = false;
    		},
    		submit: function(){
				$http.post(kaisaApi.qna.getQnaPwdCheck, $scope.layerPwd.model, $scope.postConfig).then(function(resp){
					if(resp.data && resp.data.success){
						$scope.MYQNA = resp.data.items[0];
						$scope.layerMyQna.active = true;
						$scope.layerPwd.active = false;
						$scope.loading.active = false
					}else{
						$scope.alert.open({message: resp.data.message});
						$scope.loading.active = false
						// $scope.alert.open({message: '총 3회 실패하셨습니다.', callback: $scope.reload});
					}
				}, function(e){
					console.log(e);
				});
    		}
    	};

		$scope.initLoad = $scope.loadComplete();
	}]);
})(window,window.angular);