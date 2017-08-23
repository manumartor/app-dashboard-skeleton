#!/usr/bin/env bash

if [ -d /vagrant ]; then
	BASE=/vagrant
else
	if [ $(basename $(pwd)) = "bin" ]; then
	  BASE=..
	else 
	  BASE=.
	fi
fi

echo "----------------------------------------------------------------------------------------"
echo "---------------------------  E2E TESTING FOR APP SKELETON  ----------------------------"
echo "----------------------------------------------------------------------------------------"
echo ""
echo ""

# run unit test
echo "-------------------------------- APP SKELETON E2E TEST ---------------------------------"
cd $BASE/public/
time npm run teste2e
