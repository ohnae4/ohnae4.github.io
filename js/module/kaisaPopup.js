(function(window, angular, undefined){
	'use strict';
	var app = angular.module('popup',['common']);
	app.directive('popupQna',['$http','kaisaApi',function($http, kaisaApi){
    	return {
    		templateUrl : '/html/popup/popupQna.html',
    		replace : true,
    		link: function($scope, el, attrs){
				$scope.setQnaReply = function(){
					$http.post(kaisaApi.admin.setQnaReply, {
						'QNA_NUMBER': $scope.popup.param.QNA_NUMBER,
						'REPLY_CONTENT': $scope.popup.param.REPLY_CONTENT
					}, $scope.postConfig).then(function(resp){
						if(resp.data && resp.data.success){
							//$scope.popup.close({target: 'popupQna'});
							$scope.reload();
						}else{
							$scope.alert.open({message: resp.data.message});
						}
					}, function(e){
						console.log(e);
					});
				}
			}
    	}
    }]);
	app.directive('popupFaq',['$http','kaisaApi',function($http, kaisaApi){
    	return {
    		templateUrl : '/html/popup/popupFaq.html',
    		replace : true,
    		link: function($scope, el, attrs){
				$scope.setFaq = function(){
					$http.post(kaisaApi.admin.setFaq, {
						'FAQ_NUMBER': $scope.popup.param.FAQ_NUMBER,
						'QUESTION': $scope.popup.param.QUESTION,
						'ANSWER': $scope.popup.param.ANSWER
					}, $scope.postConfig).then(function(resp){
						if(resp.data && resp.data.success){
							//$scope.popup.close({target: 'popupQna'});
							$scope.reload();
						}else{
							$scope.alert.open({message: resp.data.message});
						}
					}, function(e){
						console.log(e);
					});
				}
			}
    	}
    }]);
	app.directive('popupNotice',['$http','kaisaApi',function($http, kaisaApi){
    	return {
    		templateUrl : '/html/popup/popupNotice.html',
    		replace : true,
    		link: function($scope, el, attrs){
				$scope.setNotice = function(){
					$http.post(kaisaApi.admin.setNotice, {
						'NOTICE_NUMBER': $scope.popup.param.NOTICE_NUMBER,
						'SUBJECT': $scope.popup.param.SUBJECT,
						'CONTENT': $scope.popup.param.CONTENT
					}, $scope.postConfig).then(function(resp){
						if(resp.data && resp.data.success){
							//$scope.popup.close({target: 'popupQna'});
							$scope.reload();
						}else{
							$scope.alert.open({message: resp.data.message});
						}
					}, function(e){
						console.log(e);
					});
				}
			}
    	}
    }]);
	app.directive('popupColumn',['constant',function(constant){
		return {
			templateUrl : '/html/popup/popupColumn.html',
			replace : true,
			link: function($scope, el, attrs){}
		}
	}]);
})(window, window.angular);