import golos from 'golos-js'
import axios from 'axios'

import config from '@/config'

export function prepare_json_metadata (m) {
  let meta = m

  let app_tag = config.tag_for_post // В первый тего постим
  meta.app = config.app

  if (meta.tags === undefined) {
    meta.tags = [app_tag]
  } else if (!meta.tags.includes(app_tag)) {
    meta.tags.unshift(app_tag)
  }

  return meta
}

export async function get_account(account) {
  let res
  await golos.api.getAccounts([account], (e, r) => res = r)

  return res[0]
}


// TODO Метод для смены ноды


export default golos;
