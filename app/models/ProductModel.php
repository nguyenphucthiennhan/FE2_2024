<?php
class ProductModel extends Model
{
    public function getAllProducts()
    {
        // $sql = parent::$connection->prepare('SELECT * FROM products');
        //SELECT *, (SELECT COUNT(*) FROM user WHERE user.id = products.id) AS pLike FROM `products`;
        $sql = parent::$connection->prepare('SELECT * from images');

        return parent::select($sql);
    }
    public function getProductById($id)
    {
        $sql = parent::$connection->prepare('SELECT * FROM images WHERE id=?');
        $sql->bind_param('i', $id);
        return parent::select($sql)[0];
    }
    
    public function getProductByIds($arrId)
    {
        $chamHoi = str_repeat('?,', count($arrId) - 1);
        $chamHoi .= '?';
        
        $i = str_repeat('i', count($arrId));

        $sql = parent::$connection->prepare("SELECT * FROM products WHERE id IN ( $chamHoi ) ORDER BY FIELD(id, $chamHoi ) DESC");
        $sql->bind_param($i . $i, ...$arrId, ...$arrId);

        return parent::select($sql);
    }

    public function getProductByCategory($id)
    {
        $sql = parent::$connection->prepare('SELECT products.*
                                            FROM `category_product`
                                            INNER JOIN products
                                            ON category_product.product_id = products.id
                                            WHERE `category_id` = ?');
        $sql->bind_param('i', $id);
        return parent::select($sql);
    }

    public function getProductsByPage( $page, $perPage)
    {
        $start = ($page - 1) * $perPage;

        $sql = parent::$connection->prepare("SELECT images.*
                                            FROM `images`
                                            LIMIT ?,?
                                            ");
        $sql->bind_param('ii',$start ,$perPage);
        return parent::select($sql);
    }
    public function getProductsByKeyword($q)
    {
        $sql = parent::$connection->prepare('SELECT * FROM images WHERE name LIKE ?');
        $q = "%{$q}%";
        $sql->bind_param('s', $q);
        return parent::select($sql);
    }

    // INSERT
    public function addProduct($name, $description, $price, $photo)
    {
        $sql = parent::$connection->prepare('INSERT INTO `products`(`name`, `description`, `price`, `photo`) VALUES (?, ?, ?, ?)');
        $sql->bind_param('ssis', $name, $description, $price, $photo);
        return $sql->execute();
    }

    // UPDATE
    public function editProduct($name, $description, $price, $photo, $id)
    {
        $sql = parent::$connection->prepare('UPDATE `products` SET `name`=?,`description`=?,`price`=?,`photo`=? WHERE `id`=?');
        $sql->bind_param('ssisi', $name, $description, $price, $photo, $id);
        return $sql->execute();
    }
    // DELETE
    public function deleteProduct($id)
    {
        $sql = parent::$connection->prepare('DELETE FROM `products` WHERE `id`=?');
        $sql->bind_param('i', $id);
        return $sql->execute();
    }

    // like
    public function likeProductGuest($id)
    {
        $sql = parent::$connection->prepare('UPDATE `images` SET `loves` = `loves` + 1 WHERE `id`=?');
        $sql->bind_param('i', $id);
        $sql->execute();

        // Lay view moi
        $sql = parent::$connection->prepare('SELECT loves FROM images WHERE id=?');
        $sql->bind_param('i', $id);
        return parent::select($sql)[0];
    }
    // like
    public function likeProductUser($productId, $userId)
    {
        $sql = parent::$connection->prepare('INSERT INTO `product_user`(`product_id`, `user_id`) VALUES (?, ?)');
        $sql->bind_param('ii', $productId, $userId);
        return $sql->execute();
    }

     // like
     public function views($id)
     {
        // Tang
        $sql = parent::$connection->prepare('UPDATE `images` SET `clicks` = `clicks` + 1 WHERE `id`=?');
        $sql->bind_param('i', $id);
        $sql->execute();

        // Lay view moi
        $sql = parent::$connection->prepare('SELECT clicks FROM images WHERE id=?');
        $sql->bind_param('i', $id);
        return parent::select($sql)[0];
     }
}
