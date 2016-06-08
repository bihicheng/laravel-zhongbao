<?php
/**
 * Modified from mugeda_site/ajax_response by bihicheng
 * @Author: bihicheng
 * @Date:   2016-06-06 14:39:13
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-06 16:06:53
 */
define('OK', 0);
define('SESSION_EXPIRED', 1);
define('MISSING_USER_TOKEN_IN_SESSION', 2);
define('INVALID_OR_MISSING_ARGUMENT', 3);
define('FAILED_TO_LOCATE_RESOURCE', 4);
define('FAILED_TO_READ_DATABASE', 5);
define('FAILED_TO_WRITE_DATABASE', 6);
define('NO_ACCESS', 7);
define('INTERNAL_ERROR', 8);
define('NOT_SUPPORTED', 9);
define('NOT_IMPLEMENTED', 10);
define('FAILED_TO_EXPORT', 11);
define('LOGIN_SERVER_ERROR', 12);
define('OVERFLOW_MAX_CREATIVES', 13);
define('NO_COMPETENCE', 14);
define('TIME_OUT', 15);
define('OVERFLOW_SHARE_COUNT', 16);
define('MISMATCH_ACCOUNT_INFO', 17);
define('MISMATCH_CAPTCHA', 18);

function getResponseMessages() {
	$RESPONSE_MESSAGES = array(
		OK=>'Ok',
		SESSION_EXPIRED=>'Session has expired.',
		MISSING_USER_TOKEN_IN_SESSION=>'Missing user token in session.',
		INVALID_OR_MISSING_ARGUMENT=>'Invalid or missing argument.',
		FAILED_TO_LOCATE_RESOURCE=>'Failed to locate requested resource.',
		FAILED_TO_READ_DATABASE=>'Failed to read database.',
		FAILED_TO_WRITE_DATABASE=>'Failed to write database.',
		NO_ACCESS=>'Access authorization failed.',
		INTERNAL_ERROR=>'Internal error.',
		NOT_SUPPORTED=>'Not supported.',
		NOT_IMPLEMENTED=>'Feature not implemented.',
		FAILED_TO_EXPORT =>'Failed to export.',
		LOGIN_SERVER_ERROR =>'Login from wrong server.',
	    OVERFLOW_MAX_CREATIVES => 'Overflow max creatives.',
	    NO_COMPETENCE => 'No competence.',
	    TIME_OUT => 'Request time out.',
	    OVERFLOW_SHARE_COUNT => 'Share count was exceeded'
	);
	return $RESPONSE_MESSAGES;
}


function GetErrorMessage($response) {
	$RESPONSE_MESSAGES = getResponseMessages();
	return $RESPONSE_MESSAGES[$response['status']];
}

function GetErrorCode($response) {
	return $response['status'];
}

function IsOk($response) {
	return OK == $response['status'];
}

function GetResponse($error_code, $error=null, $extra=array()) {
    $RESPONSE_MESSAGES = getResponseMessages();
    $response = array(
        'status' => $error_code
    );

    if ($error) {
        if (is_array($error)) {

            if (!isset($error['error'])) {
                $error['error'] = $RESPONSE_MESSAGES[$error_code];
            }

            $response = array_merge($response, $error);
        } else if (is_string($error)) {
            $response['error'] = $RESPONSE_MESSAGES[$error_code] . '(' . $error . ')';
        }
    } else {

        $response['error'] = $RESPONSE_MESSAGES[$error_code];
    }

    return array_merge($response, $extra);
}

function JSONResponse($response) {
    header('Content-type: application/json');
    echo json_encode($response);
    exit;
}