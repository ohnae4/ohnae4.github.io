(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);
	
	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','kaisaApi','$filter',function($scope,$window,$timeout,$interval,$http,kaisaApi,$filter){
    	/**
    	 * QNA
    	 */
    	$scope.QNA = {
    		QNA_NUMBER : null,
			MEMBER_NAME : '최재호',
			MEMBER_PHONE : '01055555552',
			MEMBER_EMAIL : '232@email.com',
			PASSWORD : '111999',
			SUBJECT : '문의제목입니다.',
			CONTENT : '문의내용입니다문의내용입니다문의내용입니다문의내용입니다문의내용입니다'
		};
    	//문의하기
    	$scope.layerQna = {
    		active : false,
    		close : function(){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.setQna + $scope.jsonpParam($scope.QNA)).success(function(data){
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
    	//qnaPaging
    	$scope.qnaPaging = {
	    	orderBy: null,
			search: {
				SUBJECT : '',
				QNA_NUMBER : ''
			},
			reset : function(){
				$scope.qnaPaging.SUBJECT = '';
				$scope.qnaPaging.QNA_NUMBER = '';
				$scope.qnaPaging.currentPage = 0;
			},
			sorting : function(key){
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
    	//문의보기
    	$scope.qna = null;
    	$scope.getQna = function(n){
    		$http.jsonp(kaisaApi.getQna + $scope.jsonpParam({QNA_NUMBER : n})).success(function(data){
				if(data.success){
					$scope.qna = data.items[0];
					$scope.REPLY.QNA_NUMBER = $scope.qna.QNA_NUMBER;
					$scope.REPLY.MEMBER_NAME = $scope.qna.MEMBER_NAME;
					$scope.getQnaReplyList();
					$timeout(function(){
						$(window).scrollTop(angular.element('.qna').offset().top - 50);
					},100);
				}else{
					$scope.alert.open({message : data.message });
				}
		    }).error(function(data){
		    	$scope.alert.open({message : '문의 조회를 실패하였습니다.'});
		    	$scope.loading.active = false;
		    });
    	};
		//문의리스트
    	$scope.qnaList = {};
    	$scope.getQnaList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getQnaList + $scope.jsonpParam({  })).success(function(data){
				$scope.qnaList = data.items;
				$scope.loading.active = false
		    }).error(function(data){
		    	$scope.alert.open({message : '문의리스트 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.getQnaList();
    	//문의삭제
    	$scope.deleteQna = { //<!-- <button type="button" class="normal" data-ng-click="deleteQna.click(i.QNA_NUMBER)">삭제</button> -->
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteQna + $scope.jsonpParam({ QNA_NUMBER : $scope.deleteQna.no })).success(function(data){
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
    	//댓글
    	$scope.REPLY = {
	    	QNA_REPLY_NUMBER : '',
	    	QNA_NUMBER : '',
	    	MEMBER_NAME : '',
	    	CONTENT : '',
	    	CREATE_DATE : '',
	    	UPDATE_DATE : ''
    	};
    	$scope.replyList = [];
    	$scope.getQnaReplyList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getQnaReplyList + $scope.jsonpParam({ QNA_NUMBER : $scope.REPLY.QNA_NUMBER })).success(function(data){
				$scope.replyList = data.items;
				$scope.loading.active = false;
		    }).error(function(data){
		    	$scope.alert.open({message : '댓글 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.deleteQnaReply = {
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteQnaReply + $scope.jsonpParam({ QNA_REPLY_NUMBER : $scope.deleteQnaReply.no })).success(function(data){
    				if(data.success){
    					$scope.getQnaReplyList();
    				}else{
    					$scope.alert.open({message : data.message});
    				}
    				$scope.loading.active = false
    		    }).error(function(data){
    		    	console.log('delete error');
    		    	$scope.loading.active = false;
    		    });
    		},
    		click : function(no){
				this.no = no;
    			$scope.alert.open({message : '정말 삭제하시겠습니까?' , confirm : true, callback : $scope.deleteQnaReply.callback });
    		}
    	};
    	$scope.setQnaReply = function(){
    		if($scope.REPLY.CONTENT.length < 5){
    			$scope.alert.open({message : '5글자 이상 입력해주세요.'});
    			return;
    		}
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.setQnaReply + $scope.jsonpParam({ QNA_NUMBER : $scope.REPLY.QNA_NUMBER , MEMBER_NAME : ($scope.admin.user)? '관리자':$scope.REPLY.MEMBER_NAME , CONTENT : $scope.REPLY.CONTENT })).success(function(data){
				$scope.loading.active = false;
				$scope.REPLY.CONTENT = '';
				$scope.getQnaReplyList();
		    }).error(function(data){
		    	$scope.alert.open({message : '댓글 입력 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	//비밀번호 확인
    	$scope.layerPwd = {
    		failCount : 0,
    		active : false,
    		model : {
    			QNA_NUMBER : null,
    			PASSWORD : '111999'
    		},
    		open : function(n){
    			if($scope.admin.user){
    				$scope.getQna(n);
    				return;
    			}
    			this.model.QNA_NUMBER = n;
    			this.model.PASSWORD = '111999';
    			this.active = true;
    		},
    		close : function(n){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.getQnaPwdCheck + $scope.jsonpParam({QNA_NUMBER : $scope.layerPwd.model.QNA_NUMBER, PASSWORD : $scope.layerPwd.model.PASSWORD})).success(function(data){
					if(data.success){
						$scope.qna = data.items[0];
						$scope.layerPwd.active = false;
						$scope.REPLY.QNA_NUMBER = $scope.qna.QNA_NUMBER;
						$scope.REPLY.MEMBER_NAME = $scope.qna.MEMBER_NAME;
						$scope.getQnaReplyList();
						$timeout(function(){
							$(window).scrollTop(angular.element('.qna').offset().top - 50);
						},100);
					}else{
						$scope.layerPwd.failCount++;
						$scope.layerPwd.model.PASSWORD = '111999';
					}
					if($scope.layerPwd.failCount > 2){
						$scope.alert.open({message : '총 3회 실패하셨습니다.', callback : $scope.reload});
					}
			    }).error(function(data){
			    	$scope.alert.open({message : '문의 조회를 실패하였습니다.'});
			    	$scope.loading.active = false;
			    });
    		}
    	};
    	/**
    	 * FAQ
    	 */
    	$scope.FAQ = {
    		FAQ_NUMBER : null,
			QUESTION : '홈페이지 예약은 어떻게 할 수있나요 ?',
			ANSWER : '홈페이지에 들어가셔서 <br>홈페이지 예약은 어떻게 할 수있나요',
			PRIORITY : 255, //1~255
			CREATE_DATE : '',
			UPDATE_DATE : ''
		};
    	//자주찾는질문 리스트
    	$scope.faqList = {};
    	$scope.getFaqList = function(){
    		$scope.loading.active = true;
			$http.jsonp(kaisaApi.getFaqList + $scope.jsonpParam({  })).success(function(data){
				$scope.faqList = data.items;
				$scope.loading.active = false
		    }).error(function(data){
		    	$scope.alert.open({message : '문의리스트 조회 실패.'});
		    	$scope.loading.active = false;
		    });
    	};
    	$scope.getFaqList();
    	//자주찾는질문등록
    	$scope.layerFaq = {
    		active : false,
    		close : function(){
    			this.active = false;
    		},
    		submit : function(){
				$http.jsonp(kaisaApi.setFaq + $scope.jsonpParam($scope.FAQ)).success(function(data){
					if(data.success){
						$scope.getFaqList();
						$scope.layerFaq.close();
					}else{
						$scope.alert.open({message : data.message});
					}
			    }).error(function(data){
			    	$scope.alert.open({message : '예약할 수 없는 날짜 입니다.'});
			    	$scope.loading.active = false;
			    });
    		}
    	};
    	//faq 삭제
    	$scope.deleteFaq = { //<!-- <button type="button" class="normal" data-ng-click="deleteFaq.click(i.QNA_NUMBER)">삭제</button> -->
    		no : null,
    		callback : function(){
    			$http.jsonp(kaisaApi.deleteFaq + $scope.jsonpParam({ FAQ_NUMBER : $scope.deleteFaq.no })).success(function(data){
    				$scope.getFaqList();
    				$scope.loading.active = false
    		    }).error(function(data){
    		    	console.log('delete error');
    		    	$scope.loading.active = false;
    		    });
    		},
    		click : function(no){
				this.no = no;
    			$scope.alert.open({message : '정말 삭제하시겠습니까?' , confirm : true, callback : $scope.deleteFaq.callback});
    		}
    	};
    	//faqPaging
    	$scope.faqPaging = {
    		idx : 0,
    		click : function(idx){
    			if(idx == this.idx){
    				this.idx = -1;
    				return;
    			}
    			this.idx = idx;
    		},
	    	orderBy: null,
			search: {
				QUESTION : '',
				ANSWER : ''
			},
			reset : function(){
				$scope.qnaPaging.QUESTION = '';
				$scope.qnaPaging.ANSWER = '';
				$scope.qnaPaging.currentPage = 0;
			},
			sorting : function(key){
				if(this.orderBy == key){
					this.orderBy = '-' + key;
					return;
				}
				this.orderBy = '' + key;
			},
			currentPage : 0,
			pageSize : 3,
			numberOfPages : function(){
				return Math.ceil($scope.faqList.length / this.pageSize);
			}
    	};
	}]);
})(window,window.angular);