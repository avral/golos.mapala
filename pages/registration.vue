<template lang="pug">
.container.mt-5
  no-ssr
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

  el-steps(:active='1' align-center)
    el-step(title='Шаг 1', description='Подтвердите номер телефона')
    el-step(title='Шаг 2', description='Придумайте пароль логин')
    el-step(title='Шаг 3', description='Сохраните данные от аккаунта')
</template>
