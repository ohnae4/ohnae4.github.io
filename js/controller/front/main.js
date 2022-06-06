(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		
		$scope.page = {
			idx : 0	
		};
		$scope.visualList = [
			{url : '/img/visual/bg.png'},
			{url : '/img/visual/bg.png'}
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

		$scope.initLoad = $scope.loadComplete();
		// $('#main').stellar();

	}]);
})(window,window.angular);