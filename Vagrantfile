# -*- mode: ruby -*-
# vi: set ft=ruby :

##################################
###   MAIO CLOUD VAGRANTFILE   ###
##################################
Vagrant.configure("2") do |config|

  # Define multiple machines:
  #
  # 1st machine is for the espos
  #
  # Machine name: app-skeleton.maio.test
  # IP Address:   192.168.36.10
  #
  config.vm.define "app-skeleton" do |mch|
    mch.vm.hostname = "app-skeleton.maio.test"
    mch.vm.network "private_network", ip: "192.168.36.10"

    # provisions
    mch.vm.provision "shell", path: "bin/bootstrap.sh", args: "apache php composer phpunit nodejs bower gulp karma protractor"

    mch.vm.provision "shell", inline: <<-SHELL
        if ! grep -Fxq "alias execute-unittest" /home/ubuntu/.bashrc; then
            echo "alias execute-unittest=/vagrant/bin/rununittest.sh" >> /home/ubuntu/.bashrc
        fi
        if ! grep -Fxq "alias execute-e2etest" /home/ubuntu/.bashrc; then
            echo "alias execute-e2etest=/vagrant/bin/rune2etest.sh" >> /home/ubuntu/.bashrc
        fi
    SHELL

    mch.vm.provision "shell", run: "always", inline: <<-SHELL
      if [ -f "/etc/init.d/apache2" ]; then
        /etc/init.d/apache2 restart
      fi
    SHELL
    
    # vm
    mch.vm.provider "virtualbox" do |vb|
      # Log place
      vb.customize [ "modifyvm", :id, "--uartmode1", "file", File.join(Dir.pwd, "logs/ubuntu-xenial-16.04-vm_app-console.log") ]
    end
  end

  # 
  # CONTINUE WITH COMMONS SETTINGS
  #

  # set box
  config.vm.box = "ubuntu/xenial64"

  # require plugins
  required_plugins = %w( vagrant-vbguest vagrant-disksize landrush )
  _retry = false
  required_plugins.each do |plugin|
      unless Vagrant.has_plugin? plugin
          system "vagrant plugin install #{plugin}"
          _retry=true
      end
  end
  if (_retry)
      exec "vagrant " + ARGV.join(' ')
  end

  # adjust disk size
  config.disksize.size = "30GB"

  # set dns landrush settings
  config.landrush.enabled = true
  config.landrush.tld = "maio.test"
  
  # set virtualbox settings
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = false

    # Customize the amount of memory on the VM:
    vb.memory = "4096"
  end
end
