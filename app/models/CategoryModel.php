<?php
class CategoryModel extends Model
{
    public function getAllCategories()
    {
        $sql = parent::$connection->prepare('SELECT * FROM categories');
        return parent::select($sql);
    }
}
