<?
include_once('../../dispatcher/servlet.php');

$SQL = "
	SELECT 
	       * 
	FROM   RIVERHILL_ROOM
";

$result = mysql_query($SQL) or die(mysql_error());
$resultMap = array();
while($object = mysql_fetch_object($result)){
	$resultMap[] = $object;
}
echo $_GET['callback'].'(' . json_encode($resultMap) . ')';

include_once('../../dispatcher/afterHandler.php');
?>