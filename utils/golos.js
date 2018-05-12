import golos from 'golos-js'
import axios from 'axios'

import config from '@/config'


export function prepare_json_metadata (app_tag, meta) {
  meta.app = config.app
  meta.format = 'html'

  if (meta.tags === undefined) {
    meta.tags = [app_tag]
  } else if (!meta.tags.includes(app_tag)) {
    meta.tags.unshift(app_tag)
  }
  return JSON.stringify(meta)
}

export async function get_account(account) {
  let res
  await golos.api.getAccounts([account], (e, r) => res = r)

  return res[0]
}


  //let end = false
  //let is_first_iteraiton = true
  //let start_author, start_permlink

  //while (!end) {
  //  let posts = await golos.api.getDiscussionsByCreated({
  //    select_tags: tags,
  //    limit: 3, // Max

  //    start_author,
  //    start_permlink,
  //  })


  //  posts.map(p => console.log('Посты', p.created, p.permlink))

  //  if (is_first_iteraiton && posts.length > 0) {
  //    start_author = posts[posts.length - 1].author
  //    start_permlink = posts[posts.length - 1].permlink

  //    is_first_iteraiton = false
  //  } else if (posts.length > 1) {
  //    posts.shift()

  //    start_author = posts[posts.length - 1].author
  //    start_permlink = posts[posts.length - 1].permlink
  //  } else {
  //    // Закончились посты
  //    posts = []
  //    end = true
  //  }

  //  posts.map(p => console.log(p.created, p.permlink, JSON.parse(p.json_metadata).tags))


  //  yield* posts
  //}
