<template>
  <div
      class="back-to-top"
      :class="{ show }"
    >
    <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        @click="scrollToTop"
        viewBox="0 0 49 28"
    >
      <path d="M23.334 1.414l-21.92 21.92a2 2 0 000 2.829l.707.707a2 2 0 002.829 0L26.87 4.95a2 2 0 000-2.829l-.707-.707a2 2 0 00-2.829 0z" />
      <path d="M22.615 4.95l21.92 21.92a2 2 0 002.829 0l.707-.708a2 2 0 000-2.828L26.15 1.414a2 2 0 00-2.83 0l-.706.707a2 2 0 000 2.828z" />
    </svg>
  </div>
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
  z-index: 5;
  opacity: 0.7;
  height: 0;

  cursor: pointer;
  align-self: flex-end;
  bottom: 2rem;
  right: 0;

  transition: opacity 0.3s;
}

.back-to-top:hover {
  opacity: 1;
}

.back-to-top svg {
  --inner-size: 2.5rem;
  --spacing: calc(var(--inner-size) * 0.25);
  --size: calc(var(--inner-size) - var(--spacing) * 2);

  height: var(--size);
  width: var(--size);
  padding: var(--spacing);
  
  background-color: $arrowBgColor;
  color: $arrowColor;
  opacity: 0;

  transform: translate(-100%, 100%);

  transition:
    transform 0.2s,
    opacity 0.2s;
}

@media (max-width: 959px) {
  .back-to-top {
    display: none;
  }
}

.back-to-top.show svg {
  transform: translate(-100%, -100%);
  opacity: 1;
}
</style>