<?php

namespace App\Console\Commands;

use App\Events\NotificationEvent;
use Exception;
use Illuminate\Console\Command;

class TestCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'test:websockets';

    /**
     * @var string
     */
    protected $description = 'Websockets testing';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        try {
            event(new NotificationEvent(['test' => 'success']));
        } catch (Exception $exception) {
            echo $exception->getMessage() . PHP_EOL;
        }
    }
}
