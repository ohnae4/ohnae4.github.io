(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'ohnae3.cafe24.com/api/controller',
			ext = constant.extension.api;
		
		this.admin = {
			getReservationList : apiUrl + '/chloris/reservation/getReservationList' + ext,
			setReservationList : apiUrl + '/chloris/reservation/getReservationList' + ext
		};

		// auth
		this.auth = {
			getLogin : apiUrl + '/kaisa/user/getLogin' + ext
		};
		// faq
		this.faq = {
			deleteFaq : apiUrl + '/chloris/faq/deleteFaq' + ext,
			getFaqList : apiUrl + '/chloris/faq/getFaqList' + ext,
			setFaq : apiUrl + '/chloris/faq/setFaq' + ext,
			updateFaq : apiUrl + '/chloris/faq/updateFaq' + ext
		};
		// notice
		this.notice = {
			deleteNotice : apiUrl + '/chloris/notice/deleteNotice' + ext,
			getNotice : apiUrl + '/chloris/notice/getNotice' + ext,
			getNoticeList : apiUrl + '/chloris/notice/getNoticeList' + ext,
			setNotice : apiUrl + '/chloris/notice/setNotice' + ext,
			updateNotice : apiUrl + '/chloris/notice/updateNotice' + ext
		};
		// qna
		this.qna = {
			deleteQna : apiUrl + '/chloris/qna/deleteQna' + ext,
			deleteQnaReply : apiUrl + '/chloris/qna/deleteQnaReply' + ext,
			getQna : apiUrl + '/chloris/qna/getQna' + ext,
			getQnaList : apiUrl + '/chloris/qna/getQnaList' + ext,
			getQnaPwdCheck : apiUrl + '/chloris/qna/getQnaPwdCheck' + ext,
			getQnaReplyList : apiUrl + '/chloris/qna/getQnaReplyList' + ext,
			setQna : apiUrl + '/chloris/qna/setQna' + ext,
			setQnaReply : apiUrl + '/chloris/qna/setQnaReply' + ext
		};
		// reservation
		this.reservation = {
			deleteReservation : apiUrl + '/chloris/reservation/deleteReservation' + ext,
			getReservationList : apiUrl + '/chloris/reservation/getReservationList' + ext,
			setReservation : apiUrl + '/chloris/reservation/setReservation' + ext,
			updateReservation : apiUrl + '/chloris/reservation/updateReservation' + ext
		};
		// room
		this.room = {
			getRoomList : apiUrl + '/chloris/room/getRoomList' + ext,
			setRoom : apiUrl + '/chloris/room/setRoom' + ext,
			updateRoom : apiUrl + '/chloris/room/updateRoom' + ext
		};
		// holiday
		this.holiday = {
			getHolidayList : apiUrl + '/chloris/holiday/getHolidayList' + ext,
			setHoliday : apiUrl + '/chloris/holiday/setHoliday' + ext,
			updateHoliday : apiUrl + '/chloris/holiday/updateHoliday' + ext
		};
    }]);
})(window, window.angular);