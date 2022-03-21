import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'

import { magic } from 'lib/magic-client'

import styles from './navbar.module.css'

const Navbar = () => {
  const [username, setUsername] = useState('')
  const [showMore, setShowMore] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const getEmail = async () => {
      try {
        const { email } = await magic.user.getMetadata()
        const idToken = await magic.user.getIdToken()
        if (email) {
          setUsername(email)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getEmail()
  }, [])

  const handleSignout = async e => {
    e.preventDefault()
    try {
      await magic.user.logout()
      router.push('/login')
    } catch (error) {
      router.push('/login')
      console.error(error)
    }
  }

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
              <a className={styles.logout} onClick={handleSignout}>
                Sign out of Netflix
              </a>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Navbar
