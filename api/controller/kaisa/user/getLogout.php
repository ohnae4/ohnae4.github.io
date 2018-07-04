<?
include_once('../../dispatcher/servlet.php');

session_destroy();
$success = true;

$array['resultMap'] = array('success' => true, 'id' => $_SESSION['user_id']);
echo $_GET['callback'].'(' . json_encode($array['resultMap']) . ')';
include_once('../../dispatcher/afterHandler.php');
?>