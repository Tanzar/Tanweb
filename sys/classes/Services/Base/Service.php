<?php

/*
 * This code is free to use, just remember to give credit.
 */

namespace Services\Base;

use Tanweb\Container as Container;
use Tanweb\Database\Database as Database;
use Tanweb\Database\SQL\SqlBuilder as SqlBuilder;
use Tanweb\Logger\Logger as Logger;

/**
 * Class used to access databases and process data, extend your services with it
 *
 * @author Tanzar
 */
abstract class Service {
    
    protected function select(string $dbIndex, SqlBuilder $sql) : Container {
        $logger = Logger::getInstance();
        $msg = 'Database: '  . $dbIndex . '; SQL: ' . $sql->formSQL();
        $logger->logSelect($msg);
        $database = Database::getInstance($dbIndex);
        $data = $database->select($sql);
        return $data;
    }
    
    protected function insert(string $dbIndex, SqlBuilder $sql) : int {
        $logger = Logger::getInstance();
        $msg = 'Database: '  . $dbIndex . '; SQL: ' . $sql->formSQL();
        $logger->logInsert($msg);
        $database = Database::getInstance($dbIndex);
        $id = $database->insert($sql);
        return $id;
    }
    
    protected function update(string $dbIndex, SqlBuilder $sql) : void {
        $logger = Logger::getInstance();
        $msg = 'Database: '  . $dbIndex . '; SQL: ' . $sql->formSQL();
        $logger->logUpdate($msg);
        $database = Database::getInstance($dbIndex);
        $database->insert($sql);
    }
}
