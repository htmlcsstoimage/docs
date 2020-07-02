<?php

$html = <<<EOD
<div class='box'>
  Generated from PHP ✅
</div>
EOD;

$css = <<<EOD
.box { 
  border: 4px solid #03B875; 
  padding: 20px; 
  font-family: 'Roboto'; 
}
EOD;

$google_fonts = "Roboto";

$data = array('html'=>$html,
              'css'=>$css,
              'google_fonts'=>$google_fonts);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://hcti.io/v1/image");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

curl_setopt($ch, CURLOPT_POST, 1);
// Retrieve your user_id and api_key from https://htmlcsstoimage.com/dashboard
curl_setopt($ch, CURLOPT_USERPWD, "user_id" . ":" . "api_key");

$headers = array();
$headers[] = "Content-Type: application/x-www-form-urlencoded";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
  echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
$res = json_decode($result,true);
echo $res['url'];
// https://hcti.io/v1/image/202dc04d-5efc-482e-8f92-bb51612c84cf
?>
