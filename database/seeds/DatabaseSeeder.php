<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $faker->addProvider(new \Faker\Provider\zh_CN\Company($faker));
        $limit = 10;

        for ($i = 0; $i < $limit; $i ++) {
            DB::table('tasks')->insert([
                'title' => $faker->catchPhrase(10),
                'user_id' => $faker->uuid,
                'status' => $faker->numberBetween(0, 5),
                'kind' => $faker->numberBetween(0, 5),
                'deadline_at' => $faker->dateTimeThisYear($max = 'now'),
                'preview_at' => $faker->dateTimeThisYear($max = 'now'),
                'commit_at' => $faker->dateTimeThisYear($max = 'now'),
                'created_at' => $faker->dateTimeThisYear($max = 'now'),
                'updated_at' => $faker->dateTimeThisYear($max = 'now'),
                'amount' => $faker->randomFloat(null, 0, 5000)
            ]);
        }
    }
}
