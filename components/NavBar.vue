<template lang="pug">
//div.top__menu
  el-menu(mode="horizontal", :router="true")
    el-menu-item(:route="{name: 'index'}", index="1")
        img(src="@/assets/img/mapala-logo.png", width="35", height="35")

    el-submenu(index="2")
      template(slot="title") Что такое Mapala? FAQ
      el-menu-item(:route="{name: 'about'}", index="2-1") Golos.io
      el-menu-item(:route="{name: 'about'}", index="2-2") Блокчейн
        //nuxt-link(:to="{name: 'about'}") Что такое Mapala? FAQ
    //el-menu-item(:route="2")
      //nuxt-link(:to="{name: 'map'}") Карта
    //el-menu-item(index="3")
    //  nuxt-link(:to="{name: 'settings'}") Настройки
    //el-menu-item(index="4")
    
  .right
    nuxt-link(v-if="!$store.getters['account/isAuth']", tag="el-button", :to="{name: 'login'}").el-button--primary Войти

    div(v-else="$store.getters['account/isAuth']")
      | {{ account.name }}
      //{{ account.meta.profile.profile.profile_image }}
      a(@click="logout").btn.btn-sm.btn-outline-secondary.ml-3 Выйти

      nuxt-link(tag="el-button", :to="{name: 'new-post'}").el-button--primary.float-left Добавить
    //el-menu-item(:route="{name: 'about'}", index="2-1").right Войти


// Navigation
b-navbar(toggleable="md" type="light").sticky-top.bg-light
  nuxt-link(:to="{name: 'index'}").navbar-brand
    img(src="@/assets/img/mapala-logo.png", width="35", height="35").mr-2
    | Mapala

  b-collapse(is-nav)#nav_collapse
    .col-7
      b-navbar-nav.d-flex.align-items-center
        nuxt-link(:to="{name: 'index'}").nav-item.nav-link Поиск

    .col-5.d-flex
      .d-flex(v-show="$store.getters['account/isAuth']")
        nuxt-link(v-show="$store.getters['account/isAuth']",
                  :to="{name: 'new-post'}").btn.btn-sm.btn-outline-secondary Написать статью

        nuxt-link(:to="{name: 'settings'}").btn.btn-sm.btn-outline-secondary.ml-3 Настройки

      no-ssr
        .ml-auto
          nuxt-link(v-show="!$store.getters['account/isAuth']" :to="{name: 'login'}").btn.btn-sm.btn-outline-secondary Войти
          div(v-show="$store.getters['account/isAuth']") {{ account.name }}
            //{{ account.meta.profile.profile.profile_image }}
            a(@click="logout").btn.btn-sm.btn-outline-secondary.ml-2 Выйти

  b-navbar-toggle(target="nav_collapse")

</template>

<script>
import { mapState } from 'vuex'


export default {
	methods: {
		logout() {
			this.$store.dispatch('account/logout')
		}
	},

  computed: {
    ...mapState({
      'account': state => state.account
    })
  },
}
</script>

<style>
</style>
