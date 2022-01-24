import React from 'react'

import { useRouter } from 'next/router'

// export const getStaticProps = async ({ params }) => {
//   console.log(params)

//   return {
//     props: {},
//   }
// }

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: false,
  }
}

const Video = () => {
  const router = useRouter()

  console.log(router)

  return <div>Video Detail</div>
}

export default Video
