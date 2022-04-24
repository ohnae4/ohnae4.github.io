(function(window, angular, undefined){
	'use strict';
	var app = angular.module('layerDatePicker',['common']);

	app.directive('layerDatePickerCalendar',['$compile','$filter',function($compile,$filter){
    	return {
    		replace : true,
    		link: function($scope, el, attrs){
    			var model = el.parent().attr('data-model'),
    				strHtml = ''+
    		    '<div class="wrap">'+
	    			'<div class="head">'+
		    		    '<span class="prev" data-ng-click="'+model+'.start.dateMove(-1)">Prev</span>'+
		    		    '<span class="next" data-ng-click="'+model+'.start.dateMove(+1)">Next</span>'+
		    		    '<h5>'+
			    		    '<strong data-ng-bind="'+model+'.start.date | date:\'yyyy\'"></strong> 년 '+
			    		    '<strong data-ng-bind="'+model+'.start.date | date:\'MM\'"></strong> 월'+
		    		    '</h5>'+
	    		    '</div>'+
	    		    '<div class="calendar">'+
		    		    '<div class="week" data-ng-repeat="val in '+model+'.start.dateHead" data-ng-class="{sun:($index == 0)}">{{val}}</div>'+
		    		    '<div data-ng-class="{day:i.idx > 0}" data-ng-repeat="i in '+model+'.start.day">'+
		    		    	'<span data-ng-class="{on:(i.idx == '+model+'.start.selectIdx && ('+model+'.start.date | date:\'yyyyMM\') == ('+model+'.start.selectDate | date:\'yyyyMM\'))}" data-ng-click="'+model+'.start.pick(i.idx)" data-ng-if="i.idx > 0"><strong>{{i.idx}}</strong></span>'+
		    		    '</div>'+
	    		    '</div>'+
    		    '</div>';
    			el.append($compile(strHtml)($scope));
    		}
    	}
    }]);
	app.directive('layerDatePicker', ['$timeout','$window','$compile','$filter',function($timeout,$window,$compile,$filter) {
	    return {
	        replace:true,
	        scope : {
	        	model : '=',
	        },
	        link : function($scope, el, attrs){
	            var addZero = function(n) {
	            	return n < 10 ? "0" + n : n;
	            };
	        	$scope.model = {
	        		active : false,
	        		toggle : function(e){
	        			(this.active) ? this.active = false : this.active = true;
	        			$scope.model.style = {
	        				top : $(e.currentTarget).prev().offset().top + 25,
	        				left : $(e.currentTarget).prev().offset().left
	        			}
	        		},
        			init : function(){
        		        for (var i in this) {
        		            if (typeof this[i] == 'object') {
        		            	this[i].parent = this;
        		            }
        		        }
        		        this.start.selectIdx = this.start.today();
        		        this.start.makeDays();
        		        this.start.date.setMonth(new Date().getMonth());
        		        return this;
        		    },
	        		start : {
	        			getFirstDay : function(year, month) { //첫째요일
			                return new Date(year, month, 1).getDay();
			            },
			        	getLastDay : function(year, month) { //마지막날짜
			                return new Date(year, month + 1, 0).getDate();
			            },
			            selectDate : '',
	        			date : new Date(),
	        			now : new Date(),
	        			today : function(){
	        				return this.now.getDate()
	        			},
	        			dateHead : ['일','월','화','수','목','금','토'],
	        			dateMove : function(n){
	        				var date = Math.min(this.date.getDate(), this.getLastDay(this.date.getFullYear(), this.date.getMonth() + n));
	        			    this.date.setMonth(this.date.getMonth() + n, date);
	        			    this.makeDays();
	        			},
	    	            pick : function(i){
	    	            	this.date.setDate(i);
	    	            	this.selectIdx = i;
	    	            	this.selectDate = new Date();
	    	            	this.selectDate.setFullYear(this.date.getFullYear());
	    	            	this.selectDate.setMonth(this.date.getMonth());
	    	            	this.selectDate.setDate(i);
	    	            	if(this.parent.startCallback){
	    	            		this.parent.startCallback();
	    	            	}
	    	            },
	    	            day : [],
	    	            firstDay  : function(){
	        				return this.getFirstDay(this.date.getFullYear(),this.date.getMonth());
	        			},
	        			lastDay  : function(){
	        				return this.getLastDay(this.date.getFullYear(),this.date.getMonth());
	        			},
	        			makeDays : function(){
	    	                this.day = [];
	    	                for (var i = 0 ; i < this.firstDay() ; i++) {
	    	                	this.day.push({idx : 0 - i});
	    	                }                
	    	                for (var i = 0 ; i < this.lastDay() ; i++) {
	    	                	this.day.push({idx : i + 1});
	    	                }
	    	            },
	        			selectIdx : null
	        		}
	        	}.init();       	
	        }
	    };
	}]);
	
})(window, window.angular);