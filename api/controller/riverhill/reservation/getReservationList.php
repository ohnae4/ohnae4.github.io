<?
include_once('../../dispatcher/servlet.php');

$searchDateYear = $_GET['searchDateYear'];
$searchDateMonth = $_GET['searchDateMonth'];
$searchDate = $searchDateYear.'-'.$searchDateMonth.'-01';

if($admin){
	$SQL = "
		SELECT
			  RESERVATION_NUMBER
			, RESERVATION_DATE
			, ROOM_NUMBER
			, ROOM_STATUS_CODE
			, MEMBER_NAME
			, MEMBER_PHONE
			, DESCRIPTION
			, DATE_NUMBER
			, PERSONNEL_1
			, PERSONNEL_2
			, CREATE_DATE
			, UPDATE_DATE
		FROM  RIVERHILL_RESERVATION
		WHERE 1=1
		AND YEAR(RESERVATION_DATE) = '$searchDateYear'
		AND MONTH(RESERVATION_DATE) = '$searchDateMonth'
		ORDER BY RESERVATION_NUMBER DESC
	";
}else{
	$SQL = "
		SELECT
			  RESERVATION_NUMBER
			, RESERVATION_DATE
			, ROOM_NUMBER
			, ROOM_STATUS_CODE
			, substring(MEMBER_NAME, 1, 2) AS MEMBER_NAME
			, substring(MEMBER_PHONE, 10, 12) AS MEMBER_PHONE
			, DESCRIPTION
			, DATE_NUMBER
			, PERSONNEL_1
			, PERSONNEL_2
			, CREATE_DATE
			, UPDATE_DATE
		FROM  RIVERHILL_RESERVATION
		WHERE 1=1
		AND YEAR(RESERVATION_DATE) = '$searchDateYear'
		AND MONTH(RESERVATION_DATE) = '$searchDateMonth'
		ORDER BY RESERVATION_NUMBER DESC
	";
}

$result = mysql_query($SQL) or die(mysql_error());
$now = date("Y-m-d");
$items = array();

while($object = mysql_fetch_object($result)){
	$items[] = $object;
}

$array['resultMap'] = array('date' => $searchDate ,'now' => $now ,'items' => $items); 

echo $_GET['callback'].'(' . json_encode($array['resultMap']) . ')';

include_once('../../dispatcher/afterHandler.php');
?>