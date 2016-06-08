<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Validator;
class StoreTaskRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:255',
            'deadline_at' => 'required|date_format:Y-m-d H:i:s',
        ];
    }

    public function messages() {
        return [
            'title.required' => '标题不能为空',
            'deatline_at.required' => '终止时间不能为空',
            'deatline_at.date_format' => '时间格式不正确',
        ];
    }
    
}
