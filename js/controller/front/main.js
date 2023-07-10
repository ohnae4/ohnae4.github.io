(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		
		$scope.page = {
			idx : 0	
		};
		// 메인 팝업 
    	$scope.mainPopup = {
    		active: true,
    		close: function(){
    			this.active = false;
    		},
			open: function(price){
    			this.active = true;
    		}
		};
		// 메인 오픈이벤트 
    	$scope.openEvent = {
    		active: true,
    		close: function(){
    			this.active = false;
    		},
			open: function(price){
    			this.active = true;
    		}
		};
		// 메인 조은마트 픽업 
    	$scope.martPickup = {
    		active: true,
    		close: function(){
    			this.active = false;
    		},
			open: function(price){
    			this.active = true;
    		}
		};
		$scope.visualList = [
			{url : '/img/visual/large/o5.png'},
			{url : '/img/visual/large/o4.png'},
			{url : '/img/visual/large/o1.png'},
			//{url : '/img/visual/large/o2.png'},
			{url : '/img/visual/large/o7.png'}
			/* {url : '/img/visual/large/o3.png'} */
			//{url : '/img/visual/large/o6.png'},
			// {url : '/img/visual/large/o8.png'}
		];
		$scope.imgList = [
			{url : '/img/visual/large/a1.png'},
			{url : '/img/visual/large/a6.png'},
			{url : '/img/visual/large/i2.png'},
			{url : '/img/visual/large/i3.png'},
			{url : '/img/visual/large/i4.png'},
			{url : '/img/visual/large/i5.png'},
			{url : '/img/visual/large/i7.png'},
			{url : '/img/visual/large/i13.png'},
			{url : '/img/visual/large/a3.png'},
			{url : '/img/visual/large/ac4.png'},
			{url : '/img/visual/large/a5.png'},
			{url : '/img/visual/large/i6.png'}
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