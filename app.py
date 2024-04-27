from flask import Flask, render_template, request, jsonify
from gtts import gTTS
import os
import uuid

app = Flask(__name__)

# Create directory for audio files if it doesn't exist
audio_dir = 'static/audio'
if not os.path.exists(audio_dir):
    os.makedirs(audio_dir)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_text_to_speech():
    text = request.form.get('text')
    if text:
        audio_file = str(uuid.uuid4()) + '.mp3'  # Generate a unique filename
        tts = gTTS(text=text, lang='en')
        output_file = os.path.join(audio_dir, audio_file)
        tts.save(output_file)
        return jsonify({'status': 'success', 'audio_file': audio_file})
    else:
        return jsonify({'status': 'error', 'message': 'Text not provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
