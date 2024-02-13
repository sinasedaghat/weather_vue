import { createVuetify } from "vuetify";
import type { DisplayThresholds, ThemeDefinition } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import i18n from './i18n'
import { useI18n } from 'vue-i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

const brackpoints: DisplayThresholds = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: 2560
}

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#0167D8",
    secondary: "#9747FF",
    // background: "#ecf0f1",
    error: "#E40047",
    info: "#ADD4FF",
    success: "#04A204",
    warning: "#FFFD28",
  },
  // variables: {
  //   'border-color': '#ff0000',
  // }
};

// const darkTheme: ThemeDefinition = {
//   dark: true,
//   colors: {
//     primary: "#d35400",
//     secondary: "#8e44ad",
//     background: "#2f3640",
//     error: "#c0392b",
//     info: "#2980b9",
//     success: "#27ae60",
//     warning: "#f1c40f",
//   },
// };


export default createVuetify({
  components,
  directives,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: brackpoints
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: lightTheme,
      // dark: darkTheme,
    },
  },
});




