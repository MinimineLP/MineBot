# MineBot

[MineBot](github.com/MinimineLP/MineBot),
a discord managing bot.

**Note: **We would advise you to use our [html documentation](Docs).

## Installing

We would advise you to use our [html documentation](Docs). It will be automatically cloned with this repositiory. It has a better install guide.

#### Windows

1\. Install Python: [Python](https://www.python.org/downloads/)

2\. Install NodeJS: [NodeJS](https://nodejs.org/en/)

3\. Download MineBot: [MineBot](https://github.com/MinimineLP/MineBot) (or, if you have installed git type **git clone https://github.com/MinimineLP/MineBot** in your command prompt)

4 Go [here](https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp) and create a google account.

5\. Go [here](https://console.developers.google.com/apis) click at select Project and then on the '+'

6\. Now select your project and enable Youtube data Api v3 and gmail api

7\. Now go left on access data and create an api key and a OAuth 2.0-Client-ID

8 Now go on the Auth 2.0-Client-ID and lick download json. Call the file client_secret.json and do it into the bots folder. Now remember the api key, you will be asked for it in the installer when you first start the bot!

9\. Open the folder with any command prompt and type **pip install --upgrade google-api-python-client** to install the python package

10\. Now install the npm packages **MineBot install**

11\. Now the bot is installed. Now just type **MineBot start**, so it will be started. If you want it to automatically restart, type MineBot **MineBot loopstart**

12\. Go [here](https://discordapp.com/developers/applications/me), create an Application and type in the TOKEN in the bot in the console, when you asked for it.

13\. Replace in this Link the \[ID\] with your bots / applications id: **https://discordapp.com/oauth2/authorize?client_id=\[ID\]&scope=bot&permissions=2146958591** and over this link add the bot to your server.

14\. Enable Developer options on on your Discord account and copy your user id, and type it in the console. Now you will be asked for the email. Type in the Mail address of our futured createted google account! At last type in our api key that we generad at point 8

15 Now everything is ready. You mustn't do that at every start of the bot. If it stops just type**MineBot start** or **MineBot loopstart**





#### Linux and Raspbian

1\. Type **sudo apt-get install node nodejs npm python3 python-pip git screen -y** in your command prompt to instal the base programms.

2\. Type **git clone https://github.com/MinimineLP/MineBot** in your command prompt to download the bot.

3 Go [here](https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp) and create a google account.

4\. Go [here](https://console.developers.google.com/apis) click at select Project and then on the '+'

5\. Now select your project and enable Youtube data Api v3 and gmail api

6\. Now go left on access data and create an api key and a OAuth 2.0-Client-ID

7 Now go on the Auth 2.0-Client-ID and lick download json. Call the file client_secret.json and do it into the bots folder. Now remember the api key, you will be asked for it in the installer when you first start the bot!

8\. Type **pip install --upgrade google-api-python-client** in your command prompt to install the python package.

9\. Type **npm install** in your command prompt to install the python packages.

10\. To start type **screen -L -S MineBot bash start.sh** in your command prompt.

11\. Go [here](https://discordapp.com/developers/applications/me), create an Application and type in the TOKEN in the bot in the console, when you asked for it.

12\. Replace in this Link the \[ID\] with your bots / applications id: **https://discordapp.com/oauth2/authorize?client_id=\[ID\]&scope=bot&permissions=2146958591** and over this link add the bot to your server.

13\. Enable Developer options on on your Discord account and copy your user id, and type it in the console. Now you will be asked for the email. Type in the Mail address of our futured createted google account! At last type in our api key that we generad at point 7

14 Now everything is ready. You mustn't do that at every start of the bot. If it stops just type **screen -L -S MineBot bash start.sh**

## Built in

* [NodeJS](https://nodejs.org/en/) - Main used framework
* [Pyrhon](https://www.python.org/) - Used for the gmail adapter

## Authors

* **Minimine** - *Initial work* - [Minimine](https://github.com/MinimineLP)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
