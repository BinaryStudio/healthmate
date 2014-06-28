import time
import datetime
from tools.cache import QueryCache

k_value_dict = {
                   "walking": 30/6,
                   "running": 30/2,
                   "unknown": 0
               }


class WeightActivities(object):
    def __init__(self, cache):
        self.cache = cache

    def _get_all_weights(self, usercred):
        #api_prefix = 'human/weight?access_token='
        #return self.cache.get(api_prefix + usercred)
        return [{"id":"539e4cf612ee310f677c2079",
                 "userId":"52e20cb2fff56aac62000001",
                 "timestamp":"2014-06-15T23:59:59.000Z",
                 "value":80.7,"unit":"kg","source":"fitbit",
                 "createdAt":"2014-06-16T01:48:38.673Z",
                 "updatedAt":"2014-06-16T01:48:38.673Z"},
                {"id":"539e4cf612ee310f677c2079",
                 "userId":"52e20cb2fff56aac62000001",
                 "timestamp":"2014-06-16T23:59:59.000Z",
                 "value":80.8,"unit":"kg","source":"fitbit",
                 "createdAt":"2014-06-16T01:48:38.673Z",
                 "updatedAt":"2014-06-16T01:48:38.673Z"},
                {"id":"539e4cf612ee310f677c2079",
                 "userId":"52e20cb2fff56aac62000001",
                 "timestamp":"2014-06-17T23:59:59.000Z",
                 "value":80.9,"unit":"kg","source":"fitbit",
                 "createdAt":"2014-06-16T01:48:38.673Z",
                 "updatedAt":"2014-06-16T01:48:38.673Z"}
               ]

    def _get_activities(self, usercred):
        api_prefix = 'human/activities?access_token='
        return self.cache.get(api_prefix + usercred)

    def _get_datetime(self, datetime_str):
        return datetime.datetime.strptime\
               (datetime_str, '%Y-%m-%dT%H:%M:%S.%fZ')

    def _get_timestamp(self, datetime_str):
        return time.mktime(self._get_datetime(datetime_str).timetuple())

    def _get_period(self, datetime_str):
        h = self._get_datetime(datetime_str).\
            timetuple().tm_hour
        if h >=0 and h<=12:
            return 'AM'
        elif h>12 and h<=18:
            return 'PM'
        else:
            return 'NI'

    def _gen_cal(self, weight, duration, type):
        return weight * duration * k_value_dict(type)

    def _get_cal(self, activity):
        if activity.get('calories'):
            return activity.get('calories')
        else:
            durtation = self._get_datetime(activity["endTime"]) - \
                        self._get_datetime(activity["startTime"])
            (dur_min, dur_secs) = divmod(durtation.days * 86400 + \
                                         durtation.seconds, 60)
            _gen_cal(self, 65,
                     dur_min / 60,
                     activity['type'])

    def _adjust_weight(self, weight):
        new_weight = {}
        new_weight['timestamp'] = self._get_timestamp(weight['timestamp'])
        new_weight['value'] = weight['value']
        new_weight['unit'] = weight['unit']
        return new_weight

    def _adjust_activity(self, activity):
        new_activity = {}
        new_activity['start_time'] = self._get_timestamp(\
                                     activity['startTime'])
        new_activity['end_time'] = self._get_timestamp(\
                                   activity['endTime'])
        new_activity['period'] = self._get_period(activity['startTime'])
        new_activity['type'] = activity['type']
        new_activity['duration'] = activity['duration']
        new_activity['distance'] = activity['distance']
        new_activity['steps'] = activity['steps']
        new_activity['calories'] = self._get_cal(activity)
        return new_activity

    def _get_bmi(self, usercred):
        api = 'human?access_token=' + usercred
        human = self.cache.get(api)
        if human.get('bmi'):
            return human['bmi']['value']
        elif human.get('height'):
            return human['weight']['value'] / \
                   ((human['height']['value'] / 100) * \
                    (human['height']['value'] / 100))
        else:
            return None

    def _fit(self, activity, start, end):
        rs = activity['start_time'] > start and \
             activity['end_time'] < end
        return rs

    def _get_total_cal(self):
        total = 0
        for a in self.activities:
            total += a['calories']
        return total

    def get_weights(self, usercred):
        rs = {}
        weights = [self._adjust_weight(w) for w in self._get_all_weights(usercred)]
        print weights
        rs['raw'] = weights
        rs['graph'] = [[w['timestamp'], w['value']] for w in weights]
        if self._get_bmi(usercred):
            rs['bmi'] = self._get_bmi(usercred)
        return rs

    def get_activities(self, start, end):
        rs = {}
        self.activities = [self._adjust_activity(a) for a in \
                          self._get_activities(usercred)]
        rs['as'] = [a for a in self.activites if self._fit(a, start, end)]
        rs['total_cal'] = self._get_total_cal()
        return rs