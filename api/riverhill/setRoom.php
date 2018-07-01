<?
include_once('../common/beforeHandler.php');
include_once('../common/userInterceptor.php');

$ROOM_NUMBER = $_GET['ROOM_NUMBER'];
$ROOM_NAME = $_GET['ROOM_NAME'];
$TYPE = $_GET['ROOM_TYPE_CODE'];
$ROOM_M2 = $_GET['ROOM_M2'];
$MIN_PERSONNEL = $_GET['MIN_PERSONNEL'];
$MAX_PERSONNEL = $_GET['MAX_PERSONNEL'];
$PRICE_1 = $_GET['PRICE_1'];
$PRICE_2 = $_GET['PRICE_2'];
$PRICE_3 = $_GET['PRICE_3'];
$PRICE_4 = $_GET['PRICE_4'];
$PRICE_5 = $_GET['PRICE_5'];
$PRICE_6 = $_GET['PRICE_6'];
$PRICE_7 = $_GET['PRICE_7'];
$PRICE_8 = $_GET['PRICE_8'];
$PRICE_9 = $_GET['PRICE_9'];
$PRICE_ADD = $_GET['PRICE_ADD'];
$DESCRIPTION = $_GET['DESCRIPTION'];
$PRIORITY = $_GET['PRIORITY'];

$SQL  = "
    INSERT INTO RIVERHILL_ROOM (
		  ROOM_NUMBER
		, ROOM_NAME
		, ROOM_TYPE_CODE
		, ROOM_M2
		, MIN_PERSONNEL
		, MAX_PERSONNEL
		, PRICE_1
		, PRICE_2
		, PRICE_3
		, PRICE_4
		, PRICE_5
		, PRICE_6
		, PRICE_7
		, PRICE_8
		, PRICE_9
		, PRICE_ADD
		, DESCRIPTION
		, PRIORITY
		, CREATE_DATE
		, UPDATE_DATE
    ) VALUES (
	      '$ROOM_NUMBER'
		, '$ROOM_NAME'
		, '$TYPE'
		, '$ROOM_M2'
		, '$MIN_PERSONNEL'
		, '$MAX_PERSONNEL'
		, '$PRICE_1'
		, '$PRICE_2'
		, '$PRICE_3'
		, '$PRICE_4'
		, '$PRICE_5'
		, '$PRICE_6'
		, '$PRICE_7'
		, '$PRICE_8'
		, '$PRICE_9'
		, '$PRICE_ADD'
		, '$DESCRIPTION'
		, '$PRIORITY'
		, NOW()
		, NOW()
    )
";
$result = mysql_query($SQL) or die(mysql_error());
$resultMap = $result;
echo $_GET['callback'].'(' . json_encode($resultMap) . ')';

include_once('../common/afterHandler.php');
?>