<template>
  <div id="global-layout">
    <component :is="layout">
        <template #sidebar-bottom>
            <div class="sidebar-bottom"></div>
        </template>
    </component>
    <footer>
        <div class="footer--made-with">
            Made with&nbsp;&#128155;&nbsp;by
            <a href="https://protocol.ai" target="_blank" rel="noopener noreferrer">Protocol Labs</a>
        </div>
        <div class="footer--links">
            <div><a href="https://status.web3.storage" target="_blank" rel="noopener noreferrer" class="footer--links-item footer--links--status">Status</a></div>
            <div><a :href="`${$site.themeConfig.mainDomain}/legal`" class="footer--links-item footer--links--terms">Terms of Service</a></div>
            <div><span class="footer--links--help-prefix">Need help?</span>&nbsp;<a href="https://github.com/web3-storage" target="_blank" rel="noopener noreferrer" class="footer--links-item footer--links--help">Open an issue</a></div>
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

    --link-hit-area: 1.25em;
    --side-spacing: 2em;
    
    position: relative;
    z-index 5;
    overflow: hidden;
    
    background-color: $layoutBgColor;
    color: $w3storage-purple;
    
    display: flex;
    padding: 1.25em 0;

    font-size: 0.9rem;
}


footer a {
    color: $w3storage-purple;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
        color: $w3storage-yellow;
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
  align-items: center;
  padding-right: var(--side-spacing);
  margin-right: calc(-1 * var(--link-hit-area));
}

.footer--links-item {
    padding: 0 var(--link-hit-area);

    text-decoration none;
}

.footer--links--help-prefix {
    padding-left: 0.5em;
    padding-right: 0;
}

.footer--links--help {
    padding-left: 0;
    padding-right: 0.5em;
}

@media (max-width: $MQMobile) {
	footer {
		display: block;
    text-align: center;
	}
  .footer--made-with {
    padding-left: 0;
    a {
      padding: 0;
      margin: 0;
    }
  }
  .footer--links {
    display: block;
    margin-top: 0.5em;
    margin-right: 0;
    padding-right: 0;
  }
}

</style>