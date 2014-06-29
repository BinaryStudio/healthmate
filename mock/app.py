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
             "timestamp":"2014-06-01T23:59:59.000Z",
             "value":80.7,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-06-28T01:48:38.673Z"},
            {"id":"539e4cf612ee310f677c2079",
             "userId":"52e20cb2fff56aac62000001",
             "timestamp":"2014-06-27T15:40:53.000Z",
             "value":80.8,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-05-29T01:48:38.673Z"},
            {"id":"539e4cf612ee310f677c2079",
             "userId":"52e20cb2fff56aac62000001",
             "timestamp":"2014-06-30T17:07:31.000Z",
             "value":82.0,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-06-16T01:48:38.673Z"},
            {"id":"539e4cf612ee310f677c2079",
             "userId":"52e20cb2fff56aac62000001",
             "timestamp":"2014-07-06T17:07:31.000Z",
             "value":79.5,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-06-16T01:48:38.673Z"},
            {"id":"539e4cf612ee310f677c2079",
             "userId":"52e20cb2fff56aac62000001",
             "timestamp":"2014-07-07T17:07:31.000Z",
             "value":79,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-06-16T01:48:38.673Z"},
            {"id":"539e4cf612ee310f677c2079",
             "userId":"52e20cb2fff56aac62000001",
             "timestamp":"2014-07-31T17:07:31.000Z",
             "value":75,"unit":"kg","source":"fitbit",
             "createdAt":"2014-06-16T01:48:38.673Z",
             "updatedAt":"2014-06-16T01:48:38.673Z"}
           ]
    return jsonp(rs)

@app.route('/mock/bp')
def gen_mock_bp():
    rs = [{
            'id': "52e20cb4fff56aac620005b7",
            'userId': "52e20cb2fff56aac62000001",
            'timestamp': "2014-01-23T22:48:20.190Z",
            'systolic': 120,
            'diastolic': 75,
            'unit': "mmHg",
            'heartRate': 59,
            'source': "withings",
            'createdAt': "2014-01-24T06:48:20.191Z",
            'updatedAt': "2014-01-24T06:48:20.191Z"
        },
        {
            'id': "52e20cb4fff56aac620005b7",
            'userId': "52e20cb2fff56aac62000001",
            'timestamp': "2014-01-24T22:48:20.190Z",
            'systolic': 125,
            'diastolic': 80,
            'unit': "mmHg",
            'heartRate': 59,
            'source': "withings",
            'createdAt': "2014-01-24T06:48:20.191Z",
            'updatedAt': "2014-01-24T06:48:20.191Z"
        },
        {
            'id': "52e20cb4fff56aac620005b7",
            'userId': "52e20cb2fff56aac62000001",
            'timestamp': "2014-01-25T22:48:20.190Z",
            'systolic': 120,
            'diastolic': 70,
            'unit': "mmHg",
            'heartRate': 59,
            'source': "withings",
            'createdAt': "2014-01-24T06:48:20.191Z",
            'updatedAt': "2014-01-24T06:48:20.191Z"
        },
        {
            'id': "52e20cb4fff56aac620005b7",
            'userId': "52e20cb2fff56aac62000001",
            'timestamp': "2014-01-26T22:48:20.190Z",
            'systolic': 135,
            'diastolic': 85,
            'unit': "mmHg",
            'heartRate': 59,
            'source': "withings",
            'createdAt': "2014-01-24T06:48:20.191Z",
            'updatedAt': "2014-01-24T06:48:20.191Z"
        },
        {
        'id': "52e20cb4fff56aac620005b7",
        'userId': "52e20cb2fff56aac62000001",
        'timestamp': "2014-01-27T22:48:20.190Z",
        'systolic': 130,
        'diastolic': 80,
        'unit': "mmHg",
        'heartRate': 59,
        'source': "withings",
        'createdAt': "2014-01-24T06:48:20.191Z",
        'updatedAt': "2014-01-24T06:48:20.191Z"
        },
        {
        'id': "52e20cb4fff56aac620005b7",
        'userId': "52e20cb2fff56aac62000001",
        'timestamp': "2014-01-28T22:48:20.190Z",
        'systolic': 125,
        'diastolic': 85,
        'unit': "mmHg",
        'heartRate': 59,
        'source': "withings",
        'createdAt': "2014-01-24T06:48:20.191Z",
        'updatedAt': "2014-01-24T06:48:20.191Z"
        },
        {
        'id': "52e20cb4fff56aac620005b7",
        'userId': "52e20cb2fff56aac62000001",
        'timestamp': "2014-01-29T22:48:20.190Z",
        'systolic': 140,
        'diastolic': 85,
        'unit': "mmHg",
        'heartRate': 59,
        'source': "withings",
        'createdAt': "2014-01-24T06:48:20.191Z",
        'updatedAt': "2014-01-24T06:48:20.191Z"
        }
]
    return jsonp(rs)

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run(host='192.168.0.2', port=8080)
