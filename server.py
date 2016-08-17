import requests

from flask import Flask, jsonify, render_template, request
from settings import API_KEY, EXPERIENCES_URL

app = Flask(__name__)

@app.route('/')
def activity():
    if request.method == "POST":
        url = EXPERIENCES_URL.format(activity="surfing", lat=37.7756, lng=-122.4193)
        resp = requests.get(url, headers={'X-API-KEY': API_KEY})

    return render_template('search.html')

if __name__ == "__main__":
    app.run()
