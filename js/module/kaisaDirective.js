(function(window, angular, undefined){
	'use strict';
	var app = angular.module('directive',['common']);
	app.directive('kaisaHeader',[function(){
		return {
			templateUrl: '/html/header.html',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('kaisaAdminHeader',[function(){
		return {
			template: '<div id="adminHeader">'+
				'<h1><a href="/">Chloris Admin</a></h1>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('kaisaAdminMenu',[function(){
		return {
			template: '<div id="adminMenu">'+
				'<ul>'+
					'<li data-ng-repeat="(idx, i)  in adminMenuList"><a data-ng-href="{{commonLink({url:i.url,href:true})}}">{{i.title}}</a></li>'+
				'</ul>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('kaisaMenu',[function(){
		return {
			templateUrl: '/html/menu.html',
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
					'<li><strong>주소:</strong> 경기도 가평군 가평읍 금대리 305-6 클로리스</li>'+
					'<li><strong>도로명:</strong> 경기도 가평군 가평읍 북한강변로 536 클로리스</li>'+
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
			templateUrl: '/html/footer.html',
			replace: true,
			link: function($scope, el, attrs){
				var container = document.getElementById('map');
				var options = {
					center: new kakao.maps.LatLng(37.85793516428404, 127.51808523634688),
					level: 3,
					marker: {
						position: new kakao.maps.LatLng(37.85793516428404, 127.51808523634688)
					},
					draggable: false,
					// mapTypeId: kakao.maps.MapTypeId.HYBRID, // SKYVIEW,
					disableDoubleClick: false,
					disableDoubleClickZoom: false,
					keyboardShortcuts: false
				};
				var map = new kakao.maps.Map(container, options); // 경기도 가평군 가평읍 물안산길 25-21
				var zoomControl = new kakao.maps.ZoomControl();
				map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

				var marker = new kakao.maps.Marker({
					map: map,
					title: '경기 가평군 가평읍 마장리 83',
					position: new kakao.maps.LatLng(37.85793516428404, 127.51808523634688)
				});
			}
		}
	}]);
	app.directive('kaisaUnit',[function(){
		return {
			templateUrl: '/html/unit.html',
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