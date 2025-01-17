<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // Thay đổi domain frontend của bạn
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];

