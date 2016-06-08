<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('user_id');
            $table->index('user_id');
            $table->tinyInteger('status');
            $table->tinyInteger('kind');
            $table->timestamp('deadline_at');
            $table->timestamp('preview_at')->nullable();
            $table->timestamp('commit_at')->nullable();
            $table->decimal('amount', 10, 3);
            $table->softDeletes(); # 软删除
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tasks');
    }
}
