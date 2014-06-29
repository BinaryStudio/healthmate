import requests
import re

class QueryCache(object):
    def __init__(self, api_prefix):
        self.api_prefix = api_prefix
        self.cache = {}

    def _get_dict_key(self, url):
        rs, counts = re.subn('/|\?|=', '_', url)
        return rs

    def get(self, url):
        dict_key = self._get_dict_key(url)
        full_url = self.api_prefix + url
        if self.cache.get(dict_key):
            return self.cache[dict_key]
        else:
            r = requests.get(full_url)
            if r.status_code == 200:
                try:
                    self.cache[dict_key] = r.json()
                    return self.cache[dict_key]
                except Exception:
                    raise Exception('Request failed!')
            else:
                raise Exception('Request failed!')
