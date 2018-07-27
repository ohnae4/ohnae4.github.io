(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('filter', []);
	// trustHtml
	app.filter('trustHtml',['$sce',function($sce){
		return function(value){
			return value ? $sce.trustAsHtml(value.replace(/\n/g,'<br>')) : '';
		}
	}]);
	app.filter('trustUrl',['$sce',function($sce){
		return function(url){
			return $sce.trustAsResourceUrl(url);
		}
	}]);
	app.filter('startFrom',function(){
		return function(input, start){
			start = +start; // parse to int
			return input.slice(start);
		}
	});
	// highlight
	app.filter('highlight',['$sce',function($sce){
		return function(text, search){
			search = search.split(/[\s~!@#\$%\^\-_+=\|,\.\?\/\\`&*'"\.,:;(){}<>\[\]]+/);
			for( var i in search){
				if(search[i] == ''){
					search.splice(i,1);
				}
			}
			if(text && search){
				return $sce.trustAsHtml(text.replace(new RegExp(search,'gi'),'<b>$&</b>'));
			}
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
	// 바이트수 반환
	app.filter('checkByteToNumber',[function(){
		return function fnGetByteLen(str){
			var ibyte = 0;
			if(str != null){
				for(var i = 0;i < str.length;i++){
					var tmp = escape(str.charAt(i));
					if(tmp.length == 1)
						ibyte++;
					else if(tmp.indexOf("%u") != -1)
						ibyte += 3;
					else if(tmp.indexOf("%") != -1)
						ibyte += tmp.length / 3;
				}
			}
			return ibyte;
		}
	}]);
	// 가격 - currency string 응용
	app.filter('toCurrency',['$filter','$locale',function(filter, locale){
		var currencyFilter = filter('currency');
		var formats = locale.NUMBER_FORMATS;
		return function(amount, num, symbol){
			var value = currencyFilter(amount,'',0) + '원';
			return value;
		};
	}]);
	// 가격 - currency html binding
	app.filter('toHtmlCurrency',['$filter','$locale','$sce',function(filter, locale, $sce){
		var currencyFilter = filter('currency');
		var formats = locale.NUMBER_FORMATS;
		return function(amount, num, symbol){
			var value = currencyFilter(amount,'',2);
			return $sce.trustAsHtml('<strong>' + value + '</strong> <em>¥</em>');
		};
	}]);
	// 숫자 콤마
	app.filter('toComma',['$filter','$locale',function(filter, locale){
		var currencyFilter = filter('currency');
		var formats = locale.NUMBER_FORMATS;
		return function(amount, num, symbol){
			var value = currencyFilter(amount,'',0);
			return value;
		};
	}]);
	// 글자자르기 (...) (limitTo)
	app.filter('cutString',[function(){
		return function(str, len){
			var reStr = '';
			if(str){
				if(str.length <= len){
					reStr = str;
				}else{
					reStr = str.substring(0,len) + '...';
				}
			}
			return reStr;
		}
	}]);
	// trustBrHtml
	app.filter('trustBrHtml',['$sce',function($sce){
		return function(value){
			return value ? $sce.trustAsHtml(value.replace(/\n/g,'<br>')) : '';
		}
	}]);
	// to number
	app.filter('int',[function(){
		return function(n){
			return parseInt(n);
		}
	}]);
	// 소수점 올림
	app.filter('ceil',[function(){
		return function(n){
			return Math.ceil(n);
		}
	}]);
	// maxlen으로 문자열 자름.
	app.filter('cutByteLenth',[function(){
		return function(s, maxlen){
			if(!s){
				return;
			}
			var len = 0;
			var clen = 0;
			for(var i = 0;i < s.length;i++){
				var c = escape(s.charAt(i));
				if(c.length == 1){
					len++;
				}else if(c.indexOf("%u") != -1){
					len += 3;
				}else if(c.indexOf("%") != -1){
					len += c.length / 3;
				}
				if(len <= maxlen){
					clen = i + 1;
				}
			}
			if(len > maxlen){
				s = s.substring(0,clen);
			}
			return s;
		}
	}]);
	// 소수점 반올림
	app.filter('round',[function(){
		return function(n){
			return Math.round(n);
		}
	}]);
	// 소수점 내림
	app.filter('floor',[function(){
		return function(n){
			return Math.floor(n);
		}
	}]);
	// 공통 상품 아이콘
	app.filter('iconArea',['$sce',function($sce){
		return function(arr, type){
			if(!arr){
				return;
			}
			arr = arr.split(',');
			var str = '';
			for(val in arr){
				switch(val){
				case '01':
					str += '<span class="tag_best">tag_best</span> ';
					break;
				case '02':
					str += '<span class="tag_new">tag_new</span> ';
					break;
				case '03':
					str += '<span class="tag_md">tag_md</span> ';
					break;
				case '04':
					str = '<span class="tag_notax">tag_notax</span> ' + str;
					break; // 순서상 보세상품이 첫번째 아이콘
				default:
					break;
				}
			}
			return $sce.trustAsHtml(str);
		};
	}]);
	// editor로 작성된 HTML
	app.filter("stringToHtml",['$sce',function($sce){
		return function(htmlCode, host){
			if(!htmlCode){
				return;
			}
			// 이미지 경로 변경.
			var RegExpAll = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/img;
			var matches = htmlCode.match(RegExpAll);
			if(matches){
				for(var i = 0;i < matches.length;i++){
					var index = matches[i].indexOf('src');
					var repalceText = matches[i].substring(0,index + 5) + host + "/" + matches[i].substring(index + 6,matches[i].length);
					htmlCode = htmlCode.replace(matches[i],repalceText);
				}
			}
			return $sce.trustAsHtml(htmlCode);
		}
	}]);
	// 번호 히든처리 (86102*****16) //Param : arr = '*' 처리의 시작과 끝자리
	app.filter("numberHidden",[function(){
		return function(str, arr){
			if(!str || !arr){
				return;
			}
			var numFirst = str.substring(0,arr[0]), numLast = str.substring(arr[1],str.length), numHide = str.substring(arr[0],arr[1]), start = '';
			for(var i = 0;i < numHide.length;i++){
				start += '*';
			}
			return numFirst + start + numLast;
		}
	}]);
	// 들어온 문자열을 첫 번째 엔터까지 잘라 반환
	app.filter("cutFirstLine",[function($sce){
		return function(str){
			var line = str.split("\n");
			for( var i in line){
				if(line[i] != ""){
					return line[i];
				}
			}
		}
	}]);
	app.filter('payCode', function() {
		return function(str) {
			if(!str){ return str; }
			switch (str) {
			case '1': str = '예약중'; break;
			case '2': str = '결제확인'; break;
			case '3': str = '취소'; break;
			default: break;
			}
			return str;
		}
	});
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
	app.filter('ynCode', function() {
		return function(str) {
			if(!str){ return str; }
			switch (str) {
				case 'Y': str = '예'; break;
				default: str = '아니요'; break;
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