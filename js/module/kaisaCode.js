(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('baseCode', []);
	app.factory('code', [function($) {
		return {
			holidayArr : [ // 사용안함 (DB로 등록)
				{text: '신정', value:'2022-01-01'},
				{text: '설날 ', value:'2022-01-31'},
				{text: '설날 ', value:'2022-02-01'},
				{text: '설날 ', value:'2022-02-02'},
				{text: '삼일절', value:'2022-03-01'},
				{text: '대통령선거', value:'2022-03-09'},
				{text: '어린이날', value:'2022-05-05'},
				{text: '부처님오신날', value:'2022-05-08'},
				{text: '전국동시지방선거', value:'2022-06-01'},
				{text: '현충일', value:'2022-06-06'},
				{text: '광복절', value:'2022-08-15'},
				{text: '추석', value:'2022-09-09'},
				{text: '추석', value:'2022-09-10'},
				{text: '추석', value:'2022-09-11'},
				{text: '추석', value:'2022-09-12'},
				{text: '개천절', value:'2022-10-03'},
				{text: '한글날', value:'2022-10-09'},
				{text: '한글날', value:'2022-10-10'},
				{text: '크리스마스', value:'2022-12-25'}
			],
			dateArr1: {startDate: '01-01', endDate: '12-31'}, // 비수기
			dateArr2: {startDate: '06-25', endDate: '09-04'}, // 준성수기
			dateArr3: {startDate: '07-16', endDate: '08-15'}, // 성수기
			roomType: [
				{text: '객실1동', value: '1'},
				{text: '객실2동', value: '2'},
				{text: '객실3동', value: '3'}
			],
			addPriceType: [
				{text: '인원추가요금', value: '1'},
				{text: '바베큐요금', value: '2'},
				{text: '온수요금', value: '3'}
			],
			resevationType: [
				{text: '예약중', value: '1'},
				{text: '예약완료', value: '2'},
				{text: '예약취소', value: '3'}
			],
			roomCode: [ // 객실유형
				{text: '일반', value: '1'}
			],
			peakCode: [
				{text: '비수기', value: '1'},
				{text: '준성수기', value: '2'},
				{text: '성수기', value: '3'}
			],
			holidayCode: [
				{text: '휴일', value: '1'},
				{text: '특정일', value: '2'}
			],
			priceType: [
				{text: '비수기 주중 요금', value: '1'},
				{text: '비수기 금요일 요금	', value: '2'},
				{text: '비수기 주말 요금', value: '3'},
				{text: '준성수기 주중 요금', value: '4'},
				{text: '준성수기 금요일 요금	', value: '5'},
				{text: '준성수기 주말 요금', value: '6'},
				{text: '성수기 주중 요금', value: '7'},
				{text: '성수기 금요일 요금	', value: '8'},
				{text: '성수기 주말 요금', value: '9'}
			],
			addCount1Arr: [
				{text: '4명이하', value: '0'},
				{text: '5명', value: '1'},
				{text: '6명', value: '2'}
			],
			addCount2Arr: [
				{text: '바베큐 추가안함', value: '0'},
				{text: '바베큐 추가', value: '1'}
			],
			addCount3Arr: [
				{text: '온수 추가안함', value: '0'},
				{text: '온수 추가', value: '1'}
			],
			weekArr: [
				{text: '일', value: '0'},
				{text: '월', value: '1'},
				{text: '화', value: '2'},
				{text: '수', value: '3'},
				{text: '목', value: '4'},
				{text: '금', value: '5'},
				{text: '토', value: '6'}
			],
			yearArr: [
				{ text: '2021', value: '2021' },
				{ text: '2022', value: '2022' },
				{ text: '2023', value: '2023' },
				{ text: '2024', value: '2024' },
				{ text: '2025', value: '2025' }
			],
			monthArr: [
				{ text: '전체', value: '' },
				{ text: '01', value: '01' },
				{ text: '02', value: '02' },
				{ text: '03', value: '03' },
				{ text: '04', value: '04' },
				{ text: '05', value: '05' },
				{ text: '06', value: '06' },
				{ text: '07', value: '07' },
				{ text: '08', value: '08' },
				{ text: '09', value: '09' },
				{ text: '10', value: '10' },
				{ text: '11', value: '11' },
				{ text: '12', value: '12' }
			],
			timeArr: [
				{ text: '01', value: '01' },
				{ text: '02', value: '02' },
				{ text: '03', value: '03' },
				{ text: '04', value: '04' },
				{ text: '05', value: '05' },
				{ text: '06', value: '06' },
				{ text: '07', value: '07' },
				{ text: '08', value: '08' },
				{ text: '09', value: '09' },
				{ text: '10', value: '10' },
				{ text: '11', value: '11' },
				{ text: '12', value: '12' },
				{ text: '13', value: '13' },
				{ text: '14', value: '14' },
				{ text: '15', value: '15' },
				{ text: '16', value: '16' },
				{ text: '17', value: '17' },
				{ text: '18', value: '18' },
				{ text: '19', value: '19' },
				{ text: '20', value: '20' },
				{ text: '21', value: '21' },
				{ text: '22', value: '22' },
				{ text: '23', value: '23' },
				{ text: '24', value: '24' }
			],
		}
    }]);
})(window, window.angular);