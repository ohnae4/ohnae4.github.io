(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','gridDatepicker','grid']);

	app.controller('BodyController',[
			    '$scope','$window','$timeout','$interval','$http','kaisaApi','$filter','kaisaGrid',
		function($scope , $window , $timeout  ,$interval , $http , kaisaApi , $filter , kaisaGrid ){
		
		if(!$scope.admin.user){
			location.pathname = '/admin';
		}
		
		$scope.holidayGrid = kaisaGrid.init($scope,{
			name: 'holidayGrid',
			header: [
				 {key:'ROW', 			name:'INDEX',		type:'Number',    width:50,  length:8,  visible:false,	disabled:true,	align:'center'}
			    ,{key:'CRUD', 			name:'CRUD',		type:'String',    width:50,  length:8,  visible:false,	disabled:true,	align:'center'}
				,{key:'SELECTED', 		name:'선택',		type:'Checkbox',  width:50,   length:5,  visible:true,	disabled:false,	align:'center'}
				,{key:'HOLIDAY_CODE',	name:'휴일코드',	type:'Combo',    width:100,  length:20, visible:true,	disabled:false,	align:'left', required:true, options: $scope.code.holidayCode , default: '1'}
				,{key:'HOLIDAY_NAME',	name:'휴일명',	type:'String',    width:100,  length:20, visible:true,	disabled:false,	align:'left'}
				,{key:'DAY_DATE',		name:'날짜',		type:'Date',    width:100,  length:90, visible:true,	disabled:false,	align:'right', dateFormat: 'yyyy-MM-dd', required:true}
				,{key:'PRICE',			name:'가격',		type:'Number',    width:80,  length:20, visible:true,	disabled:false,	align:'left'}
				,{key:'CREATE_DATE',	name:'등록일시',  	type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'}
				,{key:'UPDATE_DATE',	name:'수정일시',	type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'} // , sort:true yyyy-MM-dd hh:mm:ss
			],
			headerSorting: true,
			searchUrl: kaisaApi.admin.getHolidayList,
			saveUrl  : kaisaApi.admin.setHolidayList,
			callBack: function(){
				// console.log('end query');
			},
			height: 300,
			searchParam: {
				searchYear: $filter('date')(new Date(),'yyyy'),
				searchMonth: '',
				limitPage: '100',
				currentPage: '1'
			}
		});
		$scope.holidayGrid.search();
		
	}]);
})(window,window.angular);