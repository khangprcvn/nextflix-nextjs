import jwt from 'jsonwebtoken'

import { magiAdmin } from 'lib/magic'
import { isNewUser, createNewUser } from 'lib/db/hasura'
import { setTokenCookie } from 'lib/cookies'

export default async function login(req, res) {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization

      const didToken = auth ? auth.substr(7) : ''

      const metadata = await magiAdmin.users.getMetadataByToken(didToken)

      // create jwt token
      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET,
      )

      const isNewUserQuery = await isNewUser(token, metadata.issuer)
      if (isNewUserQuery) {
        await createNewUser(token, metadata)
      }

      setTokenCookie(token, res)
      res.send({ done: true })
    } catch (error) {
      res.send({ done: false })
      console.error('Something went wrong', error)
    }
  } else {
    console.error('Something went wrong')
  }
}
