<?php
require_once '../../config/database.php';
spl_autoload_register(function ($className)
{
   require_once "../models/$className.php";
});

$input = json_decode(file_get_contents('php://input'), true);
$q = $input['keyword'];

$productModel = new ProductModel();
$product = $productModel->getProductsByKeyword($q);
echo json_encode($product);