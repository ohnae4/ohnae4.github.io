<?
include_once('../common/beforeHandler.php');
include_once('../common/userInterceptor.php');

$success = false;
if($_SESSION['user_id'] == 'admin'){
	$success = true;
}else{
	session_destroy();
}

$array['resultMap'] = array('success' => $success, 'id' => $_SESSION['user_id']);
echo $_GET['callback'].'(' . json_encode($array['resultMap']) . ')';
include_once('../common/afterHandler.php');
?>