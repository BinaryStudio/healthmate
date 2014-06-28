class BasicData(object):
    def __init__(self, cache):
        self.cache = cache

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
