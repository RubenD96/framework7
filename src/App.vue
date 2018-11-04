<template>
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar/>

    <!-- Main View -->
    <f7-view main/>

  </div>
</template>

<script>
  import F7Statusbar from 'framework7-vue/src/components/statusbar';
  import F7View from 'framework7-vue/src/components/view';
  import Home from './pages/home';

  export default {
    name: 'App',
    components: {Home, F7View, F7Statusbar},
    methods: {
      handleBackButton() {
        // NOTE: The back button will behave differently depending on circumstance
        // If the side panel is open, close it
        if (document.querySelector('.panel-left.panel-active')) {
          // This will do nothing when the split-view is open
          return this.$f7.panel.close();
        }
        // Close modals
        if (document.querySelector('.modal-in')) {
          return this.$f7.popover.close();
        }
        // If we have a back button, we want it to go back
        if (this.$f7.views.main.router.history.length > 1) {
          return this.$f7.views.main.router.back();
        }
        // Default to closing the app
        return window.navigator.app.exitApp();
      }
    },
    computed: {
      isiOS() {
        return window.isiOS;
      }
    },
    created() {
      document.addEventListener('backbutton', this.handleBackButton);
    }
  };
</script>
