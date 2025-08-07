from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)  # React से आने वाले request allow करने के लिए

API_KEY = os.getenv('API_KEY')   # OpenWeatherMap API key डालो

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City parameter is missing'}), 400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    print("API Response Status:", response.status_code)
    print("API Response Data:", data)  # Isse pata chalega exact error message

    if response.status_code != 200:
        return jsonify({'error': data.get('message', 'Error fetching weather')}), response.status_code

    return jsonify({
        'city': data['name'],
    'temperature': data['main']['temp'],
    'description': data['weather'][0]['description'],
    'icon': data['weather'][0]['icon'],
    'humidity': data['main']['humidity'],        
    'wind_speed': data['wind']['speed'] 
    })
if __name__ == '__main__':
    app.run(debug=True)