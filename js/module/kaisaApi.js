(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'ohnae3.cafe24.com',
			ext = constant.extension.api;
		
		this.getLogin = apiUrl + '/api/controller/kaisa/user/getLogin' + ext;
		this.getLogout = apiUrl + '/api/controller/kaisa/user/getLogout' + ext;
		this.getLoginCheck = apiUrl + '/api/controller/kaisa/user/getLoginCheck' + ext;
		
		this.getRoomList = apiUrl + '/api/controller/riverhill/room/getRoomList' + ext;
		this.setRoom = apiUrl + '/api/controller/riverhill/room/setRoom' + ext; //admin
		
		this.getReservationList = apiUrl + '/api/controller/riverhill/reservation/getReservationList' + ext;
		this.setReservation = apiUrl + '/api/controller/riverhill/reservation/setReservation' + ext;
		this.updateReservation = apiUrl + '/api/controller/riverhill/reservation/updateReservation' + ext; //admin
		this.deleteReservation = apiUrl + '/api/controller/riverhill/reservation/deleteReservation' + ext; //admin
		
		this.getQna = apiUrl + '/api/controller/riverhill/qna/getQna' + ext; //admin
		this.getQnaList = apiUrl + '/api/controller/riverhill/qna/getQnaList' + ext;
		this.getQnaPwdCheck = apiUrl + '/api/controller/riverhill/qna/getQnaPwdCheck' + ext;
		this.setQna = apiUrl + '/api/controller/riverhill/qna/setQna' + ext;
		this.deleteQna = apiUrl + '/api/controller/riverhill/qna/deleteQna' + ext; //admin
		
		this.deleteQnaReply = apiUrl + '/api/controller/riverhill/qna/deleteQnaReply' + ext; //admin
		this.setQnaReply = apiUrl + '/api/controller/riverhill/qna/setQnaReply' + ext;
		this.getQnaReplyList = apiUrl + '/api/controller/riverhill/qna/getQnaReplyList' + ext;
		
		this.getFaqList = apiUrl + '/api/controller/riverhill/faq/getFaqList' + ext;
		this.setFaq = apiUrl + '/api/controller/riverhill/faq/setFaq' + ext; //admin
		this.deleteFaq = apiUrl + '/api/controller/riverhill/faq/deleteFaq' + ext; //admin

		this.setNotice = apiUrl + '/api/controller/riverhill/notice/setNotice' + ext;
		this.getNotice = apiUrl + '/api/controller/riverhill/notice/getNotice' + ext;
		this.getNoticeList = apiUrl + '/api/controller/riverhill/notice/getNoticeList' + ext;
		this.deleteNotice = apiUrl + '/api/controller/riverhill/notice/deleteNotice' + ext; //admin
		
		this.getMobydicReservationList = apiUrl + '/api/controller/mobydic/reservation/getReservationList' + ext;
		this.getMobydicReservation = apiUrl + '/api/controller/mobydic/reservation/getReservation' + ext;
		this.setMobydicReservation = apiUrl + '/api/controller/mobydic/reservation/setReservation' + ext;
		this.updateMobydicReservation = apiUrl + '/api/controller/mobydic/reservation/updateReservation' + ext; //admin
		this.deleteMobydicReservation = apiUrl + '/api/controller/mobydic/reservation/deleteReservation' + ext; //admin
		this.getReservationPwdCheck = apiUrl + '/api/controller/mobydic/reservation/getReservationPwdCheck' + ext; //admin
		
		this.deleteReservationReply = apiUrl + '/api/controller/mobydic/reservation/deleteReservationReply' + ext; //admin
		this.setReservationReply = apiUrl + '/api/controller/mobydic/reservation/setReservationReply' + ext;
		this.getReservationReplyList = apiUrl + '/api/controller/mobydic/reservation/getReservationReplyList' + ext;
		this.updatePayStatusCode = apiUrl + '/api/controller/mobydic/reservation/updatePayStatusCode' + ext;
		
    }]);
})(window, window.angular);