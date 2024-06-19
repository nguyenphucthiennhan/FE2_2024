<?php
require_once '../../config/database.php';
spl_autoload_register(function ($className)
{
   require_once "../models/$className.php";
});

$input = json_decode(file_get_contents('php://input'), true);
$page = $input['page'];
$perPage = $input['perPage'];

$productModel = new ProductModel();
$product = $productModel->getProductsByPage($page, $perPage);
echo json_encode($product);