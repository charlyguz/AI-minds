from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['GET'])
def welcome():
    response = {"message": "Bienvenido a la API!"}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
