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
            <a
              href="https://protocol.ai"
              target="_blank"
              rel="noopener noreferrer"
              @click="trackClick"
            >
              Protocol Labs
            </a>
        </div>
        <div class="footer--links">
            <div>
              <a
                href="https://status.web3.storage"
                target="_blank"
                rel="noopener noreferrer"
                class="footer--links-item footer--links--status"
                @click="trackClick"
              >
                Status
              </a>
            </div>
            <div>
              <a
                :href="`${$site.themeConfig.mainDomain}/legal`"
                class="footer--links-item footer--links--terms"
                @click="trackClick"
              >
                Terms of Service
              </a>
            </div>
            <div>
              <a
                href="https://github.com/web3-storage"
                target="_blank"
                rel="noopener noreferrer"
                class="footer--links-item footer--links--help"
                @click="trackClick"
              >
                Open an issue
              </a>
            </div>
            <div>
              <a
                href="https://filecoinproject.slack.com"
                target="_blank"
                rel="noopener noreferrer"
                class="footer--links-item footer--links--slack"
                @click="trackClick"
              >
                Join us on Slack
              </a>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
import countly from '@theme/utils/countly'

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
  },
  methods: {
    trackClick ({ currentTarget: target }) {
      countly.trackEvent(countly.events.LINK_CLICK_FOOTER, {
        path: location.pathname,
        href: target.href,
        link: target.pathname + (target.pathname.endsWith('/') ? '' : '/') + target.hash,
        text: target.innerText,
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styles/index';

#global-layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

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
  width: 100%;
  
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

@media (max-width: 780px) {
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

  .sidebar-bottom {
    height: 8rem; // make room for footer
  }
}

</style>