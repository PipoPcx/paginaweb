<?php
// Obtener los valores del formulario
$name = $_POST["name"];
$mail = $_POST["email"];
$numero = $_POST["telefono"];
$plan_name = $_POST["plan_name"];
$plan_value_uf = $_POST["plan_value_uf"];
$plan_value_clp = $_POST["plan_value_clp"];
$isapre_name = $_POST["isapre_name"];
$message_content = $_POST["message"];

$header = "From: " . $mail . "\r\n";
$header .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$header .= "Mime-Version: 1.0\r\n";
$header .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Concatenar el mensaje
$message = "Este mensaje fue enviado por: " . $name . "\r\n";
$message .= "Su e-mail es: " . $mail . "\r\n";
$message .= "Telefono de contacto: " . $numero . "\r\n";
$message .= "Mensaje: " . $message_content . "\r\n";
$message .= "Plan Seleccionado: " . $plan_name . "\r\n";
$message .= "Valor en UF: " . $plan_value_uf . "\r\n";
$message .= "Valor en Pesos: " . $plan_value_clp . "\r\n";
$message .= "Isapre Seleccionada: " . $isapre_name . "\r\n";
$message .= "Enviado el: " . date("d/m/y", time());

// Configuración para enviar el correo
$para = "felipe.valencia.gonzalez@gmail.com";
$asunto = "Solicitud de Contacto sobre el Plan: " . $plan_name;

mail($para, $asunto, utf8_decode($message), $header);
header("location:index.html");
?>
