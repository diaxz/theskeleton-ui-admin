<template>
  <div>
    <div class="row">
      <div class="col">
        <info :infos="$store.state.info.infos"></info>
      </div>
    </div>
  </div>
</template>

<script>
import Info from 'components/Info'

export default {
  components: {
    Info
  },
  mounted() {
    this.$store.dispatch('fetchInfos');
  }
}
</script>
