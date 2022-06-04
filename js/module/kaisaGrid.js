/**
 * grid ver 0.0.1
*/
(function(window, angular, undefined){
	'use strict';
	var app = angular.module('grid',['common']);
	app.service('kaisaGrid',['$http','$httpParamSerializerJQLike','$timeout','$filter','constant'
	                ,function($http , $httpParamSerializerJQLike , $timeout , $filter , constant){
		this.init = function($scope, grid){
			var originData = new Array(),
			defaultOptions = {
				name: null,
				isAdmin: $scope.admin.user,
				originIndex: -1, // data row 마다 1++ 증가
				header: new Array(),
				headerSorting: true,
				headerOptions: {
					key: null,
					name: null,
					type: null,
					width: 100,
					minWidth: 50,
					length: 20,
					visible: true,
					disabled: false,
					align: 'left',
					required: false
				},
				message: null,
				data: new Array(),
				orderBy: null,
				height: 230,
				allCheck: false,
				total: 0,
				requiredArray: new Array(),
				dateArray: new Array(),
				numberArray: new Array(),
				searchUrl: null,
				searchParam: {
					startDate: $filter('date')(new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd') + ' 00:00:00',
					endDate: $filter('date')(new Date(), 'yyyy-MM-dd') + ' 23:59:59',
					limitPage: '100',
					currentPage: '1'
				},
				search: function(){
					$http.post(this.searchUrl, this.searchParam, $scope.postConfig).then(function(resp){
						if(resp.data.success) {
							grid.data = resp.data.items;
							grid.total = resp.data.items.length;
							grid.message = resp.data.message;
						}
						for(var i in grid.data){
							grid.originIndex++;
							grid.data[i].originIndex = grid.originIndex;
							for(var j in grid.data[i]){
								//Datetime format
								for(var k in defaultOptions.dateArray){
									if(j == defaultOptions.dateArray[k].key){
										grid.data[i][j] = $filter('date')(new Date(grid.data[i][j]), (defaultOptions.dateArray[k]['dateFormat']) ? defaultOptions.dateArray[k]['dateFormat']: constant.dateFormat);
									}
								}
								//Number(for sort)
								for(var h in defaultOptions.numberArray){
									if(j == defaultOptions.numberArray[h].key){
										grid.data[i][j] = parseInt(grid.data[i][j]);
									}
								}
							}
						}
						originData = angular.copy(grid.data);
						//current
						grid.currentPageArray = [];
						for(var i = 0; i < Math.ceil(grid.total / grid.searchParam.limitPage); i++){
							grid.currentPageArray.push({value: String(i + 1)})
						}
						$scope.loading.active = false;
			        },function(resp){
				    	$scope.alert.open({message: 'grid search error'});
				    	$scope.loading.active = false;
				    });
				},
				/**
				 * @util
				 */
				empty: function(o){
					if(o == null || o == '' || typeof o == 'undefined'){
						return true;
					}
					return false;
				},
				/**
				 * @paging
				 */
				currentPageArray: [
					{value: '1'}
				],
				currentChange: function(){
					this.search();
				},
				limitPageArray: [
					{value: '10'},
					{value: '20'},
					{value: '50'},
					{value: '100'},
					{value: '300'},
					{value: '1000'}
				],
				limitChange: function(){
					this.searchParam.currentPage = '1';
					this.search();
				},
				reset: function(idx){
					grid.data = angular.copy(originData);
				},
				searchReset: function(idx){
					grid.data = angular.copy(originData);
					grid.orderBy = null;
				},
				valid: function(o){
					var bool = true;
					grid.requiredArray.some(function(k,idx){
						for(var i in o){
							if(! o[k.key] || (k.key == i && grid.empty(o[i]))){
								$scope.alert.open({message:k.name + '을 작성해주세요'});//callback: inValidFocus
								bool = false;
							}
						}
					});
					return bool;
				},
				/**
				 * @save data
				 * */
				saveUrl: null,
				gridData: new Array(),
				save: function(){
					if(!this.isAdmin) {
						$scope.alert.open({message:'권한이 없습니다.'});
						return false;
					}
					var failBool = false,
						selectedCount = 0;
					grid.gridData = [];
					for(var i in grid.data){
						var o = grid.data[i];
						if(o.SELECTED){
							selectedCount++;
							if(o.CRUD != 'R') {
								if(grid.valid(o)){
									grid.gridData.push(o);
								}else{
									failBool = true;
								}
							}
						}
					};
					if(selectedCount == 0){
						$scope.alert.open({message:'변경사항이 없습니다.'});
						return;
					};
					if(failBool){
						return;
					}else{
						//var params = $httpParamSerializerJQLike({params: JSON.stringify(angular.copy(grid.gridData))});
						var params = {params: JSON.stringify(angular.copy(grid.gridData))};
						$http.post(this.saveUrl, params, $scope.postConfig).then(function(resp){
							if(resp.data.success) {
								$timeout(function(){
									grid.message = resp.data.message;
									grid.searchParam.currentPage = '1';
									grid.search();
									grid.callBack();
								},300);
							}else{
								$scope.alert.open({message:resp.data.message});
							}
							$scope.loading.active = false;
				        },function(resp){
					    	$scope.alert.open({message: 'grid save error'});
					    	$scope.loading.active = false;
					    });
					};
				},
				callBack: function(){},
				colAllCheck: function(){
					if(this.allCheck){
						for(var i in grid.data){
							grid.data[i].SELECTED = true;
						}
					}else{
						for(var i in grid.data){
							grid.data[i].SELECTED = false;
							grid.data[i].CRUD = '';
						}
					};
				},
				colCheck: function(originIndex, isCheck){
					var row = this.getIndex(originIndex);
					if(!isCheck){
						grid.data[row].CRUD = '';
					}
				},
				sorting: function(key){
					if(this.orderBy == key){
						this.orderBy = '-' + key;
						return;
					}
					this.orderBy = '' + key;
				},
				add: function(){
					var cnt = 0;
					for(var i in grid.data){
						if(grid.data[i].CRUD === 'C'){
							cnt++;
						}
						if(cnt >= 1) {
							$scope.alert.open({message:'하나씩밖에 추가할 수 없습니다.'});
							return false;
						}
					}
					var o = {};
					for(var i in grid.header){
						o[grid.header[i].key] = (grid.header[i].optionDefault) ? grid.header[i].optionDefault: '';
					}
					o.CRUD = 'C';
					o.SELECTED = true;
					grid.data.unshift(o);
				},
				remove: function(){
					for(var i in grid.data){
						if(grid.data[i].SELECTED){
							grid.data[i].CRUD = 'D';
						}
					};
				},
				/**
				 * @grid ststus
				 * */
				key: null,
				col: 0,
				row: 0,
				value: null,
				selectedKey: null,
				selectedCol: 0,
				selectedRow: 0,
				selectedValue: null,
				/**
				 * wapper event
				 */
				drag: {
					left: null,
					top: null,
					width: null,
					height: null,
					active: false,
					timeStamp: null
				},
				gridClick: function(e){
					this.colResizing = false;
					this.drag.active = false;
				},
				gridMousedown: function(e){
					$(window).off('mouseup:grid').on('mouseup:grid', function(){
						grid.gridMouseUp();
					});
					/*
					this.drag.active = true;
					this.drag.width = 0;
					this.drag.height = 0;
					this.drag.left = e.pageX - 5;
					this.drag.top = e.pageY - 5;
					this.drag.timeStamp = e.timeStamp;
					*/
				},
				gridMouseUp: function($event){
					this.colResizing = false;
					this.drag.active = false;
				},
				gridKeyUp: function($event) {
					if ($event.keyCode == 67 && ($event.ctrlKey || $event.metaKey)) { // TODO metaKey
						// this.copyToClipboard('Hello World4');
					}
				},
				/**
				 * @col
				 * */
				colClick: function(key, col, originIndex){
					var row = this.getIndex(originIndex);
					this.key = key;
					this.col = col;
					this.row = row;
					this.value = this.data[this.row][this.key];
					var cell = $('.gridT.'+this.name+' td[data-grid-col="'+col+'"][data-grid-row="'+row+'"]');
					var scrollLeft = $('.gridWrap.'+this.name).scrollLeft();
				},
				isDoubleClick: true,
				colDoubleClick: function(){
					if(!this.isDoubleClick) {
						return false;
					}
					var cdata = this.data[this.row];
					cdata.SELECTED = true;
					if(cdata.CRUD == 'C'){
						return;
					};
					cdata.CRUD = 'U';
				},
				/**
				 * @colResize event
				 * */
				colResizing: false,
				colResizeIndex: null,
				colResizeStartX: null,
				colResizeStartWidth: null,
				colResizeMousedown: function($event,chead){
					this.colResizing = true;
					this.colResizeStartX = $event.pageX;
					this.colResizeIndex = chead.originIndex;
					this.colResizeStartWidth = chead.width;
				},
				colResizeDblclick: function($event,chead){ // head 경계선 더블클릭
					// console.log($event,chead);
				},
				/**
				 * @colMove event
				 * */
				mouseMoveEvent: null,
				gridMouseMove: function($event){
					if(this.drag.active){
						this.drag.height = ($event.pageY - this.drag.top) - 5;
						this.drag.width = ($event.pageX - this.drag.left) - 5;
					}
					if(grid.colResizing) {
						var colSize = grid.colResizeStartWidth + ($event.pageX - grid.colResizeStartX);
						if(colSize > 50){
							grid.header[grid.colResizeIndex].width = colSize;
							var leftPosition = 0; // chead position left
							grid.header.forEach(function(chead,idx) {
								chead.originIndex = idx;
								chead.left = leftPosition;
								if (chead.visible) {
									leftPosition += (chead.width && chead.width > 50) ? chead.width: 50; // position left
								}
							});
						};
 			        };
				},
				copyToClipboard: function(string) {
					const element = document.createElement('textarea');
					element.value = string;
					element.setAttribute('readonly', '');
					element.style.position = 'absolute';
					element.style.left = '-9999px';
					document.body.appendChild(element);
					element.select();
					var returnValue = document.execCommand('copy');
					document.body.removeChild(element);
					if (!returnValue) {
					  throw new Error('copied nothing');
					}
				},
				getIndex: function(originIndex){
					var row = 0;
					for(var i in grid.data){
						if(grid.data[i].originIndex == originIndex){
							row = i;
						}
					}
					return row;
				},
				/**
				 * @datepicker 연결 (시작 검색 날짜 설정)
				 * */
				gridDatepicker: function(key,originIndex,colIdx,e){
					var row = this.getIndex(originIndex);
					$scope.gridDatepicker.open({
						startDate: this.name + '.data['+row+'].' + key,
						dateFormat: this.header[colIdx].dateFormat,
						target: angular.element(e.target).parent()
					});
				},
				/**
				 * 팝업 
				 */
				popup: function(option, param) {
					$scope.popup.open(option.popup, param);
				},
				/**
				 * @excelExport
				 * */
				excelExport: function(){
					var alertConfirm = confirm('엑셀 다운로드 받겠습니까?');
					if (!alertConfirm) {
					    return;
					};
					var thead = '',tbody = '',arrKey = new Array();
					this.header.forEach(function(o,i){
						if(o.name && o.key != 'CRUD' && o.key != 'SELECTED' && o.visible){
							thead += '<th>' + o.name + '</th>';
							arrKey.push(o.key);
						};
					});
					this.data.forEach(function(o){
						tbody += '<tr>';
						for(var i in arrKey){
							for(var j in o){
								if(j == arrKey[i]){
									tbody += '<td>' + o[j] + '</td>';
								};
							};
						};
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
					};
				}
			};
			var leftPosition = 0; // chead position left
			grid.header.forEach(function(chead,idx){
				chead.originIndex = idx;
				chead.left = leftPosition;
				if(chead.visible){
					leftPosition += (chead.width && chead.width > 50) ? chead.width: 50; // position left
				}
				if(chead.required){
					defaultOptions.requiredArray.push({
						name: chead.name,
						key: chead.key
					});
				}
				switch (chead.type) {
					case 'Date':
						defaultOptions.dateArray.push({
							name: chead.name,
							key: chead.key,
							dateFormat: chead['dateFormat']
						});
						break;
					case 'Number':
						defaultOptions.numberArray.push({
							name: chead.name,
							key: chead.key
						});
						break;
					default:
						break;
				}
			});
			grid = angular.extend(defaultOptions, grid);
			return grid;
		};
	}]);
	app.directive('kaisaGrid',[function(){
    	return {
    		templateUrl: '/html/grid/grid.html',
    		scope: {
	        	model: '=',
	        	page: '='
	        },
    		replace: true,
    		link: function($scope, el, attrs){
    		}
    	}
    }]);
	app.directive('kaisaGridWrap',[function(){
		return {
			replace: true,
			link: function($scope, el, attrs){
				angular.element(el).scroll(function(e){
					el.find('.thead').css({top: el.scrollTop()});
				});
			}
		}
	}]);
	app.directive('kaisaGridPaging',[function(){
    	return {
    		templateUrl: '/html/grid/gridPaging.html',
    		scope: {
	        	model: '=',
	        	page: '='
	        },
    		replace: true,
    		link: function($scope, el, attrs){}
    	}
    }]);
	app.filter('CRUD',['$sce',function($sce){
		return function(value){
			switch (value) {
			case 'C':
				return '쓰기(C)';
				break;
			case 'U':
				return '수정(U)';
				break;
			case 'D':
				return '삭제(D)';
				break;
			default:
				return '읽기(R)';
				break;
			}
		}
	}]);
})(window, window.angular);