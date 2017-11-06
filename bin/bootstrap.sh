#!/usr/bin/env bash

main() {
  	echo "########################################"
    echo "###   VAGRANT BOOTSRTAP FILE V.1.3   ###"
	echo "########################################"

  	set_enviroment

  	echo ""
  	echo ""
  	echo "------------------------------------------"
  	echo "------------------------------------------"
  	echo " Installing: $@"
  	echo "------------------------------------------"
  	echo "------------------------------------------"
  	echo ""
  	echo ""

  	if echo $@ | grep -q -w apache; then
    	apache
  	fi
  	if echo $@ | grep -q -w php; then
    	php
  	fi
  	if echo $@ | grep -q -w composer; then
    	composer
  	fi
  	if echo $@ | grep -q -w phpunit; then
    	phpunit
  	fi
  	if echo $@ | grep -q -w mysql; then
    	mysql
    	mysqlclient
  	fi
  	if echo $@ | grep -q -w mysqlclient; then
    	mysqlclient
  	fi
  	if echo $@ | grep -q -w mysqlprovisioning; then
    	mysqlprovisioning
  	fi
  	if echo $@ | grep -q -w postgres; then
    	postgres
  	fi
  	if echo $@ | grep -q -w postgresclient; then
    	postgresclient
  	fi
  	if echo $@ | grep -q -w nodejs; then
    	nodejs
  	fi
  	if echo $@ | grep -q -w bower; then
    	bower
  	fi
  	if echo $@ | grep -q -w gulp; then
    	gulp
  	fi
  	if echo $@ | grep -q -w karma; then
    	karma
  	fi
  	if echo $@ | grep -q -w protractor; then
    	protractor
  	fi
  	if echo $@ | grep -q -w ionic; then
    	ionic
  	fi
	if echo $@ | grep -q -w phonegap; then
		phonegap
	fi
	if echo $@ | grep -q -w androidsdk; then
		androidsdk
	fi
  	if echo $@ | grep -q -w jmeter; then
    	jmeter
  	fi
    if echo $@ | grep -q -w arduinoide; then
      arduinoide
    fi

  	finish_install
}

set_enviroment() {
  	echo '--> Setting enviroment...' 

  	TIMEZONE=Europe/Madrid

  	# configure timezone
  	timedatectl set-timezone $TIMEZONE
  	echo '-> Setted timedate!'

  	# configure init path
  	if ! grep -Fxq "cd /vagrant" /home/ubuntu/.bashrc; then
      	echo "cd /vagrant
alias l='ls -lah'" >> /home/ubuntu/.bashrc
    	echo '-> Setted init path in .bashrc!'
  	fi

  	# Update server
  	sudo apt-get -y update
 	sudo apt-get -y upgrade
 	echo '-> apt-get updraded!'

  	# Install commons tools
  	apt-get -y install build-essential g++ binutils-doc git subversion
  	echo '-> installed commons tools!'

  	echo '--> Finish setting enviroment...'

    # Create logs dirs
    if ! [ -d /vagrant/logs ]; then
        mkdir /vagrant/logs
    fi
}

apache() {
  	# Install Apache
  	apt-get -y install apache2

  	if ! [ -d /vagrant/public ]; then
  	  	mkdir /vagrant/public
    	echo "<?php phpinfo();" >> /vagrant/public/index.php
  	fi

  	sed -i "s/^\(.*\)www-data/\1ubuntu/g" /etc/apache2/envvars
  	chown -R ubuntu:ubuntu /var/log/apache2

  	if [ ! -f "/etc/apache2/sites-available/vagrant_vhost.conf" ]; then
    	cat << EOF > /etc/apache2/sites-available/vagrant_vhost.conf
<VirtualHost *:80>
  DocumentRoot /vagrant/public
  LogLevel debug

  ErrorLog /var/log/apache2/vagrant-error.log
  CustomLog /var/log/apache2/vagrant-access.log combined

  <Directory /vagrant/public>
      AllowOverride All
      Require all granted
  </Directory>
</VirtualHost>
EOF
  	fi

	a2dissite 000-default
	a2ensite vagrant_vhost

	a2enmod rewrite

	/etc/init.d/apache2 restart
	update-rc.d apache2 enable

	echo "--> Apache2 installed!!"
}

