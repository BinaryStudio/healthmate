import json
from flask import Flask
from flask import request
from tools.cache import QueryCache
from services.weight_activities import WeightActivities
from services.basic import BasicData

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

@app.route('/basic/<usercred>')
def get_basic_data(usercred):
    return jsonp(bd.get_cur_basic_data(usercred))

@app.route('/loseweight/<usercred>/<start>/<end>')
def get_activities(usercred, start, end):
    return jsonp(wa.get_activities(usercred, start, end))

@app.route('/loseweight/<usercred>/weight')
def get_weight_activities(usercred):
    return jsonp(wa.get_weights(usercred))

@app.route('/basic/bp/<usercred>')
def get_bp_data(usercred):
    return jsonp(bd.get_all_bp(usercred))

if __name__ == '__main__':
    api_prefix = 'https://api.humanapi.co/v1/'
    cache = QueryCache(api_prefix)
    #ad_cache = QueryCache('http://128.199.173.177:8080/hm/index.php/')
    ad_cache = QueryCache('http://192.168.0.2:8080/')
    wa = WeightActivities(cache, ad_cache)
    bd = BasicData(cache, ad_cache)
    app.config['DEBUG'] = True
    app.run('192.168.0.2')
