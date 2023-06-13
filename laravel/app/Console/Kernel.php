<?php

namespace App\Console;

use App\Models\User;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function(){
            $timeout = now()->subMinutes(2);
            $users = User::where('is_online' ,true)->where('last_seen_at' ,'>=', $timeout)->get();
            foreach($users as $user){
                $user->is_online =false;
                $user->save();
            }
        })->everyMinute(2);
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
