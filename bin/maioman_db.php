#!/usr/bin/php
<?php
    /**
     * MaIO Cloud Services: CLI Script for create and manage the maioman db
     **/
    print "$argc arguments were passed. In order: \n";

    for ($i = 0; $i <= $argc -1; ++$i) {
        print "$i: $argv[$i]\n";
    }
?>