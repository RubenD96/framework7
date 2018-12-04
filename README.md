# framework7
## Project Setup
### Install node.js (and npm)

Download the latest version of node.js (node-v<actual version>-x64.msi).

	https://nodejs.org/en/download/

Doubleclick to start the installation. 

The Node.js Setup Wizard will start now.
Click a number of times Next, then press Install and in the end click Finish.
Node.js is installed in C:\Program Files\nodejs
Open cmd-box and check if the right version has been installed. Type in: node –v 
The actual version should appear now!

npm (node package manager) is installed simultaneously with node.js.
Verify this by entering the following command in the cmd-box: npm -v
### Clone the project
Open gitbash:
```sh
$ cd - ( choose path where project will be stored )
$ git clone https://github.com/RubenD96/framework7.git
```
### Install Phonegap/Cordova
Open Doscommand box (Windows key-r: cmd):
```sh
$ npm install -g phonegap cordova
```
### Install npm packages
Open Doscommand box (Windows key-r: cmd):
```sh
$ cd - ( project folder )
$ npm install
```
### Build project
Open Doscommand box (Windows key-r: cmd):
```sh
$ cd - ( project folder )
$ npm run build
```
### Add mobile platform
#### Android
Open Doscommand box (Windows key-r: cmd):
```sh
$ cd - ( project folder )
$ phonegap platform add android
```
#### iOS
Open Doscommand box (Windows key-r: cmd):
```sh
$ cd - ( project folder )
$ phonegap platform add iOS
```
### Execute on phone
Open Doscommand box (Windows key-r: cmd):
```sh
$ cd - ( project folder )
$ cordova run android
```
