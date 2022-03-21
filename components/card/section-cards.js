import React from 'react'

import Link from 'next/link'

import Card from 'components/card'

import styles from './card.module.css'

const SectionCards = ({ header, videos = [], size = 'medium' }) => {
  return (
    <section className={styles.imgContainer}>
      <h2 className={styles.header}>{header}</h2>
      <div className={styles.cardWrapper}>
        {videos.map(video => (
          <Link key={video.id} href={`/video/${video.id}`} passHref>
            <a>
              <Card imgUrl={video.url} size={size} header={header} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SectionCards
