<template>
  <transition name="fade">
    <svg
        v-if="show"
        class="back-to-top"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 49 28"
    >
      <path d="M23.334 1.414l-21.92 21.92a2 2 0 000 2.829l.707.707a2 2 0 002.829 0L26.87 4.95a2 2 0 000-2.829l-.707-.707a2 2 0 00-2.829 0z" />
      <path d="M22.615 4.95l21.92 21.92a2 2 0 002.829 0l.707-.708a2 2 0 000-2.828L26.15 1.414a2 2 0 00-2.83 0l-.706.707a2 2 0 000 2.828z" />
    </svg>
  </transition>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  name: 'BackToTop',
  props: {
    threshold: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      scrollTop: null
    }
  },
  computed: {
    show () {
      return this.scrollTop > this.threshold
    }
  },
  mounted () {
    this.scrollTop = this.getScrollTop()
    window.addEventListener('scroll', debounce(() => {
      this.scrollTop = this.getScrollTop()
    }, 100))
  },
  methods: {
    getScrollTop () {
      return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop || 0
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.scrollTop = 0
    }
  }
}
</script>

<style lang='stylus' scoped>
.back-to-top {
  position: sticky;
  opacity: 0.7;

  cursor: pointer;
  align-self: flex-end;

  --inner-size: 2.5rem;
  --spacing: calc(var(--inner-size) * 0.25);
  --size: calc(var(--inner-size) - var(--spacing) * 2);

  bottom: 2rem;
  right: 0;
  transform: translateX(-100%);

  height: var(--size);
  width: var(--size);
  padding: var(--spacing);

  color: $arrowColor;
  background-color: $arrowBgColor;

  transition: opacity 0.3s;
}

.back-to-top:hover {
  opacity: 1;
}

@media (max-width: 959px) {
  .back-to-top {
    display: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: transform 0.2s;
}

.fade-enter, .fade-leave-to {
  transform: translateX(-100%) translateY(150%);
}
</style>