export interface User {
  id: number
  name: string | null
  image: string | null
  email: string
  facebookId: string
  gender?: string
  location?: string
  city?: string
  province?: string
  country?: string
}
