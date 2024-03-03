# Weather Wise

A user-friendly web application that offers real-time weather data, allowing users to
search for any city and get up-to-date information on temperature and air pollution levels.

---

### Project Description

The project is an exercise project to implement the correct architecture for applications developed with the **Vue3** framework.

In this project, classes called service are used to call APIs by **Axios** library, and classes called model are used to provide additional data as well as required default data.

**Pinia** has been used for state management, and the concepts of **composable** and **utils** have also been used.

The **Vue Router** is used for routing and the concept of **Nested Routes** is used to implement the layout and also the concept of **Navigation Guards**  is used to check the requirements of some routes.

And **Vuetify** material design was also used.

---

### Project Dependencies

For this project, you need to get api-keys from the three sites I mentioned after, because for the weather data from the [openweathermap.org](https://openweathermap.org/) site API, for pollution data from the [aqicn.org](https://aqicn.org/) site API, and finally to display images from the [serpapi.com](https://serpapi.com/) site API is used, and you need to rewrite your .env file like this:

```bash
VITE_WEATHER_BASE_URL = http://api.openweathermap.org/data/2.5/
VITE_WEATHER_TOKEN = openweathermap api-key

VITE_POLLUTION_BASE_URL = http://api.waqi.info/
VITE_POLLUTION_TOKEN = waqi api-key

VITE_IMAGE_BASE_URL = https://serpapi.com/search.json
VITE_IMAGE_TOKEN = serpapi api-key
```