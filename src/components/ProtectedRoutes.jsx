'use client'
import { UserAuth } from "@/contexts/UserContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function ProtectedRoutes({children, path}) {
  const {currentUser} = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push(path);
    }
  }, [router, currentUser])

  return (<>{currentUser ? children : null}</>)
}
