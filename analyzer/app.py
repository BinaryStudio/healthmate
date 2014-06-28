import json
from flask import Flask
from flask import request
from tools.cache import QueryCache
from services.weight_activities import WeightActivities

app = Flask(__name__)

def jsonp(json_data):
    rs = ''
    if request.args.get('callback'):
        rs = request.args.get('callback') + '(' + \
             json.dumps(json_data) + ')'
    else:
        rs = json.dumps(json_data)
    return rs

@app.route('/')
def NA():
    return 'NA'

@app.route('/loseweight/<usercred>/<start>/<end>')
def get_activities(usercred, start, end):
    return jsonp(wa.get_activities(usercred, start, end))

@app.route('/loseweight/<usercred>/weight')
def get_weight_activities(usercred):
    return jsonp(wa.get_weights(usercred))

if __name__ == '__main__':
    api_prefix = 'https://api.humanapi.co/v1/'
    cache = QueryCache(api_prefix)
    wa = WeightActivities(cache)
    app.config['DEBUG'] = True
    app.run('192.168.0.3')
