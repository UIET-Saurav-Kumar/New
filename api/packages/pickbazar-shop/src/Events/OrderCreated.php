<?php

namespace PickBazar\Events;

use PickBazar\Database\Models\Order;

class OrderCreated
{
    public $order;

    /**
     * Create a new event instance.
     *
     * @param Order $order
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }
}
