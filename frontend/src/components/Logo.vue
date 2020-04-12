<template>
  <img src="@/assets/logo.svg" class="Logo" />
</template>

<style lang="scss">
.Logo {
  position: fixed;
  top: 0;
  left: 44px;
  z-index: 1000;

  @media screen and (max-width: 960px) {
    position: initial;
    margin: auto;
    z-index: 0;
  }
}
</style>
