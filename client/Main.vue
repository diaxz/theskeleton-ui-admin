<template>
  <div id="app">
    <navbar :brand="$t('main.navTitle')"></navbar>
    <vue-progress-bar></vue-progress-bar>
    <div class="notification">
      <div class="container">
        <notification :variant="$store.state.notif.variant" :text="$store.state.notif.text" :countdown="$store.state.notif.countdown" @countdownChanged="countdownChanged"></notification>
      </div>
    </div>
    <router-view class="container"></router-view>
    <footer-navbar :lang="lang" @change-lang="code => $store.dispatch('setLang', code)"></footer-navbar>
  </div>
</template>

<script>
import FooterNavbar from 'components/Footer';
import Navbar from 'components/Navbar';
import Notification from 'components/Notification';

export default {
  components: {
    FooterNavbar,
    Navbar,
    Notification
  },
  computed: {
    lang() {
      return this.$store.state.language;
    }
  },
  methods: {
    countdownChanged(dismissCountdown) {
      this.$store.commit('countdownNotif', dismissCountdown);
    }
  }
}
</script>

<style>
/* Show it is fixed to the top */
body {
  padding-top: 4.5rem;
  padding-bottom: 4.5rem;
}

.notification {
  top: 0px;
  position: fixed;
  z-index: 9999;
}
</style>
