<?php

namespace App\Events;

use Illuminate\Broadcasting\{
    Channel,
    InteractsWithSockets
};
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class NotificationEvent implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    /**
     * @var array
     */
    public $notification;

    /**
     * @param array $notification
     */
    public function __construct(array $notification)
    {
        $this->notification = $notification;
    }

    /**
     * Метод отвечает за возвращение каналов, на которые вещается событие
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('notifications');
    }
}
