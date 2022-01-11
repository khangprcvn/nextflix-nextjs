import { useState } from 'react'

import Image from 'next/image'
import { motion } from 'framer-motion'
import cls from 'classnames'

import styles from './card.module.css'

const Card = props => {
  const { imgUrl, size = 'medium', header } = props

  const [imgSrc, setImgSrc] = useState(imgUrl)

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  }

  const handleErrorImg = () => {
    setImgSrc('/static/clifford.webp')
  }

  return (
    <section className={styles.imgContainer}>
      <h2 className={styles.header}>{header}</h2>

      <motion.div
        className={cls(styles.motionWrapper, classMap[size])}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          className={styles.cardImg}
          onError={handleErrorImg}
        />
      </motion.div>
    </section>
  )
}

export default Card
