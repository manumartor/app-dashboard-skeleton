#!/usr/bin/env bash

LAMP_INSTALL=true
NODEJS_INSTALL=true
COMPOSER_INSTALL=true
PHPUNIT_INSTALL=true
JMETER_INSTALL=true

MYSQL_PASS=root
MYSQL_CNF=/etc/mysql/mysql.conf.d/mysqld.cnf
PHP_XDEBUGINI=/etc/php/7.0/mods-available/xdebug.ini

TIMEZONE=Europe/Madrid

# configure timezone
timedatectl set-timezone $TIMEZONE

# Update server
sudo apt-get -y update
sudo apt-get -y upgrade

# Install commons tools
apt-get -y install build-essential g++ binutils-doc git

# Install LAMP
if $LAMP_INSTALL; then
  # Install Apache
  apt-get install -y apache2
  if ! [ -d /vagrant/public ]; then
    mkdir /vagrant/public
    echo "<?php phpinfo();" >> /vagrant/public/index.php
  fi
  if ! [ -f /var/www/html/ ]; then
    rm -rf /var/www/html
    ln -fs /vagrant/public/ /var/www/html
  fi

  # Set Apache Logs
  if ! [ -d /var/log/apache2/ ]; then
    sudo rm -rf /var/log/apache2/
    ln -fs /vagrant/logs/apache2 /var/log/apache2
  fi
  echo "-->Apache2 installed!!"

  #Install PHP
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

  echo "-->PHP Installed!!"

  # Install MySQL
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
  fi

  service mysql restart
  echo "-->MySQL installed!! pass: $MYSQL_PASS"

  # Restart Apache service
  service apache2 restart
fi

# Install nodejs
if $NODEJS_INSTALL; then  
  apt-get install -y python-software-properties python g++ make
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  # curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  apt-get install -y nodejs

  # Update npm
  npm i -g npm
  
  # Install bower globally
  npm install -g bower

  # Install gulp globally
  #npm install -g gulp

  # Install karma globally
  apt-get install -y xvfb chromium-browser firefox
  if ! [ -f /etc/profile.d/custom.sh ]; then
    echo "export DISPLAY=:99.0
export CHROME_BIN=/usr/bin/chromium-browser
export FIREFOX_BIN=/usr/bin/firefox

alias app-rununittest=/vagrant/bin/rununittest.sh" > /etc/profile.d/custom.sh
  fi
  npm install -g karma karma-cli  
  npm install -g jasmine-core jasmine-node jasmine-reporters karma-jasmine karma-chrome-launcher karma-firefox-launcher karma-coverage karma-junit-reporter

  # Install protractor globally
  npm install -g protractor

  echo "--> nodejs installed!!"
fi

# Install composer
if $COMPOSER_INSTALL; then 
  apt-get install -y composer
  echo "--> composer installed!!"
fi

# Install phpunit
if $PHPUNIT_INSTALL; then
  if ! [ -f /usr/local/bin/phpunit ]; then
    wget -q https://phar.phpunit.de/phpunit.phar
    chmod +x phpunit.phar 
    mv phpunit.phar /usr/local/bin/phpunit
  fi
  echo "--> phpunit installed!!"
fi

# Install jmeter
if $JMETER_INSTALL; then
  if ! [ -d /usr/local/lib/apache-jmeter ]; then
    apt-get install -y default-jre
    wget -q http://redrockdigimark.com/apachemirror/jmeter/binaries/apache-jmeter-3.1.tgz
    tar -xf apache-jmeter-3.1.tgz
    mv apache-jmeter-3.1/ /usr/local/lib/apache-jmeter
    ln -fs /usr/local/lib/apache-jmeter/bin/jmeter /usr/local/bin/jmeter
    ln -fs /usr/local/lib/apache-jmeter/bin/jmeter-server /usr/local/bin/jmeter-server
  fi
  echo "-->jmeter installed!!"
fi

apt-get -y autoremove