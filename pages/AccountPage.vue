<template lang="pug">
// TODO Переименовать компонент в account

div
  account(:account="account")
  feed(:filters="{author: $route.params.account}")

</template>

<script>
// FIXME cover_image не находит у аккаунтов и падает
import Feed from '~/components/post/Feed'
import Account from '~/components/account/Account.vue'
import { ACCOUNT_QUERY } from '~/constants/queries.js'

export default {
  components: {
    Feed,
    Account
  },

  async asyncData ({ app, store, commit, route }) {
    let client = app.apolloProvider.defaultClient

    let { data: { account } } = await client.query({query: ACCOUNT_QUERY, variables: {
      name: route.params.account
    }})

    return { account }
  },
}


</script>

<style>
.card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 1);
}
.card.hovercard .card-background {
    height: 130px;
}
.card-background img {
    min-width: 100%;
    background-position: 50% 50%;
}
.card.hovercard .useravatar {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
}
.card.hovercard .useravatar img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
.card.hovercard .card-info .card-title {
    padding:0 5px;
    font-size: 20px;
    line-height: 1;
    color: #262626;
    border-radius: 4px;
}
</style>
