import time
import datetime
class BasicData(object):
    def __init__(self, cache, ad_cache):
        self.cache = cache
        self.ad_cache = ad_cache

    def _filter(self, basic_data):
        result = {}
        if basic_data['heartRate']:
            result['heartRate'] = basic_data['heartRate']['value']
        if basic_data['bloodGlucose']:
            result['bloodGlucose'] = basic_data['bloodGlucose']['value']
        if basic_data['weight']:
            result['weight'] = basic_data['weight']['value']
        if basic_data['bmi']:
            result['bmi'] = basic_data['bmi']['value']
        if basic_data['bodyFat']:
            result['bodyFat'] = basic_data['bodyFat']['value']
        if basic_data['height']:
            result['height'] = basic_data['height']['value']
        if basic_data['bloodPressure']:
            result['bphigh'] = basic_data['bloodPressure']['systolic']
            result['bplow'] = basic_data['bloodPressure']['diastolic']
        return result

    def get_cur_basic_data(self, usercred):
        api_prefix = 'human?access_token='
        return self._filter(self.cache.get(api_prefix + usercred))
    def _get_datetime(self, datetime_str):
        return datetime.datetime.strptime\
               (datetime_str, '%Y-%m-%dT%H:%M:%S.%fZ')

    def _get_timestamp(self, datetime_str):
        return int(time.mktime(self._get_datetime(datetime_str).timetuple())) \
                   * 1000

    def _adjust_bp(self, b):
        new_b = {}
        new_b['high'] = b['systolic']
        new_b['low'] = b['diastolic']
        new_b['timestamp'] = self._get_timestamp(b['timestamp'])
        return new_b

    def get_all_bp(self, usercred):
        api_prefix = 'mock/bp'
        bp = [self._adjust_bp(b) for b in self.ad_cache.get(api_prefix)]
        return bp
