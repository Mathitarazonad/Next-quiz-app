'use client'
import { UserAuth } from "@/contexts/UserContext"

export default function LogoutButton() {
  const {logout} = UserAuth();
  
  return (
    <button onClick={() => logout()}>Log out</button>
  )
}
