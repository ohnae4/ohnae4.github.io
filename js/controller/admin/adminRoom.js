(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','gridDatepicker','grid']);

	app.controller('BodyController',[
			    '$scope','$window','$timeout','$interval','$http','kaisaApi','code','$filter','kaisaGrid',
		function($scope , $window , $timeout  ,$interval , $http , kaisaApi , code , $filter , kaisaGrid ){
		
		if(!$scope.admin.user){
			location.pathname = '/admin';
		}

		$scope.code = {
			roomCode: code.roomCode
		};
		
		$scope.roomGrid = kaisaGrid.init($scope,{
			name: 'roomGrid',
			header: [
				 {key:'ROW', 			name:'INDEX',				type:'Number',    width:50,  length:8,  visible:false,	disabled:true,	align:'center'}
			    ,{key:'CRUD', 			name:'CRUD',				type:'String',    width:50,  length:8,  visible:true,	disabled:true,	align:'center'}
				,{key:'SELECTED', 		name:'선택',				type:'Checkbox',  width:50,   length:5,  visible:true,	disabled:false,	align:'center'}
				,{key:'ROOM_NUMBER',	name:'객실번호',		   type:'Number',    width:80,  length:20, visible:true,	disabled:false,	align:'right'}
				,{key:'ROOM_NAME',		name:'객실명',				type:'String',    width:80,  length:90, visible:true,	disabled:false,	align:'left'}
				,{key:'ROOM_TYPE_CODE',	name:'객실유형',			type:'Combo',    width:100,  length:90, visible:true,	disabled:false,	align:'right', required:true, options: code.roomCode , default: '1'}
				,{key:'ROOM_M2',		name:'평형',				type:'Number',    width:100,  length:90, visible:true,	disabled:false,	align:'right'}
				,{key:'MIN_PERSONNEL',	name:'기준인원',			type:'Number',    width:100,  length:90, visible:true,	disabled:false,	align:'right'}
				,{key:'MAX_PERSONNEL',	name:'최대인원',			type:'Number',    width:100,  length:90, visible:true,	disabled:false,	align:'right'}
				,{key:'PRICE_1',		name:'비수기 주중 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_2',		name:'비수기 금요일 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_3',		name:'비수기 주말 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_4',		name:'준성수기 주중 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_5',		name:'준성수기 금요일 요금',type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_6',		name:'준성수기 주말 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_7',		name:'성수기 주중 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_8',		name:'성수기 금요일 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_9',		name:'성수기 주말 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_10',		name:'극성수기 주중 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_11',		name:'극성수기 금요일 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_12',		name:'극성수기 주말 요금',	type:'Number',    width:130,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'PRICE_ADD_1',	name:'인당추가금액',			type:'Number',    width:80,  length:30, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'PRICE_ADD_2',	name:'바베큐추가금액',		type:'Number',    width:80,  length:30, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'PRICE_ADD_3',	name:'온수추가금액', 		type:'Number',    width:80,  length:30, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'DESCRIPTION',	name:'비고',				type:'String',    width:80,  length:30, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'PRIORITY',		name:'우선순위',			type:'Number',    width:80,  length:30, visible:true,	disabled:false,	align:'left', required:false}
				,{key:'CREATE_DATE',	name:'등록일시',  			type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'}
				,{key:'UPDATE_DATE',	name:'수정일시',			type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'} // , sort:true yyyy-MM-dd hh:mm:ss
			],
			headerSorting: true,
			searchUrl: kaisaApi.admin.getRoomList,
			saveUrl  : kaisaApi.admin.setRoomList,
			callBack: function(){
				// console.log('end query');
			},
			add: function(){
				$scope.alert.open({message: '문의내역은 추가할 수 없습니다.'});
			},
			height: 300,
			searchParam: {
				searchYear: $filter('date')(new Date(),'yyyy'),
				searchMonth: $filter('date')(new Date(),'MM'),
				limitPage: '100',
				currentPage: '1'
			}
		});
		$scope.roomGrid.search();
		
	}]);
})(window,window.angular);