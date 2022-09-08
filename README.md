# SiteFlex
## 😼 Introduction
The emergence of **microservices** and **microfrontends** posed a real threat on lazy programmers.
Consider this scenario, you have multiple directories in your workspace folder, which can all be executed with a single command `yarn start` but on a different terminal.

![image](https://user-images.githubusercontent.com/52530644/188301639-b713a906-4ddb-4bf2-8bc2-b1d125953be6.png)

![image](https://user-images.githubusercontent.com/52530644/188301585-a179a928-ee82-4ff7-8034-ad8138a91f35.png)



I got you covered! All of these boring tasks can now be done easily with **SiteFlex**.



## 😼 Storytelling

### 😸 The kickoff

First off, why does this section even exist? Also, why does it has to be prior to **Installation**? It's simple, people tend to seek jealousy around others' Github profiles but never actually clone, run and appreciate any of their works. I started to accept this truth, so I decided to entertain you with a story in README.md, so you can enjoy my story instead.

Without further ado...

I've just been assigned to a new project with a gigantic architecture design. More precisely, it's implemented microfontend for the client side and microservice for server side. let's just focus on the client side.

Just in case you didn't know what is microfrontend, the main idea of the concept is to distribute your frontend application into multiple processes, each is responsible a specific service, or feature. Therefore, to successfully run the application *as a whole*, I'd have to start every project individually.

"Yay, a new coding day, I'm gonna be dead productive today" - said myself.

"Oh damn, I have to `cd api-service; yarn start`,  `cd style-service; yarn start`, `cd love-í-i-iservice; yarn start`, and the same to the rest 69 folders before even getting my hands dirty on the code!" - said myself with a frown.

I don't know about you but repeating the same thing over and over again, day by day, has got my motivation heavily devastated. Like, come on! I'm a **software developer**, NOT a **yarn starter**.

Anyway, as a software developer, I've got a lazy mindset. If you code long enough, you'll recognize the pattern:

> "If a task is long, repetitive and tedious, there's a high chance someone has automated it." - CuteTN

In fact, I was not the only one who has thought of this. My co-workers loved it, my leader wished for it, yet nobody had made any changes except for one of my best friends in the team (I highly appreciate your inspiration, [Hậu](https://github.com/haunc08)). I decided to give him a hand on the idea.

Our original approach was pretty straightforward: using **Shell Script**. That wasn't too bad! In fact, we have created many different versions of the script but none of them is perfect for our use-case. I'd skip the details here, but our main pain points were to interact with the OS through Shell.

This is the point where I came across with a wild idea. How about building my own **VSCode extension**?

My choice on VSCode actually made sense. My whole team are working with VSCode. I myself love it, especially when combined with **vim extension**. If there's any better code editor than VSCode, then it must be **vim**, or **notepad**. I have met a friend who preferred Visual Studio, and his coding skill is nothing but garbage (I'm not making any assumption here, I'm talking about a guy, if you try to generalize it, then your logic skill is nothing but Windows 11). In addition, VSCode offers a range of different built-in toolsets with friendly interfaces. Its capacity to manipulate terminals and customize views was gems!

I've had great experience on working with VSCode before, mostly from configuring my favorite key bindings and commands. But building a full, complete extension has never been on my menu. However, I love "weird" stuffs, I love the feeling of discovery along with any of my journeys, not its end result. With that in mind, I gave it a shot!

So I defined a goal, as a user story:

> As a coder, I want an extension that lets me select multiple folders in the my project's directory. Once the folders are selected, I can create a terminal instance for each, and send `yarn start` to that instance.

As you can see, the extension was initially made for a specific use-case, which is to serve my project, which is why the name of the extension was highly inspired on the name of the project itself (I couldn't reveal it here due to the complicated copyrights rules of my organization). Anyway, we'll get to this later.

My initial plan was simple: user's selected folders should be stored in a `.siteflex-config` file, which was adequately good, but not quite user friendly. So I decided to take on a higher target: to create a GUI sidebar so that the user can easily filter their necessary folders.

That decision has ruined my vacation, sort of...

### 😿 The process

​		**Day 1: Learning & planning**

I spent most of my first day investigating the APIs of VSCode. The documentation was huge, and I, honestly, was overwhelmed by how much information I had to accumulate.

It wasn't hard to find [sample codes and boilerplates](https://github.com/microsoft/vscode-extension-samples) online, but to gather those piece of code altogether was still too challenging. Hopefully, I managed to get my first command prototype and a render-able view right in the first day.

I have a weird interest in building standalone applications, which means I tried to use nothing other than what I was given in the template. Reinventing the wheel is always painful and this is no exception. I have to construct my view and its logic in plain html-css-js, I did not even install VanillaJS. I started to feel grateful for my 2-week experience on the skill...

​		**Day 2: Building & suffering**

Developing VSCode extension was fun, until you have to build a custom **webview** for it.

To fully understand the next part, please keep in mind that the **extension** and the **webview** are not in the same process and environment. In other words, "Think of a webview as an `iframe` within VS Code that your extension controls" - said the [doc](https://code.visualstudio.com/api/extension-guides/webview) itself. Therefore, communication between extension and webview can only done by message passing.

There might be a way to debug custom view properly, the only problem, however, was I couldn't figure it out. Which made the whole coding experience the pain in the ass. If I wanted to debug a UI styling behavior, I had to create a prototype on browser. If I wanted to `console.log` some data, I had to send the log content back to extension. It was not the worst, thought, if there were compile errors, the view script would just *silently* disabled, just imagine you have to comment/uncomment every single line of code just to find a single compile error...

By the end of day 2, I could finally load all of the folders in the current workspace to my view. The progress was quite slow because of unexpected compile errors about function hoisting... Nevertheless, I'd gone through one of the most pivotal part: the communication between webview and extension!

​		**Day 3: Finishing & enhancing**

Right after getting the bridge built, I could easily implement the rest of the features, including synchronizing workspace state to webview's state, integrate with VSCode terminal, improve UI/UX.

As soon as I get here, I realized that my extension was able to serve much more general purposes by letting people customize their command to execute for each terminal. The extension then had nothing to do with my project no more. As a result, I changed the requirements to this:

> As a coder, I want an extension that lets me select multiple folders in the current workspace directory. Once the folders are selected, I can create a terminal instance for each, and send a command to that instance.

​		**Day 4: Releasing and bragging**

You may be pissed out that I use the word **"and"** instead of **"&"** there but I would give no foot. I'm writing this **README.md** in my own style to celebrate my accomplishment. Writing an extension is one of my dreams ever since my first line of code. There were ups and downs, but I eventually pulled it off after all.

Ladies and gentlemen, this would unlock even more weird-ass projects on this account! So stay tuned!

### 😽 The outcome

Just clone the damn repository.



## 😼 Installation

### 😺 Get the extension file (*.vsix)

If you're interested in installing the extension from source code yourself, then just clone it and follow the full documentation [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

Otherwise, for you, lazy people, I had it done for you. You just have to download the zip from [here](https://github.com/CuteTN/SiteFlex/releases).

### 😺 Install extension to your VSCode

​		**CLI:**

The Sun might disappear, but nerdy guys don't. Just make sure you have `code` set to your VSCode's path in the environment variables of your OS.

```bash
code --install-extension <path-to-vsix-file>
```

​		**GUI:**

If you follow this, no worries, you're an ordinary person and congratulations, you'll easily fit in any parties.

In your VSCode, hit `ctrl+shift+p` (*Show all commands*) and search for ""**Extensions: Install from VSIX...**" command. Press enter, browse and select the **\*.vsix** file.

![image](https://user-images.githubusercontent.com/52530644/188316617-85232806-1cf2-4142-81b0-908663a9b7ea.png)



## 😼 Usage

### 🙀 Select folders and enter terminal command

Just toggle SiteFlex's view from the *squirrel icon*, everything else should be straightforward.

Side story, the only reason for which I opted for the squirrel, was I thought it was cute.

![image](https://user-images.githubusercontent.com/52530644/188316886-60067e42-d582-4015-adf8-3207cd9bb0e3.png)

### 😹 Send the terminal command

Besides the obvious way to trigger the command, which is to sing [this song](https://www.youtube.com/watch?v=dQw4w9WgXcQ) to the "**Execute**" button, you can also use keyboard shortcut: `ctrl+i i`.



## 😼 License

The extension's source code was published under [MIT](https://github.com/CuteTN/SiteFlex/blob/main/LICENSE) license. Which means you are free to clone and do whatever you want to it, but I would give no damn about your mom's safety.

Ever since I started to create this extension, I've never been too serious, but if you are, feel free to contact me, I need a friend; or you can build your own from the idea (I would love to take credits if possible).

Despite my playful mindset, reliability is always highly concerned. If you find any bugs, contact me, I need a friend.



## 😼 Todo

These are just ideas. I don't have any plans to implement these anytime soon. I would do, though, as asap as I need it.

- **Custom display name:** Folder's name are sometimes too long, but doesn't carry as much information. It's reasonable for one to change the display name of a folder on a terminal.
- **Sending signals to terminals:** Instead of raw text commands, we may wish to send ***SIGINT*** signal to terminate the terminal task. Think about that!
- **Directory's categories:** You may want to group multiple directories to execute a command, while other groups require a different command.
- **Manual input:** Whenever you need to execute a new command, instead of getting to the sidebar end key in the new text all the time, you can input your command in the VSCode's built-in input. We will have an option to toggle this feature.
- **Execution order:** Sometimes, the order of directories to run the terminal commands matters.
- **Finishing the last todo description:** It is just extremely annoying if
