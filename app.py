from flask import Flask, request, send_file
import os

app = Flask(__name__)

@app.route("/upload_voice", methods=["POST"])
def upload_voice():
    voice = request.files['voice']
    voice.save("input.wav")
    return "Voice uploaded", 200

@app.route("/speak", methods=["POST"])
def speak():
    text = request.json['text']
    os.system(f'python3 voice_clone.py "{text}"')
    return send_file("output.wav", mimetype="audio/wav")

if __name__ == "__main__":
    app.run(debug=True)