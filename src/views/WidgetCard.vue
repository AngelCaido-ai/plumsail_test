<template>
    <div class="city_weather">
        <div class="city_weather__header">
            {{ weather.name }}, {{ weather.sys.country }}
        </div>
        <div class="city_weather__info">
            <div class="city_weather__info-top">
                <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png'" />
                <span>
                    {{ temp }} °C
                </span>
            </div>
            <div class="city_weather__info-text">
                Feels like {{ feels_like }} °C
                <span v-for="condition in weather.weather">
                    {{ condition.description[0].toUpperCase() + condition.description.slice(1) }}.
                </span>
            </div>
            <div class="city_weather__info-text-list">
                <div class="city_weather__info-text-list--item">
                        <svg class="wind-icon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="24.000000pt" :style="{transform: `rotate(${weather.wind.deg}deg)`}"
                            height="24.000000pt" viewBox="0 0 24.000000 24.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,23.000000) scale(0.100000,-0.100000)" fill="#000000"
                                stroke="none">
                                <path
                                    d="M123 177 c-45 -18 -85 -35 -88 -39 -4 -4 9 -14 28 -22 25 -10 41 -26 51 -50 18 -43 23 -44 37 -8 35 89 58 152 56 151 -1 0 -39 -15 -84 -32z" />
                            </g>
                        </svg>
                    {{ windSpeed }} m/s SSE 
                </div>
                <div class="city_weather__info-text-list--item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="#000" fill-rule="nonzero">
                            <path
                                d="M13.524 9.415L15.47 7.47a.75.75 0 0 1 1.06 1.06l-1.945 1.946a3 3 0 1 1-1.06-1.06h-.001zM12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path
                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.75-18.467A8.503 8.503 0 0 0 3.558 11H5v1.5H3.514a8.5 8.5 0 0 0 16.972 0H19V11h1.442a8.503 8.503 0 0 0-7.692-7.467V5h-1.5V3.533z" />
                        </g>
                    </svg> {{ weather.main.pressure }} hPa
                </div>
                <div class="city_weather__info-text-list--item">
                    Humidity {{ weather.main.humidity }} %
                </div>
                <div class="city_weather__info-text-list--item">
                    {{`Dew point ${dewPoint()} °C`}}
                </div>
                <div class="city_weather__info-text-list--item">
                    Visibility {{ visability }} km
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: "WidgetCard",

    props: [
        "weather"
    ],

    data(){
        return{
            visability: (this.weather.visibility / 1000).toFixed(1),
            windSpeed: this.weather.wind.speed.toFixed(1),
            feels_like: Math.ceil(this.weather.main.feels_like),
            temp: Math.ceil(this.weather.main.temp)
        }
    },

    methods: {
        dewPoint(){
            const weather = Object.assign({}, this.weather);
            const weather_main = Object.assign({}, weather.main);

            const A = 17.27;
            const B = 237.7;
            const func_T_Rh = (A * Math.ceil(weather_main.temp))/ (B+ Math.ceil(weather_main.temp) ) +  Math.log(weather_main.humidity / 100)
            return Math.ceil(B * func_T_Rh / (A - func_T_Rh)).toFixed()
        }
    },
});
</script>

<style lang="scss">

.city_weather {
    text-align: left;
    color: #000000;
    margin-bottom: 40px;

    &__header {
        font-weight: bold;
        padding: 10px 25px 10px 0;
        font-size: 16px;
    }

    &__info {
        &-top {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px 0;

            img {
                margin-right: 15px;
            }

            span {
                font-weight: 700;
                font-size: 32px;
            }
        }

        &-text {
            margin-bottom: 10px;

            &-list {
                display: flex;
                align-items: stretch;
                flex-wrap: wrap;

                &--item {
                    width: 50%;
                    box-sizing: border-box;
                    margin-bottom: 15px;

                    &:nth-child(odd) {
                        padding-right: 10px;
                    }

                    &:last-child {
                        width: 100%;
                    }

                    svg {
                        width: auto;
                        height: 12px;
                        position: relative;
                        bottom: -1px;

                        &.wind-icon {
                            height: 16px;
                            margin-bottom: -4px;
                            position: static;
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
}

</style>
