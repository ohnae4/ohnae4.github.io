(function(window, angular, undefined){
	'use strict';
	var app = angular.module('directive',['common']);
	app.directive('kaisaHeader',[function(){
		return {
			template: '<div id="header">'+
				'<h1><a href="/"><img src="/img/common/logo.png" alt="" /></a></h1>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('kaisaMenu',[function(){
		return {
			template: '<div>'+
				'<div id="menu">'+
					'<ul>'+
						'<li data-ng-repeat="(idx, i) in roomList.items"><a data-ng-href="/pension/room{{idx + 1}}">{{i.ROOM_NAME}}</a></li>'+
					'</ul>'+
					'<ol>'+
						'<li data-ng-repeat="(idx, i) in menuList"><a data-ng-href="/{{i.url}}">{{i.title}}</a></li>'+
					'</ol>'+
				'</div>'+
				'<div id="alert" data-ng-if="alert.active" data-ng-class="{on:alert.active}">'+
					'<div class="wrap" data-ng-style="alert.option.style">'+
						'<h5 data-ng-show="alert.option.title">{{alert.option.title}}</h5>'+
						'<p data-ng-if="alert.option.type==\'text\'">{{alert.option.message}}</p>'+
						'<p data-ng-if="alert.option.type==\'html\'" data-ng-bind-html="alert.option.message | trustHtml"></p>'+
						'<div class="btn_wrap" data-ng-if="alert.option.confirm">'+
							'<span><button type="button" data-ng-click="alert.option.callback();alert.close()">{{alert.option.button.ok}}</button></span> <span data-ng-show="! alert.option.cancelCallback"><button type="button" class="normal" data-ng-click="alert.close()">{{alert.option.button.cancel}}</button></span> <span class="button" data-ng-show="alert.option.cancelCallback"><button type="button" class="normal" data-ng-click="alert.option.cancelCallback();alert.close()">{{alert.option.button.cancel}}</button></span>'+
						'</div>'+
						'<div class="btn_wrap" data-ng-if="! alert.option.confirm">'+
							'<span data-ng-show="! alert.option.callback"><button type="button" class="normal" data-ng-click="alert.close()">{{alert.option.button.ok}}</button></span> <span data-ng-show="alert.option.callback"><button type="button" data-ng-click="alert.option.callback();alert.close()">{{alert.option.button.ok}}</button></span>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div id="help" data-ng-if="help.active" data-ng-class="{on:help.active}" data-ng-style="help.style" data-ng-bind-html="help.html | trustHtml"></div>'+
				'<div id="loading" data-ng-if="loading.active" data-ng-class="{on:loading.active}">'+
					'<ul class="loading">'+
						'<li></li>'+
						'<li></li>'+
						'<li></li>'+
						'<li></li>'+
						'<li></li>'+
					'</ul>'+
				'</div>'+
				'<div id="login" data-ng-if="admin.layer.active">'+
					'<h3>로그인</h3>'+
					'<input autocapitalize="off" autocomplete="off" type="text" maxlength="10" required="required" data-ng-model="admin.si" />'+
					'<input autocapitalize="off" autocomplete="off" type="password" maxlength="10" required="required" data-ng-model="admin.sp" />'+
					'<button type="button" data-ng-click="admin.submit()">로그인</button>'+
				'</div>'+
				'<div id="dimmed" data-ng-class="{on : dimmed.active}" data-ng-click="dimmed.click()"></div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('kaisaMap',[function(){
		return {
			template: '<div id="contactUs">'+
				'<div class="wrap">'+
					'<h2>찾아오시는 길</h2>'+
					'<div id="map"></div>'+
				    '<ul>'+
					'<li><strong>주소:</strong> 경기도 가평군 가평읍 금대리 305-6 리버힐펜션</li>'+
					'<li><strong>도로명:</strong> 경기도 가평군 가평읍 북한강변로 536 리버힐펜션</li>'+
					'<li class="txt_guide"><strong>가평역</strong> 무료 픽업 및 드롭서비스 해드립니다.</li>'+
					'</ul>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
				window.initMap = function(){
					var uluru = {
						lat : 37.774083,
						lng : 127.535045
					};
					var map = new google.maps.Map(document.getElementById('map'), {
						zoom : 15,
						gestureHandling: 'cooperative',
						center : uluru
					});
					var marker = new google.maps.Marker({
						position : uluru,
						map : map
					});
				}
				angular.element(el).append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHJZ33ORPXZyNOAz7M6HKBPjHTZ8n6CLs&callback=initMap"></script>');
			}
		}
	}]);
	app.directive('kaisaFooter',[function(){
		return {
			template: '<div id="footer">'+
				'<p>상호 : 리버힐 펜션 , 주소 : 경기도 가평읍 금대리 306 , 전화 : 070-9482-2070 / 070-4882-2803 <br />'+
				'사업자번호 : 132-25-97858  통신판매신고번호 : 제 2009-경기가평-16호 <br />'+
				'copyright (c) 2018 Rever Hill. all right reserved<b data-ng-click="admin.layer.open()">..</b></p>'+
				'<p data-ng-if="admin.user" class="admin"><span data-ng-click="admin.logout()">관리자 로그아웃</span></p>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('onlyNumber',['kaisaRegex',function(kaisaRegex){ //only-number="false" => '.-'
	    return {
	    	require: 'ngModel',
	        link: function($scope, element, attrs, ctrl) {
	        	ctrl.$parsers.push(function (inputValue) {
	                var transformedInput = inputValue ? ((attrs.onlyNumber == 'true') ? inputValue.replace(/[^\d]/g,'') : inputValue.replace(/[^\d.-]/g,'')) : null;
	                if (transformedInput != inputValue) {
	                	ctrl.$setViewValue(transformedInput);
	                	ctrl.$render();
	                }
	                return transformedInput;
	            });
	        }
	    };
	}]);
	app.directive('icoHelp',[function(){
    	return {
    		replace : true,
    		link: function($scope, el, attrs){
    			el.on('mouseover',function(e){
    				if(el.find('.layer') && el.find('.layer').text().length > 10){
    					$scope.help.html = el.find('.layer').html();
        				$scope.help.active = true;
        				$scope.help.html = el.find('.layer').html();
        				$scope.help.style = {
        					left : e.pageX,
        					top : e.pageY
        				};
        				$scope.$apply();
    				}
    			});
    			el.on('mouseout',function(e){
    				$scope.help.active = false;
    				$scope.$apply();
    			});
    		}
    	}
    }]);
	app.directive('ngSrc',[function () {
		return {
			scope : false,
			link: function($scope, el, attrs){
				if(attrs.ngSrc && attrs.ngSrc.search($scope.image.host) < 0){
					console.log('%c ' + attrs.ngSrc + ' %c ( {{image.host}} 를 넣어주세요. )','color:#ffc382;','color:#ff9625;');
				}
				if(!attrs.loader){
					return false;
				}
				el.hide().parent().append('<div class="imgLoader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
				var loopCount = 0;
				el.on('error', function() {
					loopCount++;
					if(loopCount > 1){
						el.off('error');
					}
					el.attr('src', $scope.image.host + $scope.image.noImage);
					el.parent().find('.imgLoader').fadeOut(500);
				});
				if(attrs.ngSrc == null || attrs.ngSrc == ''){
					el.attr('src', $scope.image.host + $scope.image.noImage);
				}
				el.load(function(){
					setTimeout(function(){
						el.fadeIn(500).parent().find('.imgLoader').remove();
					},500);
				});
			}
		}
	}]);
	//byte check (required model)
	app.directive('maxByte',[function(){
	    return {
			require: 'ngModel',
	        link : function($scope, el, attrs, ctrl){
	        	attrs.$set("ngTrim", "false");
                var sup = 0,maxByte = parseInt(attrs.maxByte);
                var clen=0;
                var check = true;
                var getFocus = function(){
                    check = true;
                }
                ctrl.$parsers.push(function (value) {
                	var ibyte = 0;
                	for (var i = 0; i < value.length; i++) {
    					var tmp = escape(value.charAt(i));
    					if (tmp.length == 1) ibyte++;
    					else if (tmp.indexOf("%u") != -1) ibyte += 3;
    					else if (tmp.indexOf("%") != -1) ibyte += tmp.length/3;
    					if( ibyte <= maxByte){
    						clen = i+1;
    					}
    				}
                	if(ibyte > maxByte){
                		value = value.substr(0, clen);
                		ctrl.$setViewValue(value);
                        ctrl.$render();
                        if(attrs.maxByteAlert && check){
                            check = false;
                        	$scope.alert.pop({message:attrs.maxByte + attrs.maxByteAlert, callback:getFocus});
                        }
                		return value;
                	}else{
                		sup = value.length;
                		return value;
                	}
                    return value;
                });
			}
	    };
	}]);
	app.directive('myEnter', function () {
	    return function ($scope, el, attrs) {
	    	el.on('keydown keypress', function (event) {
	            if(event.which === 13) {
	                $scope.$apply(function (){
	                    $scope.$eval(attrs.myEnter);
	                });
	                el.blur();
	                event.preventDefault();
	            }
	        });
	    };
	});
	
	app.directive('myDir', ['$parse', function ($parse) {
	    return {
	        restrict: 'EA',
	        scope: true,
	        link: function (scope, elem, attrs) {
	           
	        }
	    };
	}]);
	
	app.directive('kaisaCaptcha',['$parse',function($parse){
		return {
			link : function($scope, el, attrs, ctrl) {
				if(!attrs.ngModel) {return;}
				$scope[attrs.ngModel] = {
					code : null,
					refresh : function(){
						var a = Math.floor((Math.random() * 10)),
							b = Math.floor((Math.random() * 10)),
							c = Math.floor((Math.random() * 10)),
							d = Math.floor((Math.random() * 10)),
							e = Math.floor((Math.random() * 10)),
							f = Math.floor((Math.random() * 10));
						var html = '<div class="through" style="transform:rotate('+a+'deg);"></div><div class="through" style="transform:rotate(-'+c+'deg);"></div><ol><li class="lan'+a+'">'+a+'</li><li class="lan'+b+'">'+b+'</li><li class="lan'+c+'">'+c+'</li class="lan'+d+'"><li>'+d+'</li><li class="lan'+e+'">'+e+'</li><li class="lan'+f+'">'+f+'</li></ol>';
						this.code = ''+a+''+b+''+c+''+d+''+e+''+f;
						el.html('').html(html);
					}
				};
				$scope[attrs.ngModel].refresh();
			}
		};
	}]);
})(window, window.angular);