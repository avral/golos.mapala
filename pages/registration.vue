<template lang="pug">
no-ssr
  .container.mt-5
    .row.justify-content-center(v-if="$store.getters['auth/isAuth']")
      form.col-md-6.text-center
        img(src="@/assets/img/mapala-logo.png", width="100", height="100").mb-3
        h1.h3 Регистрация
        p.text-muted.lead Вы авторизоавнны

    .row.justify-content-center(v-else)
      form.col-md-6.text-center
        img(src="@/assets/img/mapala-logo.png", width="100", height="100").mb-3
        h1.h2 Регистрация
        p.text-muted.lead Mapala работает на блокчейне 
          a(href="https://golos.io", target="_blank")
            img(src="https://golos.io/favicon.ico", height="15")
            | Golos
        //.mb-2
          | Для авторизации вам необходимо иметь аккаунт в блокчейне GOLOS
          br
          | Авторизируйтесь с помощью POSTING ключа

    //.row.justify-content-center
      .col-8.registration
        .row
          .col
            el-steps(:active='1' align-center)
              el-step(title='Шаг 1', description='Подтвердите номер телефона')
              el-step(title='Шаг 2', description='Придумайте пароль логин')
              el-step(title='Шаг 3', description='Сохраните данные от аккаунта')

        .row.justify-content-center.mt-4
          .col-10(v-if="active == 1").justify-content-center
            // TODO Удалена из зависимостей
            //invisible-recaptcha(v-show="show_recaptcha" sitekey="6LfKfS8UAAAAAHEecRYjwgsL7p2SDXriEC5m0Otc", @verify="success")


</template>

<script>
//import InvisibleRecaptcha from 'vue-invisible-recaptcha'


export default {
  data() {
    return {
      show_recaptcha: true,
      active: 1,

      recaptcha: null,
    }
  },

  methods: {
    success(code) {
      this.recaptcha = code
      this.show_recaptcha = false
    }
  },

  components: {
    //InvisibleRecaptcha
  },

  head() {
    return {
      script: [
        { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit'}
      ]
    }
  }, }

</script>

<style>
.registration {
    background-color: whitesmoke;
    padding: 40px 0px;
}
</style>
