(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('url', ['baseConstant']);
	
	app.service('kaisaUrl', ['constant',function(constant) {
		var protocol = (constant.host != '') ? 'http://' + constant.host : '',
			protocol_SSL = (constant.host != '') ? 'http://' + constant.host : '', //test https
			ext = constant.extension.link;
		
		this.main = protocol + '/' + ext;
		this.reservation = protocol + '/reservation' + ext;
		this.qna = protocol + '/qna' + ext;
		this.info = protocol + '/info' + ext;
		this.pension = protocol + '/pension' + ext;
		this.nearPension = protocol + '/nearPension' + ext;

		// admin
		this.adminLogin = '/admin/';
		this.adminReservation = '/admin/reservation';
		this.adminFaq = '/admin/faq';
		this.adminQna = '/admin/qna';
		this.adminNotice = '/admin/notice';
		this.adminHoliday = '/admin/holiday';
		
    }]);
})(window, window.angular);