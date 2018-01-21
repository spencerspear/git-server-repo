# Installation

```
npm install git-server-repo -g
```
*Ensure this is installed GLOBALLY in order for it to work as a custom git command*

### Purpose

I wanted to setup a git repo on my server which would perform some actions on my code once pushed.

### Additional Use Cases

1. Update your website with a simple `git push ...` command
1. Work on your Raspberry Pi remotely using your preferred device/IDE.

### How It Works

On your server/raspberry pi you will have a git repository which accepts commits from other devices (aka your computer where you are working), moves your projects files to your desired directory and then runs a build script on those files (optional).


### Why not use `post-install` in your package.json file?

`git-server-repo` is more versatile as it does not require that you are using node or npm for your project, specifically.

Example -  a C program can be compiled after I push it to my Raspberry Pi.


#### Example 1

I want to practice my C programming on my Raspberry Pi but...:
1. I don't have a computer monitor hooked up directly to the Pi
1. I do don't want to use VIM or NANO as my editors when I SSH into my Pi

##### How To - High Level

1. I enable SSH on my Raspberry Pi
1. Then I SSH into my Rasberry Pi
1. Move myself into the desired directory where I would like my final project files to exist (your/project). Example - here will be your `.c files`
1. Run `git server-repo`
1. Save the generated "remote url" location somewhere for use later
1. Open the `your/project/.git/hooks/post-receive` file and add whatever commands you would like to execute after a new update is received
1. On the device where you will be coding (laptop/desktop/etc), add a remote to your git repo using the remote url from step 5
1. `git push <your-remote> master`
1. View your compiled project files in `your/project`


# Setup

1. [Enable SSH on your Raspberry Pi](https://www.raspberrypi.org/documentation/remote-access/ssh/)

1. SSH into your server/Raspberry Pi
```
ssh <username>@<ip/domain>
```
*Enter your password if prompted*

1. Install git-server-repo package using npm
```
$ npm i git-server-repo -g
```
1. Move into the directory where you would like your final project files
```
cd your/project
```
*You can optionally just use the ```--working-dir``` flag and specify your desired directory. Example: `--working-dir=your/project`*

1. Build the server repository
```
git server-repo
```
1. Copy/save the generated "remote url"
```
ssh://<your-username>@<your-server-ip>/your/project/.git
```
1. Edit the post-receive file with the custom build commands you would like:
```
nano your/project/.git/hooks/post-receive
```
You will want to make all your changes BELOW the following comments
```
#
# DO WHAT YOU WANT WITH THE FILES YOU'VE JUST PUSHED
# example:
#
#   $ gcc app.c -o app
#
# The above compiles your app.c file into an executable after each push
```
1. Now, in a new terminal window, open the project you've been working on. Ensure there is a git repository already setup for your project

1. Add your server/Raspberry Pi as a remote in your git repo. This will allow you to push your code to your server/Raspberry Pi
```
git remote add <remote-name> <your-generated-remote-url>
git remote add raspberry-pi ssh://<your-username>@<your-server-ip>/your/project/.git
```
1. Now you can push your code to your server/raspberry pi simply by running the following command
```
git push raspberry-pi master
```
*The above pushes your master branch to the remote repository. Once there, the post-receive file will move your files to the `your/project/directory` and run your custom commands*
