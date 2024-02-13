import http from '@/plugins/http'
import service from '@/services/abstract_service'
import { toValue, type Ref } from 'vue'

class PollutionAPI extends service {
  private _path = `${import.meta.env.VITE_POLLUTION_BASE_URL}feed/KEY/`

  getPollution(city: Ref<string> | string) {
    return http.get(this.formattingURL(this._path, toValue(city)), {
      params: {
        token: import.meta.env.VITE_POLLUTION_TOKEN
      }
    })
  }
}

export default new PollutionAPI()