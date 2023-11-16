const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://app.storyblok.com/',
    defaultCommandTimeout: 5000
  },
});
