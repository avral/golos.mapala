import gql from 'graphql-tag'

export const ACCOUNT_QUERY = gql`
query account($name: String!) {
  account(name: $name) {
    name,
    balanceValue
    meta {
      profile {
        profileImage
        coverImage
        website
      }
    }
  }
}
`

export const POST_QUERY = gql`
query posts ($identifier: CommentIdentifier!) {
  post(identifier: $identifier) {
    author {
      name
      meta {
        profile {
          profileImage
        }
      }
    }
    permlink
    meta {
      location
      format
      tags
    }
    title
    created
    body
    thumb
    isVoted(account: "avral")
    netVotes
    totalPendingPayout
    children
  }
}
`

export const POSTS_QUERY = gql`
  query posts ($after: String, $category: String!, $first: Int!, $author: String) {
    posts(after: $after, first: $first, category: $category, author: $author) {
      edges {
        node {
          author {
            name
            meta {
              profile {
                profileImage
              }
            }
          }
          permlink
          meta {
            location
            format
            tags
          }
          title
          created
          body
          thumb
          isVoted(account: "avral")
          netVotes
          totalPendingPayout
          children
        },
        cursor
      }
    }
  }
`
