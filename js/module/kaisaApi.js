(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'ohnae3.cafe24.com/api/controller',
			ext = constant.extension.api;
		
		// auth
		this.auth = {
			getLogin : apiUrl + '/kaisa/user/getLogin' + ext
		};
		// admin
		this.admin = {
			getReservationList : apiUrl + '/chloris/reservation/getReservationList' + ext,
			setReservationList : apiUrl + '/chloris/reservation/setReservationList' + ext,
			getQnaList : apiUrl + '/chloris/qna/getQnaList' + ext,
			setQnaList : apiUrl + '/chloris/qna/setQnaList' + ext,
			setQnaReply : apiUrl + '/chloris/qna/setQnaReply' + ext, // 수정팝업
			getFaqList : apiUrl + '/chloris/faq/getFaqList' + ext,
			setFaqList : apiUrl + '/chloris/faq/setFaqList' + ext,
			setFaq : apiUrl + '/chloris/faq/setFaq' + ext, // 수정팝업
			getNoticeList : apiUrl + '/chloris/notice/getNoticeList' + ext,
			setNoticeList : apiUrl + '/chloris/notice/setNoticeList' + ext,
			setNotice : apiUrl + '/chloris/notice/setNotice' + ext, // 수정팝업
			getHolidayList : apiUrl + '/chloris/holiday/getHolidayList' + ext,
			setHolidayList : apiUrl + '/chloris/holiday/setHolidayList' + ext,
			getRoomList : apiUrl + '/chloris/room/getRoomList' + ext,
			setRoomList : apiUrl + '/chloris/room/setRoomList' + ext
		};
		// qna
		this.qna = {
			getQnaList : apiUrl + '/chloris/qna/getQnaList' + ext,
			getQnaPwdCheck : apiUrl + '/chloris/qna/getQnaPwdCheck' + ext,
			getQna : apiUrl + '/chloris/qna/getQna' + ext,
			setQna : apiUrl + '/chloris/qna/setQna' + ext,
		};
		// reservation
		this.reservation = {
			getFrontReservationList : apiUrl + '/chloris/reservation/getFrontReservationList' + ext,
			setReservation : apiUrl + '/chloris/reservation/setReservation' + ext
		};
		// room
		this.room = {
			getRoomList : apiUrl + '/chloris/room/getRoomList' + ext
		};
		// room
		this.holiday = {
			getHolidayList : apiUrl + '/chloris/holiday/getHolidayList' + ext,
		};
    }]);
})(window, window.angular);