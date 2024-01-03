import http from '@/plugins/http'

class Test {
  #path: {[key:string]: string} = {
    weather: 'weather'
  }

  getTemp(city: string) {
    console.log(city)
    http.get(this.#path.weather, {params:{
      q: city,
      APPID: '1b98b6423af3fa12a335b7200bc993f4',
      units: 'metric' 
    }})
    return {}
  }
}

export default new Test()