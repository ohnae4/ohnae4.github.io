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
		this.setRoom = apiUrl + '/api/controller/riverhill/room/setRoom.php' + ext; //admin
		
		this.getReservationList = apiUrl + '/api/controller/riverhill/reservation/getReservationList.php' + ext;
		this.setReservation = apiUrl + '/api/controller/riverhill/reservation/setReservation.php' + ext;
		this.updateReservation = apiUrl + '/api/controller/riverhill/reservation/updateReservation.php' + ext; //admin
		this.deleteReservation = apiUrl + '/api/controller/riverhill/reservation/deleteReservation.php' + ext; //admin
		
		this.getQna = apiUrl + '/api/controller/riverhill/qna/getQna.php' + ext; //admin
		this.getQnaList = apiUrl + '/api/controller/riverhill/qna/getQnaList.php' + ext;
		this.getQnaPwdCheck = apiUrl + '/api/controller/riverhill/qna/getQnaPwdCheck.php' + ext;
		this.setQna = apiUrl + '/api/controller/riverhill/qna/setQna.php' + ext;
		this.deleteQna = apiUrl + '/api/controller/riverhill/qna/deleteQna.php' + ext; //admin
		
		this.deleteQnaReply = apiUrl + '/api/controller/riverhill/qna/deleteQnaReply.php' + ext; //admin
		this.setQnaReply = apiUrl + '/api/controller/riverhill/qna/setQnaReply.php' + ext;
		this.getQnaReplyList = apiUrl + '/api/controller/riverhill/qna/getQnaReplyList.php' + ext;
		
		this.getFaqList = apiUrl + '/api/controller/riverhill/faq/getFaqList.php' + ext;
		this.setFaq = apiUrl + '/api/controller/riverhill/faq/setFaq.php' + ext; //admin
		this.deleteFaq = apiUrl + '/api/controller/riverhill/faq/deleteFaq.php' + ext; //admin

		this.setNotice = apiUrl + '/api/controller/riverhill/notice/setNotice.php' + ext;
		this.getNotice = apiUrl + '/api/controller/riverhill/notice/getNotice.php' + ext;
		this.getNoticeList = apiUrl + '/api/controller/riverhill/notice/getNoticeList.php' + ext;
		this.deleteNotice = apiUrl + '/api/controller/riverhill/notice/deleteNotice.php' + ext; //admin
		
		this.getMobydicReservationList = apiUrl + '/api/controller/mobydic/reservation/getReservationList.php' + ext;
		this.getMobydicReservation = apiUrl + '/api/controller/mobydic/reservation/getReservation.php' + ext;
		this.setMobydicReservation = apiUrl + '/api/controller/mobydic/reservation/setReservation.php' + ext;
		this.updateMobydicReservation = apiUrl + '/api/controller/mobydic/reservation/updateReservation.php' + ext; //admin
		this.deleteMobydicReservation = apiUrl + '/api/controller/mobydic/reservation/deleteReservation.php' + ext; //admin
		this.getReservationPwdCheck = apiUrl + '/api/controller/mobydic/reservation/getReservationPwdCheck.php' + ext; //admin
		
		this.deleteReservationReply = apiUrl + '/api/controller/mobydic/reservation/deleteReservationReply.php' + ext; //admin
		this.setReservationReply = apiUrl + '/api/controller/mobydic/reservation/setReservationReply.php' + ext;
		this.getReservationReplyList = apiUrl + '/api/controller/mobydic/reservation/getReservationReplyList.php' + ext;
		this.updatePayStatusCode = apiUrl + '/api/controller/mobydic/reservation/updatePayStatusCode.php' + ext;
		
    }]);
})(window, window.angular);