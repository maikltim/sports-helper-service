Vagrant.configure("2") do |config|
    # Указываем ОС, версию, количество ядер и ОЗУ
    config.vm.box = "centos/stream8"
    config.vm.provider :virtualbox do |v|
      v.memory = 2048
      v.cpus = 2
    end
  
    # Указываем имена хостов и их IP-адреса
    boxes = [
      { :name => "frontend",
        :ip => "192.168.57.2",
      },
      { :name => "backend",
        :ip => "192.168.57.3",
      }
    ]
    # Цикл запуска виртуальных машин
    boxes.each do |opts|
      #config.vm.synced_folder ".", "/vagrant", type: "nfs"
      config.vm.define opts[:name] do |config|
        config.vm.hostname = opts[:name]
        config.vm.network "private_network", ip: opts[:ip]
      end
   end
      config.vm.provision "ansible" do |ansible|
       ansible.playbook = "ansible/provision.yml"
       ansible.inventory_path = "ansible/hosts"
       ansible.host_key_checking = "false"
     end
  end
