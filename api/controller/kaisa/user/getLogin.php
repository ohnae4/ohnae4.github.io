<?
include_once('../../dispatcher/servlet.php');

$si = $_GET['si'];
$sp = $_GET['sp'];

$success = compareParam($sp);

if($success && $si == 'admin'){
	$_SESSION['user_id'] = 'admin';
}else{
	$success = false;
}

$array['resultMap'] = array('success' => $success, 'id' => $si);
echo $_GET['callback'].'(' . json_encode($array['resultMap']) . ')';

include_once('../../dispatcher/afterHandler.php');
?>