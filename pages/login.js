import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'

import { magic } from 'lib/magic-client'

import styles from 'styles/login.module.css'

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const handleChangeComplete = () => {
      setStatus('success')
    }
    router.events.on('routeChangeComplete', handleChangeComplete)
    router.events.on('routeChangeError', handleChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleChangeComplete)
      router.events.off('routeChangeError', handleChangeComplete)
    }
  }, [router])

  const isLoading = status === 'loading'

  const handleChangeEmail = event => {
    setUserMsg('')
    setEmail(event.target.value)
  }

  const handleSignIn = async e => {
    if (email) {
      setStatus('loading')
      try {
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        })
        if (didToken) {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${didToken}`,
              'Content-Type': 'application/json',
            },
          })

          const data = await response.json()

          if (data.done) {
            router.push('/')
          }
        }
      } catch (error) {
        setStatus('error')
        console.error(error)
      }
    } else {
      setUserMsg('Something went wrong logging in')
    }
  }

  return (
    <section className={styles.loginContainer}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <Image
          src="/static/netflix.svg"
          alt="netflix-logo"
          width="128px"
          height="34px"
        />
      </header>
      <main className={styles.loginMain}>
        <div className={styles.loginWrapper}>
          <h3 className={styles.headerForm}>Sign In</h3>
          <input
            className={styles.input}
            placeholder="Email address"
            onChange={handleChangeEmail}
          />

          {userMsg && <p>{userMsg}</p>}

          <div className={styles.btnWrapper}>
            <button
              className={styles.btnSignIn}
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </button>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Login
