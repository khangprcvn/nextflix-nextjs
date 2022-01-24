import { Magic } from 'magic-sdk'

const createMagic = () => {
  return new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY)
}

export const magic = createMagic()
