#!/bin/bash

sudo apt-get -y update

# get docker requirements:
echo '* libraries/restart-without-asking boolean true' | sudo debconf-set-selections
sudo apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

# get yarn repo:
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# get docker repo:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# get buildkite agent repo:
sudo sh -c 'echo deb https://apt.buildkite.com/buildkite-agent stable main > /etc/apt/sources.list.d/buildkite-agent.list'
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 32A37959C2FA5C3C99EFBC32A79206696452D198

# install:
sudo apt-get -y update && sudo apt-get -y install yarn docker-ce docker-ce-cli containerd.io buildkite-agent

# install latest version of docker-compose:
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
echo 'Docker Compose Version:'
docker-compose --version

# add ubuntu and buildkite users to docker group:
sudo usermod -aG docker buildkite-agent

# enable experimental feature (ie: Buildkit) on Docker daemon:
echo '{ "experimental": true }' | sudo tee -a /etc/docker/daemon.json
sudo service docker restart

# start buildkite agent:
sudo sed -i "s/xxx/${1}/g" /etc/buildkite-agent/buildkite-agent.cfg
sudo systemctl enable buildkite-agent && sudo systemctl start buildkite-agent
sleep 1
