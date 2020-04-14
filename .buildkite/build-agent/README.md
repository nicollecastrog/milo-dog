# Buildkite Agent

1. Ensure you have the right version of Terraform installed. You can find the required version in [`main.tf`](./main.tf). A handy tool for managing different Terraform versions is [`chtf`](https://github.com/Yleisradio/homebrew-terraforms)

1. Provision with Terraform: `terraform plan`, `terraform apply`, `terraform destroy`

1. Request the real `variables.tf` file from someone who already has it (only the `variables.tf.example` is committed). This file contains sensitive information needed to build the Buildkite agent CI instance

1. Request the private SSH key that corresponds with [`agent_key.pub`](./agent_key.pub) and save it in the following location: `~/.ssh/milo_dog`. This SSH key pair is used to secure the connection to the Terraform-provisioned AWS ubuntu instance so that we in turn can run the [`setup.sh`](./setup.sh) script which installs Buildkite, Docker, and other things our CI server needs
