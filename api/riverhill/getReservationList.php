<?
include_once('../common/beforeHandler.php');
include_once('../common/userInterceptor.php');

$searchDateYear = $_GET['searchDateYear'];
$searchDateMonth = $_GET['searchDateMonth'];
$searchDate = $searchDateYear.'-'.$searchDateMonth.'-01';

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
";

$result = mysql_query($SQL) or die(mysql_error());
$now = date("Y-m-d");
$items = array();

while($object = mysql_fetch_object($result)){
 $items[] = $object;
}

$array['resultMap'] = array('date' => $searchDate ,'now' => $searchDateYear ,'items' => $items); 

echo $_GET['callback'].'(' . json_encode($array['resultMap']) . ')';

include_once('../common/afterHandler.php');
?>