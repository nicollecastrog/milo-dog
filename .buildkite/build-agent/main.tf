resource "aws_instance" "buildkite-agent" {
  ami           = "${data.aws_ami.linux.id}"
  instance_type = "t2.micro"
  key_name      = "${aws_key_pair.buildkite-agent-key.key_name}"

  security_groups = [
    "${aws_security_group.allow_inbound_ssh.name}",
    "${aws_security_group.allow_outbound_all.name}",
  ]

  provisioner "remote-exec" {
    inline = [
      "curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo",
      "curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -",
      "sudo yum -y install yarn git",
      "sudo yum -y install yum-utils device-mapper-persistent-data lvm2",
      "sudo yum -y install http://vault.centos.org/centos/7.3.1611/extras/x86_64/Packages/container-selinux-2.9-4.el7.noarch.rpm",
      "sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo",
      "sudo yum -y install docker-ce docker-ce-cli containerd.io",
      "sudo service docker start",
      "sudo usermod -a -G docker ec2-user",
      "newgrp docker",
      "docker info",
      "sudo curl -L \"https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "TOKEN=${var.buildkite_token} bash -c \"`curl -sL https://raw.githubusercontent.com/buildkite/agent/master/install.sh`\"",
      "nohup ~/.buildkite-agent/bin/buildkite-agent start &",
      "sleep 1",
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = "${file("~/.ssh/milo_dog")}"
    }
  }

  tags {
    Name = "buildkite-agent"
  }
}

resource "aws_eip" "buildkite-agent-eip" {
  instance = "${aws_instance.buildkite-agent.id}"
}

resource "aws_security_group" "allow_inbound_ssh" {
  name        = "allow-ssh"
  description = "Allow SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_outbound_all" {
  name        = "allow-all-outbound"
  description = "Allow all outbound traffic"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "buildkite-agent-key" {
  key_name   = "buildkite-agent-key"
  public_key = "${file("agent_key.pub")}"
}
