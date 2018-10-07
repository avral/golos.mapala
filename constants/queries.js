import gql from 'graphql-tag'


export const MAPALA_TOTAL_PAYOUT_QUERY = gql`
{
  stats {
    posts {
      totalPayout(category: "mapala")
    }
  }
}
`


export const ACCOUNT_MARKERS_QUERY = gql`
{
  accounts(meta: {notNull: "mapalaProfile.location"}) {
    edges {
      node {
      	name
        meta {
          profile {
            profileImage
          }
          mapalaProfile {
            location {
              geometry {
                coordinates
              }
            }
          }
        }
      }
    }
  }
}
`

export const ACCOUNT_QUERY = gql`
query account($name: String!) {
  account(name: $name) {
    name,
    balanceValue
    jsonMetadata
    meta {
      mapalaProfile {
        location {
          properties
        }
      }
      profile {
        profileImage
        coverImage
        website
      }
    }
  }
}
`

export const MINIMAL_POST_QUERY = gql`
query minimal_post ($identifier: CommentIdentifier!) {
	post(identifier: $identifier) {
    title
    body
    meta {
      tags
      format
    }
  }
}
`

export const POSTS_QUERY = gql`
query posts ($after: String,
             $first: Int!,
             $author: String)
{
  posts(after: $after,
        first: $first,
        author: $author)
  {
    edges {
      node {
        author
        permlink
      },
      cursor
    }
  }
}
`
