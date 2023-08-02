
# AI-Minds
*Laura* from *AI-Minds* is a program designed to teach languages based on your native language and the one you want to learn, simulating a conversation on the topic you want to learn, where it will give you feedback in your native language and you will be able to "talk" with it, as it responds both in text and voice.

## Content

- [Operating](#Operating)
- [Tech](#Tech)
- [Demo](#Demo)
- [Roadmap](#Roadmap)
- [Quick Start](#Quick-Start)
- [Environment Variables](#Environment-Variables)
- [Authors](#Authors)
## Operating

The whole experience is possible through the use of different artificial intelligences to process your audio to text, generate the conversation and the audio feedback provided in the corresponding language (preferably the one you want to learn in order to put it into practice), as well as the response generated thanks to ElevenLabs' text to speech.
## Tech
**Client:** React, TailwindCSS.

**Server:** Flask.
## Demo

Here you can try the demo!
- [Laura AI-Minds](https://charlyguz.github.io/laura-front/)
If it does not work, it is very likely that the api keys have expired or do not work anymore, so we recommend running it locally.

## Roadmap

To show how it works, you can check the folowing steps:

![Menu](https://i.postimg.cc/ydXPP094/menu.png)
- In the main menu you can enter your user name and choose the language you speak as well as the language you wish to practice in order to generate the answers.
![Record](https://i.postimg.cc/PJCCxjd3/menu.png)
- You will have to grant permissions to access your microphone, as it will be necessary to record your voice and be able to process it with AI, try not to make the voice file too long.
![Stop](https://i.postimg.cc/KzP2DpJG/menu.png)
- Once you have finished speaking, you will need to hit "Stop" to finish recording and send the audio to our server to begin processing. (You can listen to yourself once you are finished).
![Output](https://i.postimg.cc/XNtPYk8x/menu.png)
- Finally, you will have to wait a few seconds while it processes your audio and generates a response, as well as your feedback on the audio you sent according to the AI's interpretation. Either way, your interpretation will be displayed in case it was incorrect and you can resend it if necessary to generate a better interaction.
## Quick Start
To run the program locally, you can follow these steps:

Clone the repository or you can download the .zip file.

```bash
  git clone https://github.com/charlyguz/AI-minds.git
```

In the terminal, go to the folder where the project is located to run the front.

```bash
  cd AI-Minds/react-front
```

Install dependencies.

```bash
  npm install
```

Run the website.

```bash
  npm run
```

Open another terminal and go to the folder where the project is located to run the Flask server.

```bash
  cd AI-Minds/flask-server
```
Run the file server.py as a python program after you assigned the [environment variables](#Environment-variables) their respective api-key so the server can run properly.

```bash
  python server.py
```

Now you can run the project locally.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
`WHISPER_API_KEY`
`GPT_API_KEY`
Both from OpenAI.
`ELEVENLABS_API_KEY`
From ElevenLabs.


## Authors

- [@charlyguz](https://www.github.com/octokatherine) - Carlos Guzman
- [@Gerardo-S-C](https://github.com/Gerardo-S-C) - Gerardo Sandoval
