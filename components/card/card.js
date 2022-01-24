import { useState } from 'react'

import Image from 'next/image'
import { motion } from 'framer-motion'
import cls from 'classnames'

import styles from './card.module.css'

const Card = props => {
  const { imgUrl, size = 'medium', onClick } = props

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
    <div className={styles.container}>
      <motion.div
        className={cls(styles.motionWrapper, classMap[size])}
        whileHover={{
          scale: 1.1,
        }}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          className={styles.cardImg}
          onError={handleErrorImg}
          onClick={onClick}
        />
      </motion.div>
    </div>
  )
}

export default Card