php() {
	#Install PHP
	PHP_XDEBUGINI=/etc/php/7.0/mods-available/xdebug.ini

  	apt-get install -y php libapache2-mod-php php-cli php-mysql php-curl php-gd php-intl php-ldap php-mbstring php-soap php-sqlite3 php-xmlrpc php-xdebug

  	#Configure PHP
  	if ! [ -f /etc/php/7.0/apache2/conf.d/1-general.ini ]; then
    	echo "; configuration for general php
; priority=1
memory_limit = 512M
display_errors = On
post_max_size = 50M
upload_max_filesize = 50M
" >> /etc/php/7.0/apache2/conf.d/1-general.ini
  	fi
  	if ! [ -f /etc/php/7.0/cli/conf.d/1-general.ini ]; then
    	echo "; configuration for general php
; priority=1
memory_limit = 512M
display_errors = On
" >> /etc/php/7.0/cli/conf.d/1-general.ini
	fi
	echo "xdebug.show_error_trace = 1" >> $PHP_XDEBUGINI
	echo "xdebug.remote_enable = 1" >> $PHP_XDEBUGINI
	echo "xdebug.remote_connect_back=1" >> $PHP_XDEBUGINI
	echo "xdebug.remote_port=9000" >> $PHP_XDEBUGINI
	echo "xdebug.remote_host=10.0.2.2" >> $PHP_XDEBUGINI

	echo "--> PHP Installed!!"

}

composer() {
  	# Install composer
  	apt-get install -y composer
    echo "--> Composer installed!!"
}

phpunit() {
    if ! [ -f /usr/local/bin/phpunit ]; then
	  	wget -q https://phar.phpunit.de/phpunit.phar
	  	chmod +x phpunit.phar 
	  	mv phpunit.phar /usr/local/bin/phpunit

	  	# check exists save reports dir
		if ! [ -d "/vagrant/logs/testreports" ]; then
			mkdir /vagrant/logs/testreports
		fi

	  	echo "--> Phpunit installed!!"
    fi
}

mysql() {
	# Install MySQL
	MYSQL_PASS=root
	MYSQL_CNF=/etc/mysql/mysql.conf.d/mysqld.cnf

	echo "mysql-server mysql-server/root_password password $MYSQL_PASS" | debconf-set-selections
	echo "mysql-server mysql-server/root_password_again password $MYSQL_PASS" | debconf-set-selections
	apt-get install -y mysql-client mysql-server

	# Configure MySQL
	sed -i -e "s/bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" $MYSQL_CNF
	sed -i -e "s/#general_log/general_log/g" $MYSQL_CNF
	echo "slow_query_log = 1" >> $MYSQL_CNF
	sed -i -e "s/#log_slow_queries/slow_query_log_file/" $MYSQL_CNF
	sed -i -e "s/#long_query_time\s*=\s*2/long_query_time = 1/" $MYSQL_CNF
	sed -i -e "s/#log-queries-not-using-indexes/log-queries-not-using-indexes/" $MYSQL_CNF

	# Allow root access from any host
	echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '$MYSQL_PASS' WITH GRANT OPTION" | mysql -u root --password=$MYSQL_PASS
	echo "GRANT PROXY ON ''@'' TO 'root'@'%' WITH GRANT OPTION" | mysql -u root --password=$MYSQL_PASS

	# Restart Mysql service
	service mysql restart

	# Restart Apache service
    service apache2 restart

    echo "--> MySQL installed!! pass: $MYSQL_PASS"

}

mysqlclient() {
	# Install MySQL Client
	apt-get install -y mysql-client

	echo "--> MySQL Client installed!!"
}

