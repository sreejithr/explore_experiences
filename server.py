import requests

from flask import Flask, jsonify, render_template, request
from settings import API_KEY, EXPERIENCES_URL

app = Flask(__name__)

@app.route('/')
def activity():
    return render_template('search.html')

@app.route('/search')
def search():
    activity = request.args.get('searchterm', '')
    lat = request.args.get('lat', '')
    lng = request.args.get('lng', '')

    url = EXPERIENCES_URL.format(activity=activity, lat=lat, lng=lng)
    resp = requests.get(url, headers={'X-API-KEY': API_KEY})
    if resp.status_code == 200:
        return jsonify(resp.json())
    return jsonify({data: []})

if __name__ == "__main__":
    app.run()

