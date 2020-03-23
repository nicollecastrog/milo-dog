# Buildkite Agent

1. Provision with Terraform: `terraform plan`, `terraform apply`, `terraform destroy`

1. Request the real `variables.tf` file from someone who already has it (only the `variables.tf.example`) is committed

1. Request the private SSH key that corresponds with [`agent_key.pub`](./agent_key.pub) and save it in the following location: `~/.ssh/milo_dog`