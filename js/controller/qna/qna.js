(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);
	
	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
		var getAddZero = function(n){
			return n < 10 ? '0' + n : ''+n;
		};
		//rvQna
    	$scope.rvQna = {};
		
    	$scope.ROOM_QNA = {
    		QNA_NUMBER : null,
			MEMBER_NAME : '최재호',
			MEMBER_PHONE : '01055555552',
			MEMBER_EMAIL : '232@email.com',
			PASSWORD : '111',
			SUBJECT : 2,
			CONTENT : '',
			CREATE_DATE : ''
		};
    	
    	$scope.$watch('ROOM_QNA.PERSONNEL_1', function(val){
    		if(val){
    			var int = parseInt(val) - parseInt($scope.rvQna.selectRoom.MIN_PERSONNEL);
    			var price = parseInt($scope.rvQna.selectRoom['PRICE_'+ $scope.rvQna.selectDay.priceCode]);
    			$scope.ROOM_QNA.PRICE = price + int;
    		}
        },true);
    	
    	$scope.layerQna = {
    		active : false,
    		close : function(){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.setQna + $scope.jsonpParam($scope.ROOM_QNA)).success(function(data){
					if(data.success){
						$scope.getQnaList();
						$scope.layerQna.close();
					}else{
						$scope.alert.open({message : data.message});
					}
			    }).error(function(data){
			    	$scope.alert.open({message : '예약할 수 없는 날짜 입니다.'});
			    	$scope.loading.active = false;
			    });
    		}
    	};
    	
    	//paging
    	$scope.paging = {
	    	orderBy: null,
			search: {
				SUBJECT : ''
			},
			reset : function(){
				$scope.paging.SUBJECT = '';
				$scope.paging.currentPage = 0;
			},
			sorting: function(key){
				if(this.orderBy == key){
					this.orderBy = '-' + key;
					return;
				}
				this.orderBy = '' + key;
			},
			currentPage : 0,
			pageSize : 10,
			numberOfPages : function(){
				return Math.ceil($scope.qnaList.length / this.pageSize);
			}
    	};
		//객실 예약정보
    	$scope.qnaList = {};
    	$scope.getQnaList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getQnaList + $scope.jsonpParam({ searchDateYear : $filter('date')($scope.rvQna.start.date,'yyyy') , searchDateMonth : $filter('date')($scope.rvQna.start.date,'MM') })).success(function(data){
				$scope.qnaList = data.items;
				$scope.rvQna.start.date = new Date(data.date);
				$scope.rvQna.start.now = new Date(data.now);
				$scope.rvQna.init();
				$scope.rvQna.start.month = $filter('date')($scope.rvQna.start.date,'MM');
				for(var i in $scope.qnaList){
					$scope.qnaList[i].ROOM_STATUS_CODE_ORIGIN = $scope.qnaList[i].ROOM_STATUS_CODE;
					for(var j in $scope.rvQna.start.day){
						if($scope.qnaList[i].QNA_DATE.substring(8,10) == $scope.rvQna.start.day[j].date){
							$scope.rvQna.start.day[j].qna.push($scope.qnaList[i]);
						}
					}
				}
				$scope.loading.active = false
		    }).error(function(data){
		    	$scope.alert.open({message : '객실 예약정보 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.getQnaList();
    	$scope.updateQna = function(no,code){
    		$http.jsonp(kaisaApi.updateQna + $scope.jsonpParam({ QNA_NUMBER : no , ROOM_STATUS_CODE : code })).success(function(data){
    			if(data.success){
    				$scope.alert.open({message : data.message});
    				$scope.getQnaList();
    			}else{
    				$scope.alert.open({message : data.message});
    			}
				$scope.loading.active = false
		    }).error(function(data){
		    	console.log('update error');
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.deleteQna = { //<!-- <button type="button" class="normal" data-ng-click="deleteQna.click(i.QNA_NUMBER)">삭제</button> -->
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteQna + $scope.jsonpParam({ QNA_NUMBER : $scope.deleteQna.no })).success(function(data){
    				$scope.alert.open({message : data.message});
    				$scope.getQnaList();
    				$scope.loading.active = false
    		    }).error(function(data){
    		    	console.log('update error');
    		    	$scope.loading.active = false;
    		    });
    		},
    		click : function(no){
    			this.no = no;
    			$scope.alert.open({message : '정말 삭제하시겠습니까?' , confirm : true, callback : $scope.deleteQna.callback});
    		}
    	};
	}]);
})(window,window.angular);