export async function queryHasuraGraphQL(
  operationsDoc,
  operationName,
  variables,
  token,
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  return await result.json()
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewQuery($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
    }
  }
`

  const response = await queryHasuraGraphQL(
    operationsDoc,
    'isNewQuery',
    {
      issuer,
    },
    token,
  )

  return response?.data?.users?.length === 0
}

export async function createNewUser(token, metaData) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {issuer: $issuer, email: $email, publicAddress: $publicAddress}) {
      affected_rows
      returning {
        email
        id
        issuer
      }
    }
  }
`

  const { issuer, email, publicAddress } = metaData

  const response = await queryHasuraGraphQL(
    operationsDoc,
    'createNewUser',
    {
      issuer,
      email,
      publicAddress,
    },
    token,
  )
  console.log('createNewUser ~ response', response)

  return response?.data
}
