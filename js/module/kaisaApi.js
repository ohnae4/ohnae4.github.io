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
			getReservationList : apiUrl + '/chlois/reservation/getReservationList' + ext,
			setReservationList : apiUrl + '/chlois/reservation/setReservationList' + ext,
			getQnaList : apiUrl + '/chlois/qna/getQnaList' + ext,
			setQnaList : apiUrl + '/chlois/qna/setQnaList' + ext,
			setQnaReply : apiUrl + '/chlois/qna/setQnaReply' + ext, // 수정팝업
			getFaqList : apiUrl + '/chlois/faq/getFaqList' + ext,
			setFaqList : apiUrl + '/chlois/faq/setFaqList' + ext,
			setFaq : apiUrl + '/chlois/faq/setFaq' + ext, // 수정팝업
			getNoticeList : apiUrl + '/chlois/notice/getNoticeList' + ext,
			setNoticeList : apiUrl + '/chlois/notice/setNoticeList' + ext,
			setNotice : apiUrl + '/chlois/notice/setNotice' + ext, // 수정팝업
			getHolidayList : apiUrl + '/chlois/holiday/getHolidayList' + ext,
			setHolidayList : apiUrl + '/chlois/holiday/setHolidayList' + ext,
			getRoomList : apiUrl + '/chlois/room/getRoomList' + ext,
			setRoomList : apiUrl + '/chlois/room/setRoomList' + ext
		};
		// qna
		this.qna = {
			getQnaList : apiUrl + '/chlois/qna/getQnaList' + ext,
			getQnaPwdCheck : apiUrl + '/chlois/qna/getQnaPwdCheck' + ext,
			getQna : apiUrl + '/chlois/qna/getQna' + ext,
			setQna : apiUrl + '/chlois/qna/setQna' + ext,
		};
		// reservation
		this.reservation = {
			getFrontReservationList : apiUrl + '/chlois/reservation/getFrontReservationList' + ext,
			setReservation : apiUrl + '/chlois/reservation/setReservation' + ext
		};
		// room
		this.room = {
			getRoomList : apiUrl + '/chlois/room/getRoomList' + ext
		};
		// room
		this.holiday = {
			getHolidayList : apiUrl + '/chlois/holiday/getHolidayList' + ext,
		};
    }]);
})(window, window.angular);