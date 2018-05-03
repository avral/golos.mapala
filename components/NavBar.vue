<template lang="pug">
// Navigation
b-navbar(toggleable="md" type="light").sticky-top.bg-light
  nuxt-link(:to="{name: 'index'}").navbar-brand
    img(src="@/assets/img/mapala-logo.png", width="35", height="35").mr-2
    | Mapala

  b-collapse(is-nav)#nav_collapse
    b-navbar-nav
      b-nav-item 
      nuxt-link(:to="{name: 'index'}").nav-item.nav-link Главная
      nuxt-link(:to="{name: 'feed'}").nav-item.nav-link Лента
      nuxt-link(:to="{name: 'map'}").nav-item.nav-link Карта
      nuxt-link(:to="{name: 'settings'}").nav-item.nav-link Настройки
      nuxt-link(:to="{name: 'new-post'}").nav-item.nav-link Добавить публикацию

  b-navbar-toggle(target="nav_collapse")

</template>
