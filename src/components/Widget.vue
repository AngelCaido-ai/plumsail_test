<template>
  <div class="widget">
    <WidgetHeader :showSettings="showSettings" @toggleSettingsShow="toggleSettingsShow" />
    <div v-if="!showSettings" v-for="weather in weatherList" :key="weather.name">
      <WidgetCard :weather="weather"/>
    </div>
    <div v-else>
      <WidgetSettings :weatherList="weatherList" />
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '../store';
import { defineComponent } from 'vue';
import { mapActions } from "vuex";
import { WeatherResponse } from '@/types/API_Types';
import WidgetHeader from '../views/WidgetHeader.vue';
import WidgetCard from '../views/WidgetCard.vue';
import WidgetSettings from '../views/WidgetSettings.vue';

export default defineComponent({
  name: "Widget",
  components: {
    WidgetHeader,
    WidgetCard,
    WidgetSettings
  },

  data() {
    return {
      userPosition: null,
      showSettings: false,
    }
  },

  computed: {
    weatherList() {
        return store.state.weatherList
    }
  },

  mounted() {
    const savedState = localStorage.getItem('weatherList') ?? "[]"
    
    let parsedState: Array<WeatherResponse> = JSON.parse(savedState)
    parsedState = parsedState.filter(item => Boolean(item))

    if (parsedState.length > 0) {
      store.commit('CHANGE_CITIES_STATE', parsedState)
    } else {
      navigator.geolocation.getCurrentPosition((data) => {
        this.GetWeatherData({ lat: data.coords.latitude, lon: data.coords.longitude })
      })
    }
  },

  watch: {
    weatherList(val) {
      localStorage.setItem('weatherList', JSON.stringify(val))
    }
  },

  methods: {

    ...mapActions({
      GetWeatherData: 'GetWeatherData'
    }),

    toggleSettingsShow() {
      this.showSettings = !this.showSettings
    },
  }

});
</script>

<style lang="scss">
.widget {
  width: 260px;
  position: relative;
  padding: 15px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  font-size: 13px;
  line-height: 1.4;

  &-headerSettings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    margin-bottom: 20px;
  }
}
</style>
