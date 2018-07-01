(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'admin.mobydic.co.kr',
			ext = constant.extension.api;
		
		this.getLogin = apiUrl + '/api/user/getLogin.php' + ext;
		this.getRoomList = apiUrl + '/api/riverhill/getRoomList.php' + ext;
		this.setRoom = apiUrl + '/api/riverhill/setRoom.php' + ext;
		
		this.getReservationList = apiUrl + '/api/riverhill/getReservationList.php' + ext;
		this.setReservation = apiUrl + '/api/riverhill/setReservation.php' + ext;
		
    }]);
})(window, window.angular);