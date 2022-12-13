<template>
  <div :class="usedrag ? 'dragndrop' : ''" class="input-file">
    <input v-show="usedrag ? usedrag : false" :id="id" :accept="accept ? accept : '*/*'"
           :required="required ? required : false" title="" type="file" @change="change($event)">
    <label v-if="usedrag ? usedrag : false" :for="id">
      <p v-if="filename">{{ filename ? `${filename}` : 'перенесите или' }}</p>
      <div class="button">{{ filename ? `изменить` : 'выбрерите файл' }}</div>
    </label>
    <label v-else :for="id">
      <p v-if="filename">{{ filename }}</p>
      <div class="button">{{ filename ? `изменить` : 'выбрерите файл' }}</div>
    </label>
  </div>
</template>

<script>
export default {
  name: "fileinput",
  props: ["usedrag", "accept", "required"],
  data() {
    return {
      id: null,
      filename: null
    }
  },
  mounted() {
    this.id = this.componentId
  },
  methods: {
    change(event) {
      this.filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
.input-file {
  display: flex;

  input {
    opacity: 0;
  }

  label {
    .button {
      width: 100%;
      min-width: 110px;
      max-width: 272px;
    }

    display: flex;
    justify-content: stretch;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 272px;

    p {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &.dragndrop {
    width: 100%;
    height: 256px;
    display: flex;
    border: 2px;
    position: relative;
    justify-content: center;
    align-items: center;
    border: 2px dashed var(--font-color);
    border-radius: var(--border-radius);

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    label {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      justify-content: center;
      padding: 12px;
      max-width: 100%;
      flex-wrap: wrap;

      p {
        width: auto;
        overflow: unset;
      }
    }
  }
}
</style>
