# Описание параметров ВМ
MACHINES = {
  # Имя DV "pam"
  :monitoring => {
          :box_name => "centos/7",
          :vm_name => "monitoring",
          :cpus => 4,
          :memory => 4096,
          :ip => "192.168.57.6",
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
        :vm_name => "backup",
        :cpus => 2,
        :memory => 2048,
        :ip => "192.168.57.5",

  },
  :backend1 => {
          :box_name => "centos/stream8",
          :vm_name => "backend1",
          :cpus => 2,
          :memory => 2048,
          :ip => "192.168.57.3",
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
        ansible.playbook = "ansible/install.yml"

        if boxconfig[:vm_name] == "monitoring"
         ansible.tags = ["install_prom", "install_grafana_rpm", "settings_grafana", "rsyslog-client", "install_node_exp", "firewall_on"]
        
        elsif boxconfig[:vm_name] == "backend2"
          ansible.tags = ["install_mongo", "enable_auth", "mongo_conf", "install_node", "create_service", "copy_app", "rsyslog-client", "install_node_exp", "firewall_on"]

        elsif boxconfig[:vm_name] == "backup"
          ansible.tags = ["install_mongo", "enable_auth", "mongo_conf", "backup", "rsyslog-srv", "install_node_exp", "firewall_on"]

        elsif boxconfig[:vm_name] == "backend1"
          ansible.tags = ["install_mongo", "enable_auth", "mongo_conf", "enable_repl", "install_node", "create_service", "copy_app", "rsyslog-client", "install_node_exp", "firewall_on"]

        elsif boxconfig[:vm_name] == "frontend"
          ansible.tags = ["install_nginx", "syn_fold", "nginx_cfg", "nginx_selinux", "rsyslog-client", "install_node_exp", "firewall_on"]
        end
      end
    end
  end
end
