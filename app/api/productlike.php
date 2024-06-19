<?php
require_once '../../config/database.php';
spl_autoload_register(function ($className)
{
   require_once "../models/$className.php";
});

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['productId'];

$productModel = new ProductModel();
$product = $productModel->likeProductGuest($id);
echo json_encode($product);