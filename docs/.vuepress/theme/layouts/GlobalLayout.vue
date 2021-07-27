<template>
  <div id="global-layout">
    <div class="banner--nft-storage">
      Looking to store NFTs? Check out <a href="https://nft.storage">NFT.Storage</a>!
    </div>
    <component :is="layout">
        <template #sidebar-bottom>
            <div class="sidebar-bottom"></div>
        </template>
        <template #page-bottom>
          <footer>
            <div class="footer--made-with">
                {{ $themeLocaleConfig.footer.madeBy.sentence }}
                <a
                  :href="$themeLocaleConfig.footer.madeBy.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="trackClick"
                >
                  {{ $themeLocaleConfig.footer.madeBy.text }}
                </a>
            </div>
            <div class="footer--links">
              <div v-for="item in $themeLocaleConfig.footer.nav" :key="item.link">
                <a
                  v-if="item.link.startsWith($site.themeConfig.mainDomain)"
                  :href="item.link"
                  class="footer--links-item footer--links--status"
                  @click="trackClick"
                >
                  {{ item.text }}
                </a>
                <RouterLink
                  v-else-if="item.link.startsWith('/')"
                  :to="item.link"
                  class="footer--links-item footer--links--status"
                  @click="trackClick"
                >
                  {{ item.text }}
                </RouterLink>
                <a
                  v-else
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer--links-item footer--links--status"
                  @click="trackClick"
                >
                  {{ item.text }}
                </a>
              </div>
            </div>
          </footer>
        </template>
    </component>
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

.banner--nft-storage {
  @extend .max-w-screen-xl;
  @extend .mx-auto;
  @extend .relative;

  background-color: $w3storage-purple;
  padding: .25rem 0;
  height: auto;
  width: 100%;

  line-height: 2.2em;
  color: $accentTextColor;
  font-weight: 600;
  font-size: .9375rem;
  letter-spacing: .02em;
  text-align: center;

  a {
    color: inherit;
    text-decoration: underline;
    font-weight: inherit;
  }
}

@media (max-width: $MQMobile) {
  .banner--nft-storage {
    line-height: 1.4;
    padding: .6rem 0;
  }
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
  --sidebar-width: 20rem;

  position: relative;
  z-index: 10;
  overflow: hidden;
  width: calc(100% + var(--sidebar-width));

  background-color: $layoutBgColor;
  color: $w3storage-purple;

  display: flex;
  padding: 1.25em 0;
  margin-top: 2rem;
  margin-left: calc(-1 * var(--sidebar-width));

  font-size: 0.9rem;
}

@media (max-width: $MQNarrow) {
  footer {
    --sidebar-width: 16.5rem;
  }
}

@media (max-width: $MQMobile) {
  footer {
    --sidebar-width: 0rem;
  }
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
