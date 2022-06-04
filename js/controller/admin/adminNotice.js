(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','gridDatepicker','grid']);

	app.controller('BodyController',[
			    '$scope','$window','$timeout','$interval','$http','kaisaApi','$filter','kaisaGrid',
		function($scope , $window , $timeout  ,$interval , $http , kaisaApi , $filter , kaisaGrid ){

		if(!$scope.admin.user){
			location.pathname = '/admin';
		}
		$scope.noticeGrid = kaisaGrid.init($scope,{
			name: 'noticeGrid',
			header: [
				 {key:'ROW', 			name:'INDEX',		type:'Number',    width:50,  length:8,  visible:false,	disabled:true,	align:'center'}
			    ,{key:'CRUD', 			name:'CRUD',		type:'String',    width:50,  length:8,  visible:false,	disabled:true,	align:'center'}
				,{key:'SELECTED', 		name:'선택',		type:'Checkbox',  width:50,   length:5,  visible:true,	disabled:false,	align:'center'}
				,{key:'NOTICE_NUMBER',	name:'공지번호',	type:'Number',    width:80,  length:90, visible:true,	disabled:true,	align:'left', required:false}
				,{key:'SUBJECT',		name:'제목',		type:'String',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:true, popup: { target: 'popupNotice', dim: true, dimClick: true }}
				,{key:'CONTENT',		name:'내용',		type:'String',    width:150,  length:20, visible:true,	disabled:true,	align:'left', required:false, popup: { target: 'popupNotice', dim: true, dimClick: true }}
				,{key:'CREATE_DATE',	name:'등록일시',  	type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'}
				,{key:'UPDATE_DATE',	name:'수정일시',	type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'} // , sort:true yyyy-MM-dd hh:mm:ss
			],
			headerSorting: true,
			searchUrl: kaisaApi.admin.getNoticeList,
			saveUrl  : kaisaApi.admin.setNoticeList,
			isDoubleClick: false,
			callBack: function(){
				// console.log('end query');
			},
			height: 300,
			searchParam: {
				searchYear: $filter('date')(new Date(),'yyyy'),
				searchMonth: $filter('date')(new Date(),'MM'),
				limitPage: '100',
				currentPage: '1'
			}
		});
		$scope.noticeGrid.search();
		
	}]);
})(window,window.angular);