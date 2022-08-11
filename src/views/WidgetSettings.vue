<template>
    <div>
        <draggable v-model="weatherList">
            <div class="city_weather__addedCity" v-for="city in weatherList" :key="city.name">
                <div class="city_weather__addedCity-text">&#9776; {{ city.name }}</div>
                <button class="buttons button-delеte-city" @click="deleteCity(city.id)">&#128465;</button>
            </div>
        </draggable>
        <div class="boxSearch-title">
            Add Location
        </div>
        <div class="boxSearch">
            <div class="boxSearch-input">
                <input type="text" v-model="search" @keyup.enter="addCity">
                <button class="buttons button-search" @click="addCity">&#8617;</button>
            </div>
            <p v-if="error" style="color: red">{{ error }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { store } from '../store';
import { defineComponent } from 'vue';
import { mapActions } from "vuex";
import { VueDraggableNext } from 'vue-draggable-next'
import { WeatherResponse } from '@/types/API_Types';

export default defineComponent({
    name: "Widget",
    components: {
        draggable: VueDraggableNext,
    },

    data() {
        return {
            search: '',
        }
    },

    computed: {
        error(){
            return store.state.error
        },
        weatherList: {
            get() {
                return store.state.weatherList
            },
            set(value: Array<WeatherResponse>) {
                store.commit('CHANGE_CITIES_STATE', [...value])
            }
        }
    },

    methods: {
        ...mapActions({
            GetWeatherData: 'GetWeatherData'
        }),

        addCity() {
            if (this.search !== "") {
                this.GetWeatherData({ city_name: this.search })
                this.search = ""
            }
        },

        deleteCity(id: number) {
            store.commit("DELETE_CITY", id)
        }
    }

});
</script>

<style lang="scss">

.city_weather {
    &__addedCity {
        display: flex;
        justify-content: space-between;
        background-color: rgba(0, 0, 0, 0.155);
        padding: 5px;
        margin-bottom: 15px;

        &-text {
            cursor: grab;
            flex: 1;
            text-align: left;
        }
    }
}

.boxSearch {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    
    &-input {
        display: flex;
    }

    input {
        flex: 1;
    }

    &-title {
        font-weight: 700;
        text-align: left;
        margin: 30px 0 5px;
    }
}

.buttons {
    border: none;
    outline: none;
    box-shadow: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    margin: 0;
    flex: none;
    font-size: 20px;
    line-height: 1;

    &.settings-button {
        position: absolute;
        right: 15px;
        top: 22px;

        svg {
            width: 20px;
            height: 20px;
        }
    }

    &.button-search {
        padding-left: 10px;
        font-weight: 700;
        font-size: 26px;
    }
}
</style>
