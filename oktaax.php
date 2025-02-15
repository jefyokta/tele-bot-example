<?php

use Oktaax\Oktaax;
use Oktaax\Http\Request;
use Oktaax\Http\Response;
use Swoole\Coroutine\Http\Client;

require_once __DIR__ . "/vendor/autoload.php";

$app = new Oktaax;
$TELE_TOKEN = "token-example";
$TELE_HOST = "api.telegram.org";
$TELE_PATH = "/bot{$TELE_TOKEN}/sendMessage";

$app->post("tele-endpoint", function (Request $req, Response $res) use ($TELE_HOST, $TELE_PATH) {
    $data = json_decode($req->getBody(), true);
    $message = $data['message'] ?? [];
    $chat_id = $message['chat']['id'] ?? null;
    $text = $message['text'] ?? '';

    if (!$chat_id) {
        return $res->json(["status" => "error", "message" => "Invalid request"], 400);
    }

    $reply = json_encode([
        "chat_id" => $chat_id,
        "text" => "Kamu berkata: {$text}"
    ]);

    go(function () use ($TELE_HOST, $TELE_PATH, $reply) {
        $client = new Client($TELE_HOST, 443, true); 
        $client->setHeaders([
            "Content-Type" => "application/json",
            "Host" => $TELE_HOST
        ]);

        $client->post($TELE_PATH, $reply);
        $client->close(); 
    });

    return $res->end();
});

$app->listen(3000);
