# Описание параметров ВМ
MACHINES = {
  # Имя DV "pam"
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
  :backend => {
        :box_name => "centos/stream8",
        :vm_name => "backend",
        :cpus => 2,
        :memory => 2048,
        :ip => "192.168.57.3",

  },
  :prom_graf => {
        # VM box
        :box_name => "centos/stream8",
        # Имя VM
        :vm_name => "prom_graf",
        # Количество ядер CPU
        :cpus => 2,
        # Указываем количество ОЗУ (В Мегабайтах)
        :memory => 2048,
        # Указываем IP-адрес для ВМ
        :ip => "192.168.57.4",
  },
  :elk => {
        :box_name => "centos/stream8",
        :vm_name => "elk",
        :cpus => 2,
        :memory => 2048,
        :ip => "192.168.57.5",

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
      if boxconfig[:vm_name] == "frontend"
       box.vm.provision "ansible" do |ansible|
        #ansible.inventory_path = "ansible/hosts"
        #ansible.host_key_checking = "false"
        #ansible.roles_path = "ansible/roles"
        ansible.config_file = "ansible/ansible.cfg"  
        ansible.playbook = "ansible/nginx.yml"
        ansible.tags = "install_nginx"
      
       end
      end
    end
  end
end
