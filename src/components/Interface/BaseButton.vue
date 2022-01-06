<template>
  <button @click="clickHandler" class="">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "base-button",
  props: ["clickHandler"],
};
</script>

<style lang="scss" scoped>
button {
  font-family: "Roboto Mono";
  color: $secondary;
  font-size: 1em;
  font-weight: 600;
  background: white;
  border-radius: 0;
  border: solid $secondary 3px;
  padding: 5px 4px;
  margin-bottom: 6px;
  box-shadow: 4px 4px $secondary;
  transform: translate(-3px, -3px);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    transform: translate(0px);
    box-shadow: 0px 0px $charcoal;
  }
}
</style>
