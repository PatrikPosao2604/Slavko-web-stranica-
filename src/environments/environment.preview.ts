/**
 * Preview build (npm run build:preview): hash routing i bez prerenderiranja,
 * tako da se stranica može otvoriti iz bilo koje mape ili ugraditi kao pregled.
 */
export const environment = {
  hashRouting: true,
  hydration: false,
};
