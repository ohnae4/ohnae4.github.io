<?
include_once('../common/beforeHandler.php');
include_once('../common/userInterceptor.php');

session_destroy();
$success = true;

$array['resultMap'] = array('success' => true, 'id' => $_SESSION['user_id']);
echo $_GET['callback'].'(' . json_encode($array['resultMap']) . ')';
include_once('../common/afterHandler.php');
?>