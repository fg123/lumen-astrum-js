<template>
  <div>
    <input type="text"
           ref="input"
           v-if="edit"
           :value="valueLocal"
           @blur="onChange($event.target.value)"
           @keyup.enter="onChange($event.target.value)"
           v-focus="" />
    <div v-else @click="goToEditMode()">
      {{valueLocal}}
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
      value: String,
      onValueChanged: Function
  },
  data () {
    return {
        edit: false,
        valueLocal: this.value,
        lastCommittedValue: this.value
    };
  },
  methods: {
    onChange(newValue) {
      if (this.lastCommittedValue !== newValue) {
        this.lastCommittedValue = newValue;
        const oldValue = this.valueLocal;
        // this.valueLocal = newValue;
        this.$emit('input', newValue);
        this.onValueChanged(oldValue, newValue);
      }
      this.edit = false;
    },
    goToEditMode() {
      this.edit = true;
    }
  },
  watch: {
    value: function() {
      this.valueLocal = this.value;
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}
</script>