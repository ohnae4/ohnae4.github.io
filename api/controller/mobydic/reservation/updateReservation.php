<?
include_once('../../dispatcher/servlet.php');

if(!$admin){
	exit;
}

$reservationNumber = $_GET['RESERVATION_NUMBER'];
$roomStatusCode = $_GET['ROOM_STATUS_CODE'];

$SQL = "
	UPDATE  RIVERHILL_RESERVATION SET
			ROOM_STATUS_CODE = '$roomStatusCode'
		  , UPDATE_DATE = NOW()
	WHERE   1=1
	AND     RESERVATION_NUMBER = '$reservationNumber'
";

$result = mysql_query($SQL) or die(mysql_error());

echo $_GET['callback'].'(' . json_encode($result) . ')';

include_once('../../dispatcher/afterHandler.php');
?>