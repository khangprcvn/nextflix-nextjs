import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Loading from 'components/loading'
import { magic } from 'lib/magic-client'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn()
        if (isLoggedIn) {
          router.push('/')
        } else {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
        console.error(error)
      }
    }
    checkLoggedIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleChangeComplete = () => {
      setIsLoading(false)
    }
    router.events.on('routeChangeComplete', handleChangeComplete)
    router.events.off('routeChangeError', handleChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleChangeComplete)
      router.events.off('routeChangeError', handleChangeComplete)
    }
  }, [router])

  return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
