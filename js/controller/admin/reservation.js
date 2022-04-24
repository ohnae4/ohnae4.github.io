(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','baseCode','grid']);

	app.controller('BodyController',[
			    '$scope','$window','$timeout','$interval','$http','kaisaApi','code','$filter','kaisaGrid',
		function($scope , $window , $timeout  ,$interval , $http , kaisaApi , code , $filter , kaisaGrid){
		
		$scope.code = {
			yearArr: code.yearArr
		};
		$scope.data = {
			year: $filter('date')(new Date(),'yyyy')
		};

		$scope.reservationGrid = kaisaGrid.init($scope,{
			name : 'reservationGrid',
			header : [
				 {key:'ROW', 				name:'INDEX',		type:'Number',    width:50,  length:8,  visible:true,	disabled:true,	align:'center'}
			    ,{key:'CRUD', 				name:'CRUD',		type:'String',    width:50,  length:8,  visible:true,	disabled:true,	align:'center'}
				,{key:'SELECTED', 			name:'선택',		type:'Checkbox',  width:50,   length:5,  visible:true,	disabled:false,	align:'center'}
				,{key:'RESERVATION_DATE',	name:'예약일',		type:'Number',    width:100,  length:90, visible:true,	disabled:true,	align:'right', required:true}
				,{key:'STATUS_CODE',		name:'예약상태',	type:'String',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'ROOM_NUMBER',		name:'객실번호',	type:'Number',    width:150,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'MEMBER_NAME',		name:'회원명',		type:'String',    width:150,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'MEMBER_PHONE',		name:'전화번호',	type:'Number',	  width:150,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'MEMBER_EMAIL',		name:'이메일',	 	type:'String',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PASSWORD',			name:'패스워드',	type:'String',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'DESCRIPTION',		name:'설명',	 	type:'String',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'ADD_COUNT_1',		name:'추가인원',	type:'Number',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'ADD_COUNT_2',		name:'바베큐추가수',type:'Number',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'ADD_COUNT_3',		name:'온수추가수',	type:'Number',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'CREATE_DATE',		name:'등록일시',  	type:'Date',	  width:170,  length:30, visible:true,	disabled:false,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'}
				,{key:'UPDATE_DATE',		name:'수정일시',	type:'Date',	  width:200,  length:30, visible:true,	disabled:false,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'} // , sort:true yyyy-MM-dd hh:mm:ss
			],
			headerSorting : true,
			searchUrl : kaisaApi.admin.getReservationList,
			saveUrl   : kaisaApi.admin.setReservationList,
			callBack : function(){
				console.log('end query');
			},
			height: 300,
			searchParam : {
				ABB : null,
				EN : null,
				KR : null,
				NOTE : null,
				limitPage : '10',
				currentPage : '1'
			}
		});
		$scope.reservationGrid.search();

		/* ,
		monthChange(){
		this.getReservationList(this.yearSelected, this.monthSelected);
		},
		changeStatus ($event){
		console.log($event);
		},
		deleteReservation(RESERVATION_NUMBER) {
		ReservationService.deleteReservation({ RESERVATION_NUMBER: RESERVATION_NUMBER }).then(resp => {
			console.log(resp);
		}, error => {
			console.log(error);
		});
		},
		getReservationList(searchYear, searchMonth) {
		ReservationService.getReservationList({ searchYear: searchYear, searchMonth: searchMonth }).then(resp => {
			this.items = resp.items;
		}, error => {
			console.log(error);
		});
		},
		setReservation() {
		ReservationService.setReservation({ 
			RESERVATION_DATE: this.RESERVATION_DATE,
			ROOM_NUMBER: this.ROOM_NUMBER,
			MEMBER_NAME: this.MEMBER_NAME,
			MEMBER_PHONE: this.MEMBER_PHONE,
			MEMBER_EMAIL: this.MEMBER_EMAIL,
			PASSWORD: this.PASSWORD,
			DESCRIPTION: this.DESCRIPTION,
			ADD_COUNT_1: this.ADD_COUNT_1,
			ADD_COUNT_2: this.ADD_COUNT_2,
			ADD_COUNT_3: this.ADD_COUNT_3,
			STATUS_CODE: this.STATUS_CODE,
			PRICE: this.PRICE
			}).then(resp => {
			console.log(resp);
			if(!resp.success) {
			alert(resp.message);
			} else {
			location.reload();
			}
		}, error => {
			console.log(error);
		});
		},
		updateReservation() { // 팝업저장
		ReservationService.updateReservation(this.popup.data).then(resp => {
			alert(resp.message);
			location.reload();
		}, error => {
			console.log(error);
		});
		}, */
		/* $scope.data = popup: {
			show: false,
			data: {}
		  },
		  items: [],
		  RESERVATION_DATE: '2022-04-13',
		  ROOM_NUMBER: 1,
		  MEMBER_NAME: '홍길동',
		  MEMBER_PHONE: '01072222222',
		  MEMBER_EMAIL: '708@hanmail.net',
		  PASSWORD: '1111',
		  DESCRIPTION: '비고',
		  STATUS_CODE: 1,
		  ADD_COUNT_1: 0,
		  ADD_COUNT_2: 0,
		  ADD_COUNT_3: 0,
		  PRICE: 300000,
		  yearSelected: moment().format('YYYY'),    
		  yearArr: this.$code.yearArr,
		  monthArr: this.$code.monthArr,
		  resevationType: this.$code.resevationType,
		  monthSelected: moment().format('MM') */
		
	}]);
})(window,window.angular);