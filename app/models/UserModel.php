<?php
class UserModel extends Model
{
    public function login($username, $password)
    {
        $sql = parent::$connection->prepare('SELECT * FROM users WHERE username = ?');
        $sql->bind_param('s', $username);
        $user = parent::select($sql)[0];
        if (password_verify($password, $user['password'])) {
            return $user;
        }
        return false;
    }

    public function register($username, $password)
    {
        $sql = parent::$connection->prepare('INSERT INTO `users`(`username`, `password`) VALUES (?, ?)');
        $password = password_hash($password, PASSWORD_DEFAULT);
        $sql->bind_param('ss', $username, $password);
        return $sql->execute();
    }

    public function getIdByUsername($username)
    {
        $sql = parent::$connection->prepare('SELECT id FROM users WHERE username=?');
        $sql->bind_param('s', $username);
        return parent::select($sql)[0]['id'];
    }
}
