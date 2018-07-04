<?
include_once('../../dispatcher/servlet.php');

$RESERVATION_DATE = $_GET['RESERVATION_DATE'];
$ROOM_NUMBER = $_GET['ROOM_NUMBER'];
$MEMBER_NAME = $_GET['MEMBER_NAME'];
$MEMBER_PHONE = $_GET['MEMBER_PHONE'];
$PASSWORD = $_GET['PASSWORD'];
$ROOM_STATUS_CODE = $_GET['ROOM_STATUS_CODE'];
$DESCRIPTION = $_GET['DESCRIPTION'];
$DATE_NUMBER = $_GET['DATE_NUMBER'];
$PERSONNEL_1 = $_GET['PERSONNEL_1'];
$PERSONNEL_2 = $_GET['PERSONNEL_2'];

$SQL  = "
    INSERT INTO RIVERHILL_RESERVATION (
		  RESERVATION_DATE
		, ROOM_NUMBER
		, MEMBER_NAME
		, MEMBER_PHONE
		, PASSWORD
		, ROOM_STATUS_CODE
		, DESCRIPTION
		, DATE_NUMBER
		, PERSONNEL_1
		, PERSONNEL_2
		, CREATE_DATE
		, UPDATE_DATE
    ) VALUES (
	      '$RESERVATION_DATE'
		, '$ROOM_NUMBER'
		, '$MEMBER_NAME'
		, '$MEMBER_PHONE'
		, '$PASSWORD'
		, '$ROOM_STATUS_CODE'
		, '$DESCRIPTION'
		, '$DATE_NUMBER'
		, '$PERSONNEL_1'
		, '$PERSONNEL_2'
		, NOW()
		, NOW()
    )
";
$result = mysql_query($SQL) or die(mysql_error());
$resultMap = $result;
echo $_GET['callback'].'(' . json_encode($resultMap) . ')';

include_once('../../dispatcher/afterHandler.php');
?>