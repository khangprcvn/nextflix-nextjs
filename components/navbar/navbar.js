import { useState } from 'react'

import Image from 'next/image'

import styles from './navbar.module.css'

const Navbar = props => {
  const { username } = props

  const [showMore, setShowMore] = useState(false)

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarWrapper}>
        <a className={styles.logLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="netflix-logo"
              width="128px"
              height="34px"
            />
          </div>
        </a>
        <ul className={styles.listContainer}>
          <li className={styles.item}>Home</li>
          <li className={styles.item}>My List</li>
        </ul>

        <nav className={styles.navbar}>
          <div>
            <button
              className={styles.buttonUsername}
              onClick={() => setShowMore(!showMore)}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="netflix-logo"
                width="24px"
                height="24px"
              />
            </button>
          </div>

          {showMore && (
            <div className={styles.logoutContainer}>
              <a className={styles.logout}>Sign out of Netflix</a>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Navbar
