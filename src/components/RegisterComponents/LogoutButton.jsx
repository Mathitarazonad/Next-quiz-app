'use client'
import { useUser } from '@/contexts/UserContext'

export default function LogoutButton() {
  const { logout } = useUser()

  return <button onClick={() => logout()}>Log out</button>
}
