import golos from 'golos-js'
import slugify from 'slugify'

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
