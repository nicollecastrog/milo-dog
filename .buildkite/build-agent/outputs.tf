output "server-ip" {
  value = "${aws_eip.buildkite-agent-eip.public_ip}"
}
