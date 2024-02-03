// VITE_IMAGE_BASE_URL
// VITE_IMAGE_TOKEN

// {{VITE_IMAGE_BASE_URL}}search.json?engine=google_images&q={{CITY + 'landmark HD'}}&apikey={{VITE_IMAGE_TOKEN}}

// import http from '@/plugins/http'




import http from '@/plugins/http'
import service from '@/services/abstract_service'
import { toValue, type Ref } from 'vue'

class ImageAPI extends service {
  private _path = import.meta.env.VITE_IMAGE_BASE_URL

  getImage(city: Ref<string> | string) {
    return http.get(this._path, {
      params: {
        engine: 'google_images',
        q: `${toValue(city)} landmark HD`,
        apikey: import.meta.env.VITE_IMAGE_TOKEN
      }
    })
  }
}

export default new ImageAPI()