from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import openai
import requests
import os
from elevenlabs import Voice, VoiceDesign, Gender, Age, Accent,  generate
from elevenlabs import set_api_key
from io import BytesIO
import base64

# set_api_key("") descomentar y aqui poner la api de 11l 
whisper_api_key = os.environ['WHISPER_API_KEY']
gpt_api_key = os.environ['GPT_API_KEY']
elevenlabs_api_key = os.environ['ELEVENLABS_API_KEY']
openai.api_key = '' # aqui poner la api de open ai
app = Flask(__name__)
CORS(app)
"""
@app.route('/process_audio', methods=['POST'])
def process_audio():
    audio_file = request.files['audio']
    user_name = request.form['user_name']
    native_language = request.form['native_language']
    target_language = request.form['target_language']
    
    # Utiliza Whisper para convertir el audio a texto
    text = transcribe_audio(audio_file)
    
    # Utiliza GPT para analizar el texto y generar retroalimentación
    feedback = get_feedback(text, user_name, native_language, target_language)
    
    # Utiliza ElevenLabs para convertir el texto de retroalimentación a voz
    audio_feedback = text_to_speech(feedback, target_language)
    
    # Utiliza GPT para generar una respuesta en el idioma nativo y en el idioma objetivo
    response_text = get_response(text, user_name, native_language, target_language)
    
    # Utiliza ElevenLabs para convertir el texto de respuesta a voz en ambos idiomas
    native_audio_response = text_to_speech(response_text['native'], native_language)
    target_audio_response = text_to_speech(response_text['target'], target_language)
    
    response = {
        "feedback": feedback,
        "audio_feedback": audio_feedback,
        "native_response": response_text['native'],
        "target_response": response_text['target'],
        "native_audio_response": native_audio_response,
        "target_audio_response": target_audio_response,
    }
    return jsonify(response)

def transcribe_audio(audio_file):
    # Aquí iría el código para enviar una solicitud a la API de Whisper
    # y convertir el archivo de audio en texto
    # Por ejemplo:
    response = requests.post(
        "<URL DE LA API DE WHISPER>",
        headers={
            "Content-Type": "application/json",
           # "<OTROS ENCABEZADOS NECESARIOS>"
        },
        data={
            "<DATOS NECESARIOS PARA ENVIAR EL ARCHIVO DE AUDIO A LA API DE WHISPER>"
        }
    )
    data = response.json()
    text = data['<CAMPO DONDE SE ENCUENTRA EL TEXTO TRANSCRITO>']
    return text

def get_feedback(text, user_name, native_language, target_language):
    # Aquí iría el código para enviar una solicitud a la API de GPT-4
    # y obtener retroalimentación a partir del texto transcrito
    # Por ejemplo:
    prompt = text
    
    response = requests.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {gpt_api_key}"
        },
        json={
            "prompt": prompt,
            "max_tokens": 1024,
            "n": 1,
            "stop": None,
            "temperature": 0.5,
        }
    )
    
    data = response.json()
    feedback = data['choices'][0]['text']
    
    return feedback """ 

def text_to_speech(text, language):
    # Utiliza la API de ElevenLabs para convertir el texto en voz
    audio = generate(
    text=text,
    voice="Bella",
    model='eleven_multilingual_v1'
        )
    return audio


    
@app.route('/start_conversation', methods=['POST'])
def start_conversation():
    user_name = request.form['user_name']
    native_language = request.form['native_language']
    target_language = request.form['target_language']
    
    # Utiliza GPT para generar una respuesta en el idioma nativo y en el idioma objetivo
    response_text = get_response("", native_language, target_language)
    
    # Utiliza ElevenLabs para convertir el texto de respuesta a voz en ambos idiomas
    target_audio_response = text_to_speech(response_text, target_language)

    target_audio_base64 = base64.b64encode(target_audio_response).decode()

    # Envía el audio como una respuesta de archivo
    response_data = {
        'text_response': response_text,
        'audio_response': target_audio_base64
    }
    
    return jsonify(response_data)
    



def get_response(text, native_language, target_language):
    # Aquí iría el código para enviar una solicitud a la API de GPT-4
    # y generar una respuesta en el idioma nativo y en el idioma objetivo
    # Por ejemplo:
    if text == "":
        prompt = f"Apartir de ahora seras una maestra de idiomas llamada Laura que me ayudara a aprender {target_language} apartir de mi idioma natal que es {native_language}. Quiero que inicies la conversacion diciendome tu nombre y que seras mi maestra y podemos hablar de cualquier tema que deses todas las resuestas que me devuelvas quiero que primero me las des en mi  idioma natal y despues en el idioma que quiero aprender para asi saber como deberia continuar una conversacion en el idioma que quiero aprender. La respuesta que recibiras siempre sera en el idioma que deseo aprender y tu debes continuar la conversacion. Todo lo que me digas tiene que estar en 2 versiones 1 es en mi idioma natal y la segunda es el idioma que quiero aprender. Las respuestas que me des deben ser cortas para que no me pierda entre tanto texto."
    else:
        prompt = text 
    
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )

    
    response_text = response["choices"][0]["text"]
    
    return response_text

if __name__ == '__main__':
    app.run(debug=True)
