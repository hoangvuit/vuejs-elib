<template>
  <div class="stars">
    <a
      href="#"
      v-for="index in 5"
      :key="index"
      @click.prevent="rate(index)"
      :class="{selected: (selected === 6-index) || (rating === 6-index), disabled: nointeract}"
    >
      <i class="fas fa-star"></i>
    </a>
    <p v-show="!nointeract">
      You gave a rating of
      <span id="count">{{selected}}</span> star(s)
    </p>
  </div>
</template>

<script>
export default {
  name: 'Stars',
  props: {
    rating: Number,
    nointeract: Boolean
  },
  methods: {
    rate(index) {
      this.selected = 6 - index
      this.$emit('rated', this.selected)
    }
  },
  data: function() {
    return {
      selected: 0
    }
  }
}
</script>

<style lang="scss" scoped>
$starColor: #ffd119 !default;

.stars {
  direction: rtl;
  p {
    direction: ltr;
  }
  a {
    font-size: 16px;
    padding: 0 1px;
    cursor: pointer;
    color: $starColor;
    text-decoration: none;
    display: inline-block;
    opacity: 0.3;
    &.disabled {
      pointer-events: none;
    }
    &:hover,
    &.selected {
      & + a {
        opacity: 1;
      }
      & + a + a {
        opacity: 1;
      }
      & + a + a + a {
        opacity: 1;
      }
      & + a + a + a + a {
        opacity: 1;
      }
      opacity: 1;
    }
  }
}
</style>
