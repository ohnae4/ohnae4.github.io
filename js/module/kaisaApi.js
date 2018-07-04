(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'admin.mobydic.co.kr',
			ext = constant.extension.api;
		
		this.getLogin = apiUrl + '/api/controller/kaisa/user/getLogin.php' + ext;
		this.getLogout = apiUrl + '/api/controller/kaisa/user/getLogout.php' + ext;
		this.getLoginCheck = apiUrl + '/api/controller/kaisa/user/getLoginCheck.php' + ext;
		
		this.getRoomList = apiUrl + '/api/controller/riverhill/room/getRoomList.php' + ext;
		this.setRoom = apiUrl + '/api/controller/riverhill/room/setRoom.php' + ext;
		
		this.getReservationList = apiUrl + '/api/controller/riverhill/reservation/getReservationList.php' + ext;
		this.setReservation = apiUrl + '/api/controller/riverhill/reservation/setReservation.php' + ext;
		this.updateReservation = apiUrl + '/api/controller/riverhill/reservation/updateReservation.php' + ext;
		
    }]);
})(window, window.angular);