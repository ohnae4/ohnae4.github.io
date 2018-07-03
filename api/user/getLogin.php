<?
include_once('../common/beforeHandler.php');
include_once('../common/userInterceptor.php');
include_once('../common/utils.php');

$si = $_GET['si'];
$sp = $_GET['sp'];

$success = getParamDecode($sp);

if($success && $si == 'admin'){
	$_SESSION['user_id'] = 'admin';
}else{
	$success = false;
}

$array['resultMap'] = array('success' => $success, 'id' => $si);
echo $_GET['callback'].'(' . json_encode($array['resultMap']) . ')';

include_once('../common/afterHandler.php');
?>