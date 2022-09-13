(function(window, angular, undefined){
	'use strict';
	var app = angular.module('layerDatepicker',['common']);

	app.directive('layerDatepickerCalendar',['$compile','$filter',function($compile,$filter){
    	return {
    		replace : true,
    		link: function($scope, el, attrs){
    			var model = el.parent().attr('data-model'),
    				strHtml = ''+
    		    '<div class="wrap">'+
	    			'<div class="head">'+
		    		    '<span class="prev icon" data-ng-click="'+model+'.picker.dateMove(-1)">&#xe046;</span>'+
		    		    '<span class="next icon" data-ng-click="'+model+'.picker.dateMove(+1)">&#xe048;</span>'+
		    		    '<h5>'+
			    		    '<strong data-ng-bind="'+model+'.picker.date | date:\'yyyy\'"></strong> 년 '+
			    		    '<strong data-ng-bind="'+model+'.picker.date | date:\'MM\'"></strong> 월'+
		    		    '</h5>'+
	    		    '</div>'+
	    		    '<div class="calendar">'+
		    		    '<div class="week" data-ng-repeat="val in '+model+'.picker.dateHead" data-ng-class="{sun:($index == 0)}">{{val}}</div>'+
		    		    '<div data-ng-class="{day:i.idx > 0}" data-ng-repeat="i in '+model+'.picker.day">'+
		    		    	'<span data-ng-class="{on:(i.idx == '+model+'.picker.selectIdx && ('+model+'.picker.date | date:\'yyyyMM\') == ('+model+'.picker.selectDate | date:\'yyyyMM\'))}" data-ng-click="'+model+'.picker.pick(i.idx)" data-ng-if="i.idx > 0"><strong>{{i.idx}}</strong></span>'+
		    		    '</div>'+
	    		    '</div>'+
    		    '</div>';
    			el.append($compile(strHtml)($scope));
    		}
    	}
    }]); 
	app.directive('layerDatepicker', ['$timeout','$window','$compile','$filter',function($timeout,$window,$compile,$filter) {
	    return {
	        replace:true,
	        scope : {
	        	model : '=',
	        },
	        link : function($scope){
	        	$scope.model = {
	        		active : false,
	        		toggle : function(o){
	        			(this.active) ? this.active = false : this.active = true;
						$scope.model.target = o.target;
						$scope.model.targetName = o.targetName;
						const i = new Date(o.target).getDate();
						angular.element('html').scrollTop(0);
						if(!o.target) {
							o.target = $filter('date')(new Date(),'yyyy-MM-dd');
						}
						this.picker.date = new Date(o.target);
						this.picker.selectIdx = i;
						this.picker.selectDate = new Date();
						this.picker.selectDate.setFullYear(this.picker.date.getFullYear());
						this.picker.selectDate.setMonth(this.picker.date.getMonth());
						this.picker.selectDate.setDate(i);

	        			$scope.model.style = {
	        				top : $(o.event.currentTarget).prev().offset().top + 25,
	        				left : $(o.event.currentTarget).prev().offset().left
	        			}
	        		},
        			init : function(options){
        		        this.picker.makeDays();
        		        this.picker.date.setMonth(new Date().getMonth());
						angular.extend(this, options);
        		        return this;
        		    },
	        		picker : {
	        			getFirstDay : function(year, month) { //첫째요일
			                return new Date(year, month, 1).getDay();
			            },
			        	getLastDay : function(year, month) { //마지막날짜
			                return new Date(year, month + 1, 0).getDate();
			            },
			            selectDate : '',
	        			date : new Date(),
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
	    	            	if($scope.model.callback){
	    	            		$scope.model.callback({
									target: $scope.model.target,
									targetName: $scope.model.targetName,
									model: $scope.model,
									selectDate: $filter('date')(this.selectDate,'yyyy-MM-dd')
								});
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
	        	}.init($scope.model);       	
	        }
	    };
	}]);
	
})(window, window.angular);