(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','gridDatepicker','grid']);

	app.controller('BodyController',[
			    '$scope','$window','$timeout','$interval','$http','kaisaApi','$filter','kaisaGrid',
		function($scope , $window , $timeout  ,$interval , $http , kaisaApi , $filter , kaisaGrid ){
		
		if(!$scope.admin.user){
			location.pathname = '/admin';
		}
		$scope.reservationGrid = kaisaGrid.init($scope,{
			name: 'reservationGrid',
			header: [
				 {key:'ROW', 				name:'INDEX',		type:'Number',    width:50,  length:8,  visible:false,	disabled:true,	align:'center'}
			    ,{key:'CRUD', 				name:'CRUD',		type:'String',    width:50,  length:8,  visible:true,	disabled:true,	align:'center'}
				,{key:'SELECTED', 			name:'선택',		type:'Checkbox',  width:50,   length:5,  visible:true,	disabled:false,	align:'center'}
				,{key:'STATUS_CODE',		name:'예약상태',	type:'Combo',    width:80,  length:90, visible:true,	disabled:false,	align:'left', required:true, options: $scope.code.resevationType , default: '1'}
				,{key:'RESERVATION_NUMBER',	name:'예약번호',	type:'Number',    width:50,  length:90, visible:true,	disabled:true,	align:'right', dateFormat: 'yyyy-MM-dd'}
				,{key:'RESERVATION_DATE',	name:'예약일',		type:'Date',    width:100,  length:90, visible:true,	disabled:false,	align:'right', dateFormat: 'yyyy-MM-dd'}
				,{key:'PRICE',				name:'가격',		type:'Number',    width:80,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'DISCOUNT',			name:'할인',		type:'Number',    width:80,  length:20, visible:true,	disabled:false,	align:'left'}
				,{key:'ROOM_NUMBER',		name:'객실번호',	type:'Combo',    width:80,  length:20, visible:true,	disabled:false,	align:'left', required:true, options: $scope.code.roomType , default: '1'}
				,{key:'MEMBER_NAME',		name:'회원명',		type:'String',    width:80,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'MEMBER_PHONE',		name:'전화번호',	type:'String',	  width:100,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'MEMBER_EMAIL',		name:'이메일',	 	type:'String',    width:150,  length:300, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'ADD_COUNT_1',		name:'추가인원',	type:'Number',    width:80,  length:30, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'ADD_COUNT_2',		name:'바베큐추가수',type:'Number',    width:80,  length:30, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'ADD_COUNT_3',		name:'온수추가수',	type:'Number',    width:80,  length:30, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'DESCRIPTION',		name:'설명',	 	type:'String',    width:300,  length:300, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'CREATE_DATE',		name:'등록일시',  	type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'}
				,{key:'UPDATE_DATE',		name:'수정일시',	type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'} // , sort:true yyyy-MM-dd hh:mm:ss
			],
			headerSorting: true,
			searchUrl: kaisaApi.admin.getReservationList,
			saveUrl  : kaisaApi.admin.setReservationList,
			callBack: function(){
				// console.log('end query');
			},
			height: 300,
			searchParam: {
				searchYear: $filter('date')(new Date(),'yyyy'),
				searchMonth: $filter('date')(new Date(),'MM'),
				memberName: '',
				reservationDate: '',
				limitPage: '100',
				currentPage: '1'
			}
		});
		$scope.reservationGrid.search();
	}]);
})(window,window.angular);