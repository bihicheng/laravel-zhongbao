<?php
/**
 * @Author: bihicheng
 * @Date:   2016-06-06 12:00:21
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-07 14:21:40
 */

function total_pages($count, $perpage) {
    $mod = $count % $perpage;
    $all_pages = $count / $perpage;
    $total_page = ($mod == 0 ? $all_pages : floor($all_pages) + 1);
    return $total_page;
}

// Copied from symfony framework.
function getHost() {
    $possibleHostSources = array('HTTP_X_FORWARDED_HOST', 'HTTP_HOST', 'SERVER_NAME', 'SERVER_ADDR');
    $sourceTransformations = array(
        "HTTP_X_FORWARDED_HOST" => function($value) {
            $elements = explode(',', $value);
            return trim(end($elements));
        }
    );
    $host = '';
    foreach ($possibleHostSources as $source)
    {
        if (!empty($host)) break;
        if (empty($_SERVER[$source])) continue;
        $host = $_SERVER[$source];
        if (array_key_exists($source, $sourceTransformations))
        {
            $host = $sourceTransformations[$source]($host);
        }
    }

    // Remove port number from host
    $host = preg_replace('/:\d+$/', '', $host);

    return trim($host);
}

// copied from https://core.trac.wordpress.org/browser/tags/4.4.1/src/wp-includes/functions.php#L0
function is_ssl() {
	if (isset($_SERVER['HTTPS'])) {
        if ('on' == strtolower($_SERVER['HTTPS'])) {
            return true;
		}

        if ('1' == $_SERVER['HTTPS']) {
            return true;
		}
    } else if ( isset($_SERVER['SERVER_PORT']) && ( '443' == $_SERVER['SERVER_PORT'] ) ) {
        return true;
    } else if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
		return true;
	}

    return false;
}

// added by hichengbi@mugeda.com
function detectScheme() {
	if(is_ssl()) {
		return 'https://';
	} 
	return 'http://';
}