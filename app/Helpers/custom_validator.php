<?php

/**
 * @Author: bihicheng
 * @Date:   2016-06-08 10:14:00
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-08 10:37:41
 */

class CustomValidator {
	public function statusValidate($attribute, $value, $parameters, $validator) {
		$status = config('task_status');
		$validate_status_num = [];
		foreach($status as $key => $val) {
			if(!empty($val)) {
				$validate_status_num[] = $key;
			}
		}
		return in_array($value, $validate_status_num);
	}
}