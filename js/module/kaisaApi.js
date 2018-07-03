(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'admin.mobydic.co.kr',
			ext = constant.extension.api;
		
		this.getLogin = apiUrl + '/api/user/getLogin.php' + ext;
		this.getLogout = apiUrl + '/api/user/getLogout.php' + ext;
		this.getLoginCheck = apiUrl + '/api/user/getLoginCheck.php' + ext;
		
		this.getRoomList = apiUrl + '/api/riverhill/getRoomList.php' + ext;
		this.setRoom = apiUrl + '/api/riverhill/setRoom.php' + ext;
		
		this.getReservationList = apiUrl + '/api/riverhill/getReservationList.php' + ext;
		this.setReservation = apiUrl + '/api/riverhill/setReservation.php' + ext;
		this.updateReservation = apiUrl + '/api/riverhill/updateReservation.php' + ext;
		
    }]);
})(window, window.angular);