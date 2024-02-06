import http from '@/plugins/http'
import service from '@/services/abstract_service'
import { toValue, type Ref } from 'vue'

class ImageAPI extends service {
  private _path = import.meta.env.VITE_IMAGE_BASE_URL

  getImage(city: Ref<string> | string) {
    return http.get(this._path, {
      params: {
        engine: 'google_images',
        lang: 'ar',
        q: `${toValue(city)} landmark`, // HD
        apikey: import.meta.env.VITE_IMAGE_TOKEN
      }
    })
  }
}

export default new ImageAPI()