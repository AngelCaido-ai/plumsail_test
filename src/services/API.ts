import axios from "axios";
import { CityDataResponse, Coord, WeatherResponse } from "../types/API_Types"
import "regenerator-runtime/runtime.js";

const URL = 'http://api.openweathermap.org'
export const API_KEY = '080e6c06564aff3e6cbca90d31f5e6ca'


export const GetCityData = async (city_name?: string): Promise<CityDataResponse> => {
    return await axios.get(`${URL}/geo/1.0/direct?q=${city_name}&limit=1&appid=${API_KEY}`)
        .then((response) => {
            return response.data[0]   
        })
}

export const GetWeather = async ({ lat, lon }: Coord): Promise<WeatherResponse> => {
    return await axios.get(`${URL}/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&appid=${API_KEY}`)
        .then((response) => {
            return response.data   
        })
}