resource "aws_instance" "buildkite-agent" {
  ami           = "${data.aws_ami.ubuntu.id}"
  instance_type = "t2.micro"
  key_name      = "${aws_key_pair.buildkite-agent-key.key_name}"

  security_groups = [
    "${aws_security_group.allow_inbound_ssh.name}",
    "${aws_security_group.allow_outbound_all.name}",
  ]

  provisioner "file" {
    source      = "setup.sh"
    destination = "/tmp/setup.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.ssh/milo_dog")}"
    }
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/setup.sh",
      "/tmp/setup.sh ${var.buildkite_token}",
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
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
