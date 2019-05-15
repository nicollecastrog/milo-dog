resource "aws_instance" "buildkite-agent" {
  ami             = "${data.aws_ami.linux.id}"
  instance_type   = "t2.micro"
  key_name        = "${aws_key_pair.buildkite-agent-key.key_name}"

  security_groups = [
    "${aws_security_group.allow_inbound_ssh.name}",
    "${aws_security_group.allow_outbound_all.name}"
  ]

  provisioner "remote-exec" {
    inline = [
      "curl -o- -L https://yarnpkg.com/install.sh | bash",
      "sudo yum -y install git",
      "TOKEN=${var.buildkite_token} bash -c \"`curl -sL https://raw.githubusercontent.com/buildkite/agent/master/install.sh`\"",
      "nohup ~/.buildkite-agent/bin/buildkite-agent start &",
      "sleep 1"
    ]

    connection {
      type          = "ssh"
      user          = "ec2-user"
      private_key   = "${file("~/.ssh/milo_dog")}"
    }
  }

  tags {
    Name = "buildkite-agent"
  }
}

resource "aws_eip" "buildkite-agent-eip" {
  instance    = "${aws_instance.buildkite-agent.id}"
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
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "buildkite-agent-key" {
  key_name   = "buildkite-agent-key"
  public_key = "${file("agent_key.pub")}"
}
