<?php
function getClientIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

$ip = getClientIP();

// Ambil lokasi dari ip-api.com
$location = "Tidak diketahui";
$response = @file_get_contents("http://ip-api.com/json/$ip?lang=id");
if ($response !== false) {
    $data = json_decode($response, true);
    if ($data && $data["status"] === "success") {
        $location = $data["city"] . ", " . $data["regionName"] . ", " . $data["country"];
    }
}

http_response_code(403);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cek IP & Lokasi</title>
</head>
<body>
    <?php echo "ip mu: " . htmlspecialchars($ip) . "<br>Lokasi: " . htmlspecialchars($location); ?>
</body>
</html>

