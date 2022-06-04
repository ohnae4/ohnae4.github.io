(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		
		$scope.page = {
			idx : 0	
		};
		
		/* 메인비주얼
		$scope.visualList = [
			{url : '/img/main/visual3.jpg'},
			{url : '/img/main/visual4.jpg'},
			{url : '/img/main/visual5.jpg'},
			{url : '/img/main/visual2.jpg'}
			
		];
		$scope.visual = {
			idx : 0,
			total : $scope.visualList.length,
			click : function(idx){ this.idx = idx; },
			prev : function(){(0 < this.idx) ? this.idx-- : this.idx = this.total - 1;},
			next : function(){(this.total > this.idx + 1) ? this.idx++ : this.idx = 0;}
		};
		$scope.visualInterval;
		$scope.visualIntervalStart = function(){
			$scope.visualInterval = $interval(function(){
				$scope.visual.next();
			},2000);
		}
		$scope.visualIntervalStop = function(){
			$interval.cancel($scope.visualInterval);
		};
		$scope.visualIntervalStart();
		*/
		$scope.initLoad = $scope.loadComplete();


		$.stellar({
			horizontalScrolling: false,
			verticalOffset: 40
		});
		
	}]);
})(window,window.angular);