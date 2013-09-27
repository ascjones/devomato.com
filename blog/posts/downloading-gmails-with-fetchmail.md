---
title: 'Downloading gmails with fetchmail'
date: 2013-09-27
posts: true
tags: ['mac']
---

I wanted to download a bunch of notification emails from my gmail to run some analysis on them. The emails I want are already assigned a gmail label, so how do I download them quickly? Turns out it's easy - I used <a href="http://pyropus.ca/software/getmail/" target="_blank">getmail</a>, which is often used as a tool for <a href="http://www.mattcutts.com/blog/backup-gmail-in-linux-with-getmail/" target="_blank">backing up your gmail account</a>. Here's what I did:

### Install getmail

I'm doing this on the mac so using trusty homebrew for that:

```
brew install getmail
```

And now create a directory to store the configuration file(s) and downloaded emails:

```
mkdir ~/.getmail
```

### Create configuration file

Now to tell getmail where to get the email from and where to put it, so I create a config file called `getmail.gmail` in the `.getmail` directory, which looks something like this:

```
[retriever]
type = SimpleIMAPSSLRetriever
server = imap.gmail.com
username = <username>
password = <password>
mailboxes = ("Label",)

[destination]
type = Maildir
path = ~/.getmail/gmail-download/

```

Note that the `path` directory specified under `[destination]` must be manually created with three subfolders: `cur`, `new` and `tmp`.

### Run getmail

Now the easy part - just run getmail pointing it at your config file specified above:

```
getmail -r ~/.getmail/getmail.gmail
```

That should proceed to download all emails under the given label(s) into the specified directory, ready to be hacked away on.