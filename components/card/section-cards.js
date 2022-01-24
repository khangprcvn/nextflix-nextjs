import React from 'react'

import { useRouter } from 'next/router'

import Card from 'components/card'

import styles from './card.module.css'

const SectionCards = ({ header, videos = [], size = 'medium' }) => {
  const router = useRouter()

  return (
    <section className={styles.imgContainer}>
      <h2 className={styles.header}>{header}</h2>
      <div className={styles.cardWrapper}>
        {videos.map(video => (
          <Card
            key={video.id}
            imgUrl={video.url}
            size={size}
            header={header}
            // onClick={() => {
            //   console.log('click')
            //   router.push(`/video/${video.id}`)
            // }}
          />
        ))}
      </div>
    </section>
  )
}

export default SectionCards
