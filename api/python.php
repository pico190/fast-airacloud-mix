<?php

ini_set('display_errors', 0);

$url = 'https://extendsclass.com/python-tester-source';

$postData = $_POST;

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($postData),
    ],
];

$context  = stream_context_create($options);
$result = json_decode(file_get_contents($url, false, $context));

$response = [];
$response['messages'] = $result->errors;

header('Content-Type: application/json');
echo json_encode($response);

?>