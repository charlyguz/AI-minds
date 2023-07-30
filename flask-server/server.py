from flask import Flask, request, jsonify
from flask_cors import CORS
#import openai_secret_manager #esta importacion causa unos problemitas revisen sus instalaciones antes de correr el servidos
import openai
import requests

#assert "openai" in openai_secret_manager.get_services()
#secrets = openai_secret_manager.get_secret("openai")

app = Flask(__name__)
CORS(app)

@app.route('/process_audio', methods=['POST'])
def process_audio():
    audio_file = request.files['audio']
    # Utiliza Whisper para convertir el audio a texto
    text = transcribe_audio(audio_file)
    # Utiliza GPT para analizar el texto y generar retroalimentación
    feedback = get_feedback(text)
    response = {"message": feedback}
    return jsonify(response)

def transcribe_audio(audio_file):
    # Aquí iría el código para enviar una solicitud a la API de Whisper
    # y convertir el archivo de audio en texto
    response = requests.post(
        "https://api.openai.com/v1/engines/davinci-coding/completions",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {secrets['api_key']}"
        },
        data={
            "prompt": f"Transcribe this audio file into text: {audio_file}",
            "max_tokens": 1024,
            "n": 1,
            "stop": None,
            "temperature": 0.5,
        }
    )
    data = response.json()
    text = data['choices'][0]['text']
    return text

def get_feedback(text):
    # Aquí iría el código para enviar una solicitud a la API de GPT-4
    # y obtener retroalimentación a partir del texto transcrito
    response = requests.post(
        "https://api.openai.com/v1/engines/davinci-coding/completions",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {secrets['api_key']}"
        },
        data={
            "prompt": f"Analyze this text and provide feedback: {text}",
            "max_tokens": 1024,
            "n": 1,
            "stop": None,
            "temperature": 0.5,
        }
    )
    data = response.json()
    feedback = data['choices'][0]['text']
    return feedback

if __name__ == '__main__':
    app.run(debug=True)
