# Описание параметров ВМ
MACHINES = {
  # Имя DV "pam"
  :backend1 => {
          :box_name => "centos/stream8",
          :vm_name => "backend1",
          :cpus => 2,
          :memory => 2048,
          :ip => "192.168.57.3",
  
    },
  :backend2 => {
          :box_name => "centos/stream8",
          :vm_name => "backend2",
          :cpus => 2,
          :memory => 2048,
          :ip => "192.168.57.4",
  
    },
  :backup => {
        :box_name => "centos/stream8",
        :vm_name => "backend2",
        :cpus => 2,
        :memory => 2048,
        :ip => "192.168.57.5",

  },
  :frontend => {
        # VM box
        :box_name => "centos/stream8",
        # Имя VM
        :vm_name => "frontend",
        # Количество ядер CPU
        :cpus => 2,
        # Указываем количество ОЗУ (В Мегабайтах)
        :memory => 2048,
        # Указываем IP-адрес для ВМ
        :ip => "192.168.57.2",
  },
  
  #:barman => {
  #      :box_name => "centos/stream8",
  #      :vm_name => "barman",
  #      :cpus => 2,
  #      :memory => 2048,
  #      :ip => "192.168.57.13",
#
  #},

}

Vagrant.configure("2") do |config|

  MACHINES.each do |boxname, boxconfig|
    
    config.vm.define boxname do |box|
   
      box.vm.box = boxconfig[:box_name]
      box.vm.host_name = boxconfig[:vm_name]
      box.vm.network "private_network", ip: boxconfig[:ip]
      box.vm.provider "virtualbox" do |v|
        v.memory = boxconfig[:memory]
        v.cpus = boxconfig[:cpus]
      end

      # Запуск ansible-playbook
      box.vm.provision "ansible" do |ansible|
        ansible.inventory_path = "ansible/hosts"
        ansible.host_key_checking = "false"
        if boxconfig[:vm_name] == "backend1"
          ansible.playbook = "ansible/node.yml"
          ansible.tags = ["install_mongo", "enable_auth", "mongo_conf", "install_node", "create_service", "copy_app"]

        elsif boxconfig[:vm_name] == "backend2"
          ansible.playbook = "ansible/node.yml"
          ansible.tags = ["install_mongo", "enable_auth", "mongo_conf", "install_node", "create_service", "copy_app"]

        elsif boxconfig[:vm_name] == "backup"
        ansible.playbook = "ansible/node.yml"
        ansible.tags = ["install_mongo", "enable_auth", "mongo_conf"]

        elsif boxconfig[:vm_name] == "frontend"
          ansible.playbook = "ansible/nginx.yml"
          ansible.tags = ["change_hosts", "install_nginx", "syn_fold", "nginx_cfg", "nginx_selinux"]
        end
      end
    end
  end
end
