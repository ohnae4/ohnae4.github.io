(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('filter', []);
	app.filter('trustHtml',['$sce', function($sce) {
    	return function(value) {
    		return value ? $sce.trustAsHtml(value.replace(/\n/g,'<br>')) : '';
    	}
    }]);
	//유니크 items
	app.filter('unique', [function(){
        return function(data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
            	var results = [];
            	var keys = {};
            	for (var i = 0; i < data.length; i++) {
            		var val = data[i][propertyName];
            		if (angular.isUndefined(keys[val])) {
            			keys[val] = true;
            			results.push(val);
            		}
            	}
            	return results;
            } else {
            	return data;
            }
        }
    }]);
	
	app.filter('roomNameCode', function() {
		return function(str) {
			if(!str){ return str; }
			switch (str) {
			case '1': str = '다크엔젤'; break;
			case '2': str = '화이트샤인'; break;
			case '3': str = '핑크레이디'; break;
			case '4': str = '라임오렌지'; break;
			case '5': str = '블루밍'; break;
			case '6': str = '산들바람'; break;
			default: break;
			}
			return str;
		}
	});
	app.filter('roomStatusCode', function() {
		return function(str) {
			if(!str){ return str; }
			switch (str) {
			case '1': str = '예약가능'; break;
			case '2': str = '예약중'; break;
			case '3': str = '예약완료'; break;
			case '4': str = '취소'; break;
			default: break;
			}
			return str;
		}
	});
	app.filter('roomTypeCode', function() {
		return function(str) {
			if(!str){ return str; }
			switch (str) {
			case '1': str = '원룸(침실)'; break;
			case '2': str = '방1+거실+화1'; break;
			case '3': str = '원룸(온돌)'; break;
			default: break;
			}
			return str;
		}
	});
	app.filter('maskPhone', function() {
		return function(str) {
			if(!str){
				return str;
			}
			try {
				str = str.replace(/(\d\d\d)(\d\d\d\d)(\d\d\d)/, '$1-$2-$3');
			} catch (e) {
				console.log('mask error');
			}
			return str;
		}
	});
	app.filter('maskName', function() {
		return function(str) {
			if(!str){
				return str;
			}
			try {
				str = str.charAt(0) + ' * ' + str.charAt(str.length - 1);
			} catch (e) {
				console.log('mask error');
			}
			return str;
		}
	});	
	app.filter('uniqueItems', [function(){
        return function(data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
            	var results = [];
            	var keys = {};
            	for (var i = 0; i < data.length; i++) {
            		var val = data[i][propertyName];
            		if (angular.isUndefined(keys[val])) {
            			keys[val] = true;
            			results.push(val);
            		}
            	}
            	return results;
            } else {
            	return data;
            }
        }
    }]);
})(window, window.angular);