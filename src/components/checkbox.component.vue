<template>
  <div class="input-checkbox">
    <input id="checkbox" v-model="checked" :required="required ? required : false" :value="checked" type="checkbox">
    <label @click="checked = !checked"></label>
    <p @click="checked = !checked">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  props: ["status", "label", "required"],
  data() {
    return {
      checked: this.status ? this.status : false
    }
  },
}
</script>

<style lang="scss" scoped>
.input-checkbox {
  display: flex;
  gap: 12px;
  align-items: center;

  label {
    display: inline-flex;
    padding: 2px;
    height: 20px;
    width: 40px;
    background: var(--bg-color);
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.03);
    cursor: pointer;

    &:before {
      content: '';
      height: 16px;
      width: 16px;
      background: var(--accent-color);
      margin-left: 0px;
      transition: margin-left 0.3s;
      border-radius: 8px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.03);
      cursor: pointer;
    }
  }

  input {
    display: none;
  }

  input:checked ~ label {
    &:before {
      content: '';
      height: 16px;
      width: 16px;
      background: var(--main-color);
      margin-left: 20px;
    }
  }

  p {
    cursor: pointer;
    user-select: none;
  }
}
</style>
