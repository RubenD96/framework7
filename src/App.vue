<template>
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar />

    <!-- Main View -->
    <home @test="something" />
    <!--<f7-view id="main-view" url="/" main />-->

    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <f7-list form>
              <f7-list-item>
                <f7-label>Name</f7-label>
                <f7-input type="text" placeholder="Contact Name"></f7-input>
              </f7-list-item>
              <f7-list-item>
                <f7-label>E-Mail</f7-label>
                <f7-input type="email" placeholder="Contact E-mail"></f7-input>
              </f7-list-item>
            </f7-list>

            <f7-button fill round popup-close>Add Contact</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

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
        // @TODO How to handle modals we shouldn't close like a login-screen?
        if (document.querySelector('.modal-in')) {
          return this.$f7.popover.close();
        }
        // If we have a back button, we want it to go back
        if (this.$f7.views.main.router.history.length > 1) {
          return this.$f7.views.main.router.back();
        }
        // Default to closing the app
        return window.navigator.app.exitApp();
      },
      something() {
        console.log('emitted');
        alert('test');
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
