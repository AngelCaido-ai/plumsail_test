import "babel-polyfill"
import { createStore } from 'vuex'
import { WeatherResponse } from '@/types/API_Types';
import { GetCityData, GetWeather } from '../services/API';

type State = {
  weatherList: Array<WeatherResponse>
  error: string
}

const state: State = {
  weatherList: [],
  error: ""
};

const mutations = {
  PUSH_TO_WEATHER_STATE: (state: State, weather: WeatherResponse) => {
    const findDublicate = state.weatherList.find(city => city.id === weather.id)
    if(!findDublicate){
      state.weatherList = [...state.weatherList, weather]
      localStorage.setItem('weatherList', JSON.stringify(state.weatherList))
    }
  },
  DELETE_CITY: (state: State, id: number) => {
    state.weatherList = state.weatherList.filter(city => city.id !== id)
    localStorage.setItem('weatherList', JSON.stringify(state.weatherList))
  },
  CHANGE_CITIES_STATE: (state: State, weather: Array<WeatherResponse>) => {
    state.weatherList = weather
    localStorage.setItem('weatherList', JSON.stringify(state.weatherList))
  },
  SET_ERROR: (state: State, errorString: string) => {
    state.error = errorString
  }
};

const actions = {

  async GetWeatherData(context: any, params: { city_name?: "", lat?: number, lon?: number }): Promise<void | WeatherResponse> {

    if (params.lat && params.lon) {
      GetWeather({lat: params.lat, lon: params.lon})
        .then((weather) => {
          context.commit('PUSH_TO_WEATHER_STATE', weather)
        })
    } else {
      await GetCityData(params.city_name)
        .then(async (data) => {
          if(data){
            GetWeather({lat: data.lat, lon: data.lon})
            .then((weather) => {
                context.commit('SET_ERROR', '')
                context.commit('PUSH_TO_WEATHER_STATE', weather)
            })
          } else {
            context.commit('SET_ERROR', 'Failed to get weather')
          }
        })
    }

  }
}

export const store = createStore({ state, mutations, actions });
