A very simple CLI command which does the following:

1. Create a git repo
1. Generate a template for a post-receive hook
1. Provide you with the remote repo push/pull urls


# Setup


SSH into your server
```
$ npm i git-server-repo -g
```

Optional:
```
cd to/your/project
```
Then

```
git-server-repo
```
or
```
git server repo --working-dir=/path/to/your/project
```

Then simply update the post-receive file for your custom actions
```
nano path/to/your/project/.git/hooks/post-receive
```

When you're done with all that. Simply push to your repo and voila!
