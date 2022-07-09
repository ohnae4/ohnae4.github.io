(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('baseConstant', []);
	app.factory('constant', ['$http','$filter',function($http,$filter) {
		return {
			dateVersion : $filter('date')(new Date(),'yyyyMMddHHmm'), //10분단위로 클라이언트 캐시 삭제
			version : '0.0.2', //version 업데이트시 sessionStorage 캐시 삭제
			host : '',
			dev : (location.host == 'kaisa.co.kr') ? false : true,
			title     : 'kaisa',
			//minRoot : (gulpYn) ? '/min/' : '/', 
			keywords : 'chlois',
			description : 'chlois',
			favicon : '/img/favicon.ico',
			domain : '',
			image : {
				noImage : '/img/common/noImage.png',
				host : '//gi.esmplus.com/ohnae2/chlois', // //gi.esmplus.com/ohnae2/chlois  location.protocol + '//' + 'kaisa.co.kr' ,
				XL : '_1040',
				L : '_256',
				M : '_130',
				S : '_90'
			},
			extension : {
				api : '.php',
				data : '.data',
				link : ''
			},
			dateFormat : 'yyyy-MM-dd hh:mm:ss'
		}
    }]);
})(window, window.angular);