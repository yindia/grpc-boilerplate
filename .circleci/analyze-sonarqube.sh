#!/bin/bash

SONAR_VERSION="sonar-scanner-cli-3.2.0.1227-linux"
SONAR_DIR="sonar-scanner-3.2.0.1227-linux"

wget -P $HOME -N "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/${SONAR_VERSION}.zip"
unzip -d $HOME $HOME/$SONAR_VERSION.zip
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
npm install -g typescript
export NODE_PATH="/usr/lib/node_modules/"

echo "Analyzing ${CIRCLE_BRANCH} branch to push issues to SonarQube server"
$HOME/$SONAR_DIR/bin/sonar-scanner;
