(function(window, angular, undefined){
	'use strict';
	var app = angular.module('oneDatepicker',['common']);
	

	//datePickerCalendar
	app.directive('oneDatepickerCalendar',['$compile','$filter',function($compile,$filter){
    	return {
    		replace : true,
    		link: function($scope, el, attrs){
    			$scope.getAddZero = function(n){
    				return n < 10 ? '0' + n : n;
    			}
    			var model = {
    				start : attrs.modelStart,
    				end : attrs.modelEnd,
    				todayYear : $filter('date')(new Date(),'yyyy'),
    				todayMonth : $filter('date')(new Date(),'MM'),
    				todayDay : $filter('date')(new Date(),'dd')
    			},
    			strHtml = ''+
    		    '<div>'+
	    		    '<span class="prev" data-ng-click="'+model.start+'.datePrev()">Prev</span>'+
	    		    '<span class="next" data-ng-click="'+model.start+'.dateNext()">Next</span>'+
	    		    '<h5>'+
		    		    '<strong data-ng-bind="'+model.start+'.date | date:\'yyyy\'" class="year"></strong> 년 '+
		    		    '<strong data-ng-bind="'+model.start+'.date | date:\'MM\'" class="month"></strong> 월'+
	    		    '</h5>'+
	    		    '<ol>'+
		    		    '<li>일</li>'+
						'<li>월</li>'+
						'<li>화</li>'+
						'<li>수</li>'+
						'<li>목</li>'+
						'<li>금</li>'+
						'<li>토</li>'+
		    		'</ol>'+   
		    		'<ul>'+
		    		    '<li data-ng-repeat="i in '+model.start+'.day" data-ng-class="{day:i > 0,on:(i == '+model.start+'.selectIdx)}" data-ng-bind="(i > 0) ? i : \'\'" data-ng-click="(i > 0) ? '+model.start+'.pick(i) : void(0)"></li>'+
		    		'</ul>'+
    		    '</div>';    			
    			el.append($compile(strHtml)($scope));
    		}
    	}
    }]);
	//datePicker Group
	app.directive('oneDatepicker', ['$timeout','$window','$compile','$filter',function($timeout,$window,$compile,$filter) {
	    return {
	        replace:true,
	        scope : {
	        	model : '=',
	        },
	        link : function($scope, el, attrs){
	        	
	        	//modelStart
	        	$scope.model = {
        			init : function(){
        		        for (var i in this) {
        		            if (typeof this[i] == 'object') {
        		            	this[i].parent = this;
        		            }
        		        }
        		        this.start.selectIdx = this.start.today();
        		        this.start.makeDays();
        		        this.start.date.setMonth(new Date().getMonth()-1);
        		        
        		        this.start.setStart(1); //최초 조회는 이전달로 셋팅
        		        return this;
        		    },
	        		start : {
	        			getFirstDay : function(year, month) { //첫째요일
			                return new Date(year, month, 1).getDay();
			            },
			        	getLastDay : function(year, month) { //마지막날짜
			                return new Date(year, month + 1, 0).getDate();
			            },
			            addZero : function(n) {
			            	return n < 10 ? "0" + n : n;
			            },
	        			date : new Date(),
	        			now : new Date(),
	        			today : function(){
	        				return this.now.getDate()
	        			},
	        			month : function(){
	        				return this.now.getMonth()
	        			},
	        			firstDay  : function(){
	        				return this.getFirstDay(this.date.getFullYear(),this.date.getMonth());
	        			},
	        			lastDay  : function(){
	        				return this.getLastDay(this.date.getFullYear(),this.date.getMonth());
	        			},
	        			setStart : function(idx){
	        				this.date = new Date();
	        				this.firstDay();
	    	                this.lastDay();
	    	                this.makeDays();
	    	            },
	    	            datePrev : function(){
	    	                this.date.setMonth(this.date.getMonth() - 1);                                
	    	                this.firstDay();
	    	                this.lastDay();
	    	                this.makeDays();
	    	            },
	    	            dateNext : function(){
	    	            	this.date.setMonth(this.date.getMonth() + 1);
	    	            	this.firstDay();
	    	            	this.lastDay();
	    	            	this.makeDays();
	    	            },
	    	            pick : function(i,s,e){
	    	            	var a = parseInt($filter('date')(s,'yyyyMM'+this.addZero(i))),
	    	            		b = parseInt($filter('date')(e,'yyyyMMdd'));
	    	            	if(a < b){
	    	            		return;
	    	            	}
	    	            	this.date.setDate(i);
	    	            	this.selectIdx = i;
	    	            	if(this.parent.startCallback){
	    	            		this.parent.startCallback();
	    	            	}
	    	            	
	    	            },
	    	            day : [],
	        			makeDays : function(){
	    	                this.day = [];
	    	                for (var i = 0 ; i < this.firstDay() ; i++) {
	    	                	this.day.push(0-i);
	    	                }                
	    	                for (var i = 0 ; i < this.lastDay() ; i++) {
	    	                	this.day.push(i + 1);
	    	                }
	    	            },
	    	            selectDate : function(i){
	        				return this.date.getYear() + this.date.getMonth() + this.date.getDate(i);
	        			},
	        			selectIdx : null
	        		}
	        	}.init();       	
	        }
	    };
	}]);
	
})(window, window.angular);