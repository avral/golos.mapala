<template lang="pug">
  el-button.upvote-btn(size="small" v-if="!post.isVoted", @click="vote", :loading="loading")
    round.mr-2
    span.mutted-text.mr-2 Поддержать
    span.text-light {{ parseFloat(post.totalPendingPayout) | convertGBG }}₽

  el-button.upvote-btn(v-else, size="small", disabled)
    round.mr-2
    span.mutted-text.ml-2 Поддержано
    // TODO тут сделать фильтрацию по разрым валютам в зависимости от настроек
    span.text-light.ml-2 {{ parseFloat(post.totalPendingPayout) | convertGBG }}₽
</template>

<script>
import golos from 'golos-js'
import { mapState } from 'vuex'

import Round from '~/components/elements/svg/round.vue'

export default {
  props: ['post'],

  data() {
    return {
      loading: false
    }
  },

  computed: {
    ...mapState({
      wif: state => state.auth.wif,
      name: state => state.auth.account.name,
    })
  },

  methods: {
    vote() {
        if (!this.$store.getters['auth/isAuth']) {
      	  return this.$notify({title: 'Vote error', message: 'Авторизируйтесь!', type: 'warning'})
        }

			  this.loading = true
        golos.config.set('websocket', 'wss://ws18.golos.io')
        golos.broadcast.vote(
          this.wif, this.name, this.post.author.name,
          this.post.permlink, 10000, (err, res) => {
            err
              ? this.$notify({title: 'Vote error', message: err.message, type: 'warning'})
              : this.$notify({title: 'Voted', type: 'success'});
                this.post.isVoted = true


            this.loading = false

            // TODO Тут все в сентри логируем дополнительно
            if (err) {
              console.log(err)
            }
        })
      

			//try {


      //	this.post.isVoted = true
      //	this.$notify({title: 'Voted', type: 'success'})
			//} catch (e) {
      //	this.$notify({title: 'Vote error', message: e.message, type: 'error'})
			//} finally {
			//	this.loading = false
			//}
    }
  },

  components: {
    Round
  }
}

</script>
