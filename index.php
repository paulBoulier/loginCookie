<?php

$test = 1;

var_dump($test);

die;

include "doc.php";

if (!empty($_POST)) {
    var_dump($_POST);
}
