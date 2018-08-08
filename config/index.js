const app_tags = process.env.PROD ? ['mapala', 'ru--mapala'] : ['mapala-dev']

export default {
  app: 'mapala-next/1.0',
  app_tags: app_tags, // Posting to first tag
  tag_for_post: app_tags[0],
  get_content_limit: 5, // Limit posts for node query

  img_proxy_prefix: 'https://imgp.golos.io/',
  API_QL_URL: process.env.API_QL_URL || 'http://127.0.0.1:5000/graphql'
}

export const map_options = {
  minZoom: 4,
  mapTypeControl: true,
  zoomControlOptions: {
    position: null
  },
  streetViewControlOptions: {
    position: null
  },
  gestureHandling: 'greedy',

  styles: [
    {
      'stylers': [
        {
          'hue': '#007fff'
        },
        {
          'saturation': 89
        }
      ]
    },
    {
      'featureType': 'water',
      'stylers': [
        {
          'color': '#ffffff'
        }
      ]
    },
    {
      'featureType': 'administrative.country',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    }
  ]
}

