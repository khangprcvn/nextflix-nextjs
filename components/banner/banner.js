import Image from 'next/image'

import styles from './banner.module.css'

const Banner = props => {
  const {title, subtitle, imgUrl} = props

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nSeriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.subTitle}>{subtitle}</h3>

          <button className={styles.buttonPlay}>
            <div className={styles.buttonWithIcon}>
              <Image
                src="/static/play_arrow.svg"
                alt="play-icon"
                height={32}
                width={32}
              />
            </div>
            <span className={styles.playText}>Play</span>
          </button>
        </div>
      </div>

      <div
        className={styles.backgroundBanner}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      />
    </div>
  )
}

export default Banner
