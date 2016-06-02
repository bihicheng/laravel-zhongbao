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
            $table->dateTime('deadline_at');
            $table->dateTime('preview_at');
            $table->dateTime('commit_at');
            $table->decimal('amount', 10, 3);
            $table->softDeletes();
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
