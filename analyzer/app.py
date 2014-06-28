import json
from flask import Flask
from tools.cache import QueryCache
from services.weight_activities import WeightActivities

app = Flask(__name__)

@app.route('/')
def NA():
    return 'NA'

@app.route('/loseweight/<start>/<end>')
def get_activities(start, end):
    return json.dumps(wa.get_activities(start, end))

@app.route('/loseweight/<usercred>')
def get_weight_activities(usercred):
    return json.dumps(wa.get_weights(usercred))

if __name__ == '__main__':
    api_prefix = 'https://api.humanapi.co/v1/'
    cache = QueryCache(api_prefix)
    wa = WeightActivities(cache)
    app.config['DEBUG'] = True
    app.run('192.168.1.227')
