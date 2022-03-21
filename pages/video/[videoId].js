import React from 'react'

import Modal from 'react-modal'

import { useRouter } from 'next/router'

import Navbar from 'components/navbar'

import { getVideoById } from 'lib/videos'

import styles from 'styles/Video.module.css'

Modal.setAppElement('#__next')

export async function getStaticProps(context) {
  const videoId = context.params.videoId
  const videoArray = await getVideoById(videoId)

  return {
    props: { 
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const videos = []

  // Get the paths we want to pre-render based on posts
  const paths = videos.map(id => ({
    params: { id },
  }))

  return { paths, fallback: 'blocking' }
}

const Video = ({ video }) => {
  const router = useRouter()

  const {
    query: { videoId },
  } = router

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount },
  } = video

  return (
    <div className={styles.container}>
      <Navbar />

      <Modal
        isOpen={true}
        contentLabel="Video content"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="player"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="390"
          src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.text}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={styles.subTextWrapper}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={styles.subTextWrapper}>
                <span className={styles.textColor}>View count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Video
