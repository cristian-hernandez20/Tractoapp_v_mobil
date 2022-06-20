<template>
  <v-app absolute>
    <v-img
      class="pb-16"
      justify="center"
      :src="require('../assets/background_init.png')"
    >
      <v-row justify="center">
        <h1 id="title">TractoApp</h1>
        <lottie-animation
          ref="anim"
          :animationData="require('../assets/data.json')"
          :loop="true"
          id="container"
          :autoPlay="true"
        />
        <v-btn class="mt-10" width="300" shaped @click="loguear()" color="prim">
          inicia tu viaje</v-btn
        >
      </v-row>
    </v-img>
  </v-app>
</template>

<script>
import LottieAnimation from "lottie-web-vue";
import { mapActions } from "vuex";

export default {
  components: { LottieAnimation },
  methods: {
    ...mapActions("journal", ["cargarUser"]),
    loguear() {
      this.$router.push("/login");
    },
  },
  async created() {
    this.cargarUser();
  },
};
</script>

<style scoped>
#container {
  /* position: ; */
  /* margin-top: 300px; */
  height: 300px;
  background: transparent;
}
#title {
  margin-top: 250px;
  margin-bottom: 20px;
  background: transparent;
}
</style>
