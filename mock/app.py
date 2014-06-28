from flask import Flask
from flask import request
import json

app = Flask(__name__)

def jsonp(json_data):
    rs = ''
    if request.args.get('callback'):
        rs = request.args.get('callback') + '(' + \
             json.dumps(json_data) + ')'
    else:
        rs = json.dumps(json_data)
    return rs

@app.route('/mock/weights')
def gen_mock_weights():
    rs = [{"id":"539e4cf612ee310f677c2079",
             "userId":"52e20cb2fff56aac62000001",
             "timestamp":"2014-05-01T23:59:59.000Z",
             "value":80.7,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-06-16T01:48:38.673Z"},
            {"id":"539e4cf612ee310f677c2079",
             "userId":"52e20cb2fff56aac62000001",
             "timestamp":"2014-05-05T15:40:53.000Z",
             "value":80.8,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-05-29T01:48:38.673Z"},
            {"id":"539e4cf612ee310f677c2079",
             "userId":"52e20cb2fff56aac62000001",
             "timestamp":"2014-05-29T17:07:31.000Z",
             "value":80.9,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-06-16T01:48:38.673Z"}
           ]
    return jsonp(rs)

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run(host='192.168.0.2', port=8080)