mysqlprovisioning() {
  	# Executing all SQL files in /vagrant/provision-sql folder
  	if ! [ -d "/vagrant/bin/provision-sql" ]; then
    	mkdir /vagrant/bin/provision-sql
    	#echo "# blank sql bootstrap script" >> /vagrant/bin/provision-sql/blank.sql
  	fi
  	if [ -d "/vagrant/bin/provision-sql" ]; then
	    echo "Executing all SQL files in /vagrant/provision-sql folder ..."
	    echo "-------------------------------------"
	    for sql_file in /vagrant/bin/provision-sql/*.sql
	    do
	        echo "EXECUTING $sql_file..."
	        time mysql -u root --password=$MYSQL_PASS < $sql_file
	        echo "FINISHED $sql_file"
	        echo ""
    	done

    	echo "--> MySQL provisioned!!"
  	fi
}

postgres() {
  	# Install postgress
  	apt-get -y install postgresql postgresql-contrib
  	echo "alias psql='sudo -u postgres psql'" >> $BASHRC_PATH

  	# Config postgres
  	sed -i -e "s/127.0.0.1\/32/192.168.50.1\/24/" /etc/postgresql/9.5/main/pg_hba.conf
  	sed -i -e "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/9.5/main/postgresql.conf
  	sed -i -e "s/#log_destination/log_destination/" /etc/postgresql/9.5/main/postgresql.conf
  	sed -i -e "s/#logging_collector = off/logging_collector = on/" /etc/postgresql/9.5/main/postgresql.conf
  	sed -i -e "s/#log_directory = 'pg_log'/log_directory = '\/var\/log\/postgresql'/" /etc/postgresql/9.5/main/postgresql.conf
  	sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

  	# create aulaxxi database
  	sudo -u postgres psql -c "CREATE USER aulaxxi_m332 PASSWORD 'aulaxxim3322017';"
  	sudo -u postgres psql -c "CREATE DATABASE aulaxxi_m332 OWNER 'aulaxxi_m332';"
  	sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE aulaxxi_m332 TO aulaxxi_m332;"
  	sudo -u postgres psql -c "CREATE DATABASE aulaxxi_m332_phpu OWNER 'aulaxxi_m332';"
  	sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE aulaxxi_m332_phpu TO aulaxxi_m332;"

  	echo "Created database and user aulaxxi_m332"

  	# importing data
  	if ! [ -d "/vagrant/bin/provision-pgsql" ]; then
    	mkdir /vagrant/bin/provision-pgsql
  	fi
  	if [ -d "/vagrant/bin/provision-pgsql" ]; then
      	echo "Executing all SQL files in /vagrant/bin/provision-pgsql folder ..."
      	echo "-------------------------------------"
      	for sql_file in /vagrant/bin/provision-pgsql/*.pgsql
      	do
        	echo "EXECUTING $sql_file..."
          	time sudo -u postgres psql aulaxxi_m332 < $sql_file
          	echo "FINISHED $sql_file"
          	echo ""
      	done
  	fi

  	service postgresql restart
  	update-rc.d postgresql enable
    
  	echo "-->Postgresql Installed!!"
}

postgresclient() {
  	# Install Postgres client
    apt-get -y install postgresql-client-common postgresql-client-9.5

    echo "-->Postgresql Client Installed!!"
}

nodejs() {
  	# Install nodejs
  	apt-get install -y python-software-properties python g++ make
    
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    # curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

    apt-get install -y nodejs

    # Update npm
    npm i -g npm

    echo "--> NodeJS installed!!"
}

bower() {
  	# Install bower globally
    npm install -g bower

    echo "--> Bower installed!!"
}

gulp() {
  	# Install gulp globally
    npm install -g gulp

    echo "--> Gulp installed!!"
}

karma() {
  	# Install karma globally
    apt-get install -y xvfb chromium-browser firefox

    if ! [ -f /etc/profile.d/custom.sh ]; then
      echo "export DISPLAY=:99.0
export CHROME_BIN=/usr/bin/chromium-browser
export FIREFOX_BIN=/usr/bin/firefox

alias cloud-runallunittest=/vagrant/bin/rununittest.sh
alias cloud-runmaiomanunittest='cd /vagrant/public/maioman && npm test'" > /etc/profile.d/custom.sh
    fi
    npm install -g karma karma-cli  
    npm install -g jasmine-core jasmine-node jasmine-reporters karma-jasmine karma-chrome-launcher karma-firefox-launcher karma-coverage karma-junit-reporter

    # check exists save reports dir
    if ! [ -d "/vagrant/logs/testreports" ]; then
    	mkdir /vagrant/logs/testreports
  	fi

    echo "-->Karma installed!!"
}

protractor() {
  	# Install protractor globally
    npm install -g protractor@latest

    # check exists save reports dir
    if ! [ -d "/vagrant/logs/testreports" ]; then
    	mkdir /vagrant/logs/testreports
  	fi

    echo "-->protractor installed!!"
}

phonegap() {
	# Install phonegap
  	npm install -g phonegap@latest

	androidsdk
	
  	echo "--> Phonegap installed!!"
}

ionic() {
	#Install ionic
	npm install -g cordova@latest ionic@latest

	androidsdk

	echo "--> Ionic installed!!"
}

androidsdk() {
	# Install AndroidSDK
	apt-get -y install default-jre
	wget http://dl.google.com/android/android-sdk_r24.2-linux.tgz
  	tar -xvf android-sdk_r24.2-linux.tgz
  	cd android-sdk-linux/tools
  	yes | ./android update sdk --no-ui
  	echo "export PATH=${PATH}:~/android-sdk-linux/tools:~/android-sdk-linux/platform-tools
export ANDROID_HOME=~/android-sdk-linux" >> $BASHRC_PATH

	echo "--> Android SDK Installed!!"
}

jmeter() {
  	# Install jmeter
  	if ! [ -d /usr/local/lib/apache-jmeter ]; then
    		apt-get install -y default-jre

    		wget -q http://redrockdigimark.com/apachemirror/jmeter/binaries/apache-jmeter-3.1.tgz
    		tar -xf apache-jmeter-3.1.tgz
    		mv apache-jmeter-3.1/ /usr/local/lib/apache-jmeter

    		ln -fs /usr/local/lib/apache-jmeter/bin/jmeter /usr/local/bin/jmeter
    		ln -fs /usr/local/lib/apache-jmeter/bin/jmeter-server /usr/local/bin/jmeter-server

    		# check exists save reports dir
  	    if ! [ -d "/vagrant/logs/testreports" ]; then
  	    	  mkdir /vagrant/logs/testreports
  	  	fi

        echo "--> Jmeter installed!!"
    fi
}

finish_install() {
  	apt-get -y autoremove
  	echo '---> Boostrap API finished!!'
}

arduinoide() {
    echo "--> Installing ArduinoIDE 1.5.7"

    if ! [ -d /opt/arduino-ide ]; then
        # install picocom for serial port communication
        apt-get install -y picocom default-jre

        # install arduino
        wget http://downloads.arduino.cc/arduino-1.5.7-linux64.tgz
        tar -zxvf arduino-1.5.7-linux64.tgz
        mv arduino-1.5.7 /opt/arduino-ide
        chmod +x /opt/arduino-ide/arduino

        ln -s /opt/arduino-ide/arduino /usr/local/bin/arduino
    fi

    echo "--> ArduinoIDE 1.5.7 Installed"
}

main $@
exit 0

# Builtin variables:
# There are some useful builtin variables, like
echo "Last program's return value: $?"
echo "Script's PID: $$"
echo "Number of arguments passed to script: $#"
echo "All arguments passed to script: $@"
echo "Script's arguments separated into different variables: $1 $2..."
