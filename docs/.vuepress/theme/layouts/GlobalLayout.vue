<template>
  <div id="global-layout">
    <component :is="layout">
        <template #sidebar-bottom>
            <div class="sidebar-bottom"></div>
        </template>
    </component>
    <footer>
        <div class="footer--made-with">
            Made with ❤️by
            <a href="https://protocol.ai">Protocol Labs</a>
        </div>
        <div class="footer--links">
            <a href="https://status.web3.storage" target="_blank" class="footer--links-item footer--links--status">Status</a>
            <a :href="`${$site.themeConfig.mainDomain}/legal`" class="footer--links-item footer--links--terms">Terms of Service</a>
            <a class="footer--links-item footer--links--help">Help</a>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // You can also check whether layout exists first as the default global layout does.
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styles/index';

.sidebar-bottom {
	height: 5.6rem; // make room for footer
}

footer {
	@extend .max-w-screen-xl;
	@extend .mx-auto;
	@extend .relative;

    --link-hit-area: 0.75em;
    --side-spacing: 2em;
    
    position: relative;
    z-index 5;
    overflow: hidden;
    
    background-color: $layoutBgColor;
    color: $w3storage-blue-dark;
    
    display: flex;
    padding: 2em 0;

    font-size: 0.8rem;
}


footer a {
    color: $w3storage-blue-dark;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
        color: $w3storage-white;
    }
}

.footer--made-with {
  flex-grow: 2;
  padding-left: var(--side-spacing);

  a {
    font-weight: bold;
    padding: 0 var(--link-hit-area);
    margin: 0 calc(-1 * var(--link-hit-area));
  }
}

.footer--links {
  display: flex;
  padding-right: var(--side-spacing);
  margin-right: calc(-1 * var(--link-hit-area));
}

.footer--links-item {
    padding: 0 var(--link-hit-area);

    text-decoration none;
}

</style>