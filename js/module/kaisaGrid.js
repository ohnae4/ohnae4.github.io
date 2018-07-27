/**
 * ECBASE Project
 * grid ver 0.0.1
*/

(function(window, angular, undefined){
	'use strict';
	var app = angular.module('grid',['common']);

	app.service('kaisaGrid',['$http','$httpParamSerializerJQLike','$timeout','$filter','constant',function($http,$httpParamSerializerJQLike,$timeout,$filter,constant){
		this.init = function($scope, grid){
			var originData = new Array(),
			defaultOptions = {
				name : null,
				header : new Array(),
				headerSorting : true,
				headerOptions : {
					key : null,
					name : null,
					type : null,
					width : 100,
					minWidth : 50,
					length : 20,
					visible : true,
					disabled : false,
					align : 'left',
					required : false
				},
				message : null,
				data : new Array(),
				orderBy : null,
				height: 487,
				allCheck : false,
				requiredArray : new Array(),
				dateArray : new Array(),
				total : 0,
				searchUrl : null,
				searchParam : {
					startDate : $filter('date')(new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd') + ' 00:00',
					endDate : $filter('date')(new Date(), 'yyyy-MM-dd') + ' 23:59',
					limitPage : '10',
					currentPage : '1'
				},
				search : function(){
					$http.get(this.searchUrl,{params : this.searchParam }).then(function(resp){
						if(resp.data.resultMap.success) {
							grid.data = resp.data.resultMap.items;
							grid.total = resp.data.resultMap.total;
							grid.message = resp.data.message;
						}
						//datetime format
						grid.data.forEach(function(o,i){
							for(var j in o){
								for(var k in defaultOptions.dateArray){
									if(j == defaultOptions.dateArray[k].key){
										o[j] = $filter('date')(new Date(o[j]), (defaultOptions.dateArray[k]['dateFormat']) ? defaultOptions.dateArray[k]['dateFormat'] : constant.dateFormat);
									}
								}
							}
						});
						originData = angular.copy(grid.data);
						//current
						grid.currentPageArray = [];
						for(var i = 0; i < Math.ceil(grid.total / grid.searchParam.limitPage); i++){
							grid.currentPageArray.push({value : String(i + 1)})
						}
			        });
				},
				moved : function(i){
					console.log(i);
				},

				/**
				 * @util
				 */
				empty : function(o){
					if(o == null || o == '' || typeof o == 'undefined'){
						return true;
					}
					return false;
				},
				/**
				 * @paging
				 */
				currentPageArray : [
					{value : '1'}
				],
				currentChange : function(){
					this.search();
				},
				limitPageArray : [
					{value : '10'},
					{value : '20'},
					{value : '50'},
					{value : '100'},
					{value : '300'}
				],
				limitChange : function(){
					this.searchParam.currentPage = '1';
					this.search();
				},
				reset : function(idx){
					grid.data = angular.copy(originData);
				},
				searchReset: function(idx){
					grid.data = angular.copy(originData);
					grid.orderBy = null;
				},
				valid : function(o){
					var bool = true;
					grid.requiredArray.some(function(k,idx){
						for(var i in o){
							if(! o[k.key] || (k.key == i && grid.empty(o[i]))){
								$scope.alert.open({message:k.name + '을 작성해주세요'});//callback : inValidFocus
								bool = false;
							}
						}
					});
					return bool;
				},
				/**
				 * @save data
				 * */
				saveUrl : null,
				gridData : new Array(),
				save : function(){
					var failBool = false,
						selectedCount = 0;
					grid.gridData = [];
					grid.data.some(function(o){
						if(o.SELECTED){
							selectedCount++;
							switch(o.CRUD) {
								case 'C':
									if(grid.valid(o)){
										grid.gridData.push(o);
									}else{
										failBool = true;
									}
									break;
								case 'U':
									if(grid.valid(o)){
										grid.gridData.push(o);
									}else{
										failBool = true;
									}
									break;
								case 'D':
									grid.gridData.push(o);
									break;
							}
						}
					});
					if(selectedCount == 0){
						$scope.alert.open({message:'변경사항이 없습니다.'});
						return;
					}
					if(failBool){
						return;
					}else{
						var value = $httpParamSerializerJQLike({params : JSON.stringify(angular.copy(grid.gridData))});
						
						/**
						 * TO-DO : save
						 * */
						console.log(grid.gridData);
						console.log('TO-DO : save')
						return;
						
						$http.post(this.saveUrl, value, $scope.postConfig).then(function(resp){
							if(resp.data.success) {
								$timeout(function(){
									grid.searchParam.currentPage = '1';
									//grid.reset();
									grid.search();
									/*grid.gridData = [];*/
									
									/*grid.message = resp.data.message;
									grid.originData = angular.copy(grid.data);
									grid.data = angular.copy(grid.originData);
									$scope.$apply();
									grid.reset();*/
									
									grid.callBack();
								},300);
							}
				        });
					}
				},
				callBack : function(){},
				colAllCheck : function(){
					if(this.allCheck){
						grid.data.forEach(function(o){
							o.SELECTED = true;
						});
					}else{
						grid.data.forEach(function(o){
							o.SELECTED = false;
						});
					}
				},
				colCheck : function(){
					grid.data.forEach(function(o){
						if(! o.SELECTED && o.CRUD != '' && o.CRUD != 'C'){
							o.CRUD = '';
						}
					});
				},
				sorting : function(key){
					if(this.orderBy == key){
						this.orderBy = '-' + key;
						return;
					}
					this.orderBy = '' + key;
				},
				add : function(){
					grid.data.unshift({CRUD : 'C', SELECTED : true});
				},
				remove : function(){
					grid.data.forEach(function(o,idx){
						if(o.SELECTED){
							grid.data[idx].CRUD = 'D';
						}
					});
				},
				/**
				 * @grid ststus
				 * */
				key : null,
				col : null,
				row : null,
				value : null,
				selectedKey : null,
				selectedCol : null,
				selectedRow : null,
				selectedValue : null,
				
				beforeKey : null,
				beforeCol : null,
				beforeRow : null,
				beforeValue : null,
				gridClick : function(e){
					//TO-DO 
				},
				/**
				 * @col
				 * */
				
				layerSelected : {
					left: '-100px',
					top: '-100px',
					width: '100px',
					height: '20px'
				},
				
				colClick : function(key, col, row){
					var cell = $('.gridT.'+this.name+' td[data-grid-col="'+col+'"][data-grid-row="'+row+'"]');
					
					var scrollLeft = $('.gridWrap.'+this.name).scrollLeft()
					
					
					if(cell.length > 0){
						this.layerSelected.left = cell.position().left - 2 + scrollLeft;
						this.layerSelected.top = cell.position().top -2;
						this.layerSelected.width = cell.find('.gridItemWrapper').width() + 6;
						this.layerSelected.height = cell.find('.gridItemWrapper').height() + 6;
					}
					/*
					this.beforeKey = this.selectedKey;
					this.beforeCol = this.selectedCol;
					this.beforeRow = this.selectedRow;
					this.beforeRow = this.selectedRow;
					this.beforeValue = this.selectedValue;
				    */
					
					this.selectedKey = key;
					this.selectedCol = col;
					this.selectedRow = row;
					this.selectedValue = this.value;
					/**
					 * TODO : Customer event
					 */
				},
				colMouseOver : function(key, col, row){
					this.key = key;
					this.col = col;
					this.row = row;
					this.value = this.data[this.row][this.key];
				},
				colMouseOut : function(){
				},

				headMouseOver : function(col){
					this.col = col;
				},
				headMouseOut : function(){
				},
				colDoubleClick : function(){
					var cdata = this.data[this.row];
					cdata.SELECTED = true;
					if(cdata.CRUD == 'C'){
						return;
					}
					cdata.CRUD = 'U';
				},
				/**
				 * @colResize event
				 * */
				colResizing : false,
				colResizeIndex : null,
				colResizeStartX : null,
				colResizeStartWidth : null,
				colResizeMousedown : function($event,chead){
					this.colResizing = true;
					this.colResizeStartX = $event.pageX;
					this.colResizeIndex = chead.index;
					this.colResizeStartWidth = chead.width;
				},
				/**
				 * @colMove event
				 * */
				mouseMoveEvent : null,
				mouseMove : function($event){
					this.mouseMoveEvent =$event;
					if(grid.colResizing) {
						var colSize = grid.colResizeStartWidth + ($event.pageX - grid.colResizeStartX);
						if(colSize > 80){
							grid.header[grid.colResizeIndex].width = colSize;
						}
 			        }
				},
				mouseUp : function($event){
					grid.colResizing = false;
					grid.colMoving = false;
				},
				mouseLeave : function($event){
					grid.colResizing = false;
					grid.colMoving = false;
				},
				/**
				 * @datepicker 연결 (시작 검색 날짜 설정)
				 * */
				gridDatepicker : function(key,rowIdx,colIdx,e){
					$scope.gridDatepicker.open({
						scope : this.name,
						startDate : this.name + '.data['+rowIdx+'].' + key,
						dateFormat : this.header[colIdx].dateFormat,
						target : angular.element(e.target).parent()
					});
				},
				/**
				 * @excelExport
				 * */
				excelExport : function(){
					var alertConfirm = confirm('엑셀 다운로드 받겠습니까?');
					if (!alertConfirm) {
					    return;
					}
					var thead = '',tbody = '',arrKey = new Array();
					this.header.forEach(function(o,i){
						if(o.name && o.key != 'CRUD' && o.key != 'SELECTED' && o.visible){
							thead += '<th>' + o.name + '</th>';
							arrKey.push(o.key);
						}
					});
					this.data.forEach(function(o){
						tbody += '<tr>';
						for(var i in arrKey){
							for(var j in o){
								if(j == arrKey[i]){
									tbody += '<td>' + o[j] + '</td>';
								}
							}
						}
						tbody += '</tr>';
					});
					var excelHtml = '<table><thead><tr>'+thead+'</tr></thead><tbody>'+tbody+'</tbody></table>';
					if($scope.browser.ie){
						var excelFrame = eval(this.name+'ExcelFrame');
						excelFrame.document.open("txt/html", "replace");
						excelFrame.document.write(excelHtml);
						excelFrame.document.close();
						excelFrame.focus();
						excelFrame.document.execCommand('SaveAs',true,this.name+'.xls');
					}else{
						window.open('data:application/vnd.ms-excel;charset=utf-8,%EF%BB%BF' + encodeURIComponent(excelHtml));
					}
				}
			};
			grid.header.forEach(function(chead,idx){
				chead.index = idx;
				if(chead.required){
					defaultOptions.requiredArray.push({
						name : chead.name,
						key : chead.key
					});
				}
				if(chead.type == 'Date'){
					defaultOptions.dateArray.push({
						name : chead.name,
						key : chead.key,
						dateFormat : chead['dateFormat']
					});
				}
			});
			grid = angular.extend(defaultOptions, grid);
			return grid;
		};
	}]);
	app.directive('kaisaGrid',[function(){
    	return {
    		templateUrl : '/html/grid/grid.html',
    		scope : {
	        	model : '=',
	        	page : '='
	        },
    		replace : true,
    		link : function($scope, el, attrs){}
    	}
    }]);
	app.directive('kaisaGridPaging',[function(){
    	return {
    		templateUrl : '/html/grid/gridPaging.html',
    		scope : {
	        	model : '=',
	        	page : '='
	        },
    		replace : true,
    		link : function($scope, el, attrs){}
    	}
    }]);
})(window, window.angular);