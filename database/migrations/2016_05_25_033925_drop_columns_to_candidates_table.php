<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropColumnsToCandidatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        # migration 只执行一次，
        # 判断是否存在表和字段来执行一次。
        Schema::table('candidates', function (Blueprint $table) {
            if(Schema::hasTable('candidates')) {
                 if(Schema::hasColumn('candidates', 'task_id')) {
                    $table->dropForeign(['task_id']);
                    // $table->dropForeign('candidates_task_id_foreign');
                    $table->dropColumn('task_id');
                }               
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('candidates', function (Blueprint $table) {
            //
        });
    }
}
