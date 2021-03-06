import time
import datetime
from tools.cache import QueryCache

k_value_dict = {
                   "walking": 30/6,
                   "running": 30/2,
                   "unknown": 30/3
               }

class WeightActivities(object):
    def __init__(self, cache, ad_cache):
        self.cache = cache
        self.ad_cache = ad_cache

    def _get_all_weights(self, usercred):
        #api_prefix = 'data/getWeight?uid=' + usercred
        api_prefix = 'mock/weights'
        return self.ad_cache.get(api_prefix)

    def _get_activities(self, usercred):
        api_prefix = 'human/activities?access_token='
        return self.cache.get(api_prefix + usercred)

    def _get_datetime(self, datetime_str):
        return datetime.datetime.strptime\
               (datetime_str, '%Y-%m-%dT%H:%M:%S.%fZ')

    def _get_timestamp(self, datetime_str):
        return int(time.mktime(self._get_datetime(datetime_str).timetuple())) \
               * 1000

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
        return int(weight * duration * k_value_dict[type] / float(60))

    def _get_dur_min(self, activity):
        durtation = self._get_datetime(activity["endTime"]) - \
                    self._get_datetime(activity["startTime"])
        (dur_min, dur_secs) = divmod(durtation.days * 86400 + \
                                     durtation.seconds, 60)
        return dur_min

    def _get_cal(self, activity):
        if activity.get('calories'):
            return activity.get('calories')
        else:
            dur_min = self._get_dur_min(activity)
            return self._gen_cal(65,
                                 dur_min,
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
        new_activity['duration'] = self._get_dur_min(activity)
        new_activity['distance'] = activity['distance']
        new_activity['steps'] = activity['steps']
        new_activity['calories'] = self._get_cal(activity)
        return new_activity

    def _fit(self, activity, start, end):
        rs = int(activity['start_time']) >= int(start) and \
             int(activity['end_time']) <= int(end)
        return rs

    def _get_total(self, activities, am_cal_max, pm_cal_max):
        total = {}
        total['cal'] = 0
        total['steps'] = 0
        total['distance'] = 0
        for a in activities:
            total['cal'] += a['calories']
            total['steps'] += a['steps']
            total['distance'] += a['distance']
            total['am_cal_max'] = am_cal_max
            total['pm_cal_max'] = pm_cal_max
        return total

    def get_weights(self, usercred):
        rs = {}
        weights = [self._adjust_weight(w) for w in self._get_all_weights(usercred)]
        weights = sorted(weights, key=lambda k: k['timestamp'])
        rs['raw'] = weights
        rs['graph'] = [[w['timestamp'], w['value']] for w in weights]
        return rs

    def _gen_as_graph(self, activities):
        rs = []
        activities = sorted(activities, key=lambda k: k['start_time'])
        for a in activities:
            rs.append({'time': a['start_time'],
                       'cal': a['calories']})
            rs.append({'time': a['end_time'],
                       'cal': a['calories']})
            rs.append({'time': a['end_time'] + 1500,
                       'cal': None})
        return rs


    def get_activities(self, usercred, start, end):
        rs = {}
        self.activities = [self._adjust_activity(a) for a in \
                          self._get_activities(usercred)]
        activities = [a for a in self.activities if self._fit(a, start, end)
                                                    and a['calories']]
        rs['as'] = {}
        rs['as']['AM'] = [a for a in activities if a['period'] == 'AM']
        rs['as']['PM'] = [a for a in activities if a['period'] == 'PM' or \
                                                   a['period'] == 'NI']
        max_cal_am = max([a['calories'] for a in rs['as']['AM']])
        max_cal_pm = max([a['calories'] for a in rs['as']['PM']])
        rs['total'] = self._get_total(activities, max_cal_am, max_cal_pm)
        rs['graph'] = self._gen_as_graph(activities)
        return rs
