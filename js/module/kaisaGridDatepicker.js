(function(window, angular, undefined){
	'use strict';
	var app = angular.module('gridDatepicker',['common']);

	app.directive('gridDatepicker', ['$timeout','$window','$compile','$filter','constant',function($timeout,$window,$compile,$filter,constant) {
	    return {
	        replace:true,
	        templateUrl : '/html/grid/gridDatepicker.html',
	        link : function($scope, el, attrs){	 
	        	$scope.gridDatepicker = {
	        		weekArray : ['일','월','화','수','목','금','토'],
	        		hourArray : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
	        		minArray : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
	        		secArray : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
	        		group : false,
	        		dateFormat : null,
	        		firstDay  : function(o){ return new Date(o.getFullYear(),o.getMonth(), 1).getDay(); },
        			lastDay  : function(o){ return new Date(o.getFullYear(),o.getMonth() + 1,0).getDate(); },
        			addZero : function(n) { return n < 10 ? "0" + n : String(n); },
	        		active : false,
	        		target : null,
	        		style : {
	        			left: null,
	        			top: null
	        		},
	        		start : {
	        			name : null,
	        			date : null,
	        			dayArray : [],
	        			idx : null,
	        			hour : null,
	        			min : null,
	        			sec : null,
	    	            pick : function(i){
	    	            	this.date.setDate(i);
	    	            	this.idx = i;
	    	            }
	        		},
		        	prev : function(obj){
						obj.date.setMonth(obj.date.getMonth() - 1);
		        		this.makeDayArray(obj);
		        	},
		        	next : function(obj){
						obj.date.setMonth(o.date.getMonth() + 1);
		        		this.makeDayArray(obj);
		        	},
		        	close : function(){
		        		this.active = false;
		        	},
	        		open : function(obj){
	        			if(this.active){
	        				this.active = false;
	        				return;
	        			}
	        			this.dateFormat = (obj.dateFormat) ? obj.dateFormat : constant.dateFormat;
	        			this.active = true;
        				this.start.name = obj.startDate;
        				if(eval('$scope.' + obj.startDate)){
        					this.start.date = new Date(eval('$scope.' + obj.startDate));
        				}else{
        					this.start.date = new Date();
        				}
        				this.start.hour = this.addZero(this.start.date.getHours());
        				this.start.min = this.addZero(this.start.date.getMinutes());
        				this.start.sec = this.addZero(this.start.date.getSeconds());
        				this.makeDayArray(this.start);
	        			this.target = obj.target;
	        			this.style = {
        					left : obj.target.offset().left,
        					top : obj.target.offset().top,
        					marginLeft : obj.target.width() - angular.element('#gridDatepicker').width(),
        					marginTop : obj.target.height()
	        			}
        		    },
        		    confirm : function(){
    	            	this.start.date.setHours(parseInt(this.start.hour));
    	            	this.start.date.setMinutes(parseInt(this.start.min));
    	            	this.start.date.setSeconds(parseInt(this.start.sec));
        		    	eval('$scope.' + this.start.name + '="' +  $filter('date')(this.start.date,this.dateFormat) +'"');
        		    	this.close();
        		    },
        		    makeDayArray : function(o){
        		    	o.idx = o.date.getDate();
        		    	o.dayArray = [];
    	                for (var i = 0 ; i < this.firstDay(o.date) ; i++) {
    	                	o.dayArray.push(0-i);
    	                }
    	                for (var i = 0 ; i < this.lastDay(o.date) ; i++) {
    	                	o.dayArray.push(i + 1);
    	                }
    	            }
	        	}
	        }
	    };
	}]);
	
})(window, window.angular);