<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "base-input",
  props: ["modelValue", "placeholder"],
  emits: ["update:modelValue"],
  methods: {},
};
</script>

<style lang="scss" scoped>
input {
  border-radius: 0;
  border: solid $charcoal 3px;
  padding: 5px 4px;
  margin-bottom: 6px;
}
</style>
