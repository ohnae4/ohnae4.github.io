(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','gridDatepicker','grid']);

	app.controller('BodyController',[
			    '$scope','$window','$timeout','$interval','$http','kaisaApi','code','$filter','kaisaGrid',
		function($scope , $window , $timeout  ,$interval , $http , kaisaApi , code , $filter , kaisaGrid ){
		
		if(!$scope.admin.user){
			location.pathname = '/admin';
		}
		$scope.qnaGrid = kaisaGrid.init($scope,{
			name: 'qnaGrid',
			header: [
				 {key:'ROW', 			name:'INDEX',		type:'Number',    width:50,  length:8,  visible:true,	disabled:true,	align:'center'}
			    ,{key:'CRUD', 			name:'CRUD',		type:'String',    width:50,  length:8,  visible:true,	disabled:true,	align:'center'}
				,{key:'SELECTED', 		name:'선택',		type:'Checkbox',  width:50,   length:5,  visible:true,	disabled:true,	align:'center'}
				,{key:'QNA_NUMBER',		name:'문의번호',	type:'Number',    width:70,  length:90, visible:true,	disabled:true,	align:'left', required:true}
				,{key:'MEMBER_NAME',	name:'회원명',		type:'String',    width:80,  length:30, visible:true,	disabled:true,	align:'left', required:true}
				,{key:'MEMBER_PHONE',	name:'전화번호',	type:'String',	  width:100,  length:30, visible:true,	disabled:true,	align:'left', required:true}
				,{key:'MEMBER_EMAIL',	name:'이메일',	 	type:'String',    width:150,  length:300, visible:true,	disabled:true,	align:'left', required:true}
				,{key:'PASSWORD',		name:'패스워드',	type:'String',    width:100,  length:300, visible:true,	disabled:true,	align:'left', required:true}
				,{key:'SUBJECT',		name:'제목',	 	type:'String',    width:100,  length:300, visible:true,	disabled:true,	align:'left', required:false, popup: { target: 'popupQna', dim: true, dimClick: true }}
				,{key:'REPLY_YN',		name:'답변여부',	type:'String',    width:100,  length:300, visible:true,	disabled:true,	align:'left', required:false}
				,{key:'CONTENT',		name:'질문내용',	type:'String',    width:100,  length:4000, visible:true,	disabled:true,	align:'left', required:false}
				,{key:'REPLY_CONTENT',	name:'답변내용',	type:'String',    width:100,  length:4000, visible:true,	disabled:true,	align:'left', required:false}
				,{key:'CREATE_DATE',	name:'등록일시',  	type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'}
				,{key:'UPDATE_DATE',	name:'수정일시',	type:'Date',	  width:120,  length:30, visible:true,	disabled:true,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'} // , sort:true yyyy-MM-dd hh:mm:ss
			],
			headerSorting: true,
			searchUrl: kaisaApi.admin.getQnaList,
			saveUrl  : kaisaApi.admin.setQnaList,
			isDoubleClick: false,
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
		$scope.qnaGrid.search();

	}]);
})(window,window.angular);