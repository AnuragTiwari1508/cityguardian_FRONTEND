"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LandingPage from "@/components/landing-page"
import LoginPortal from "@/components/login-portal"

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const router = useRouter()

  const handleGetStarted = () => {
    // For now, go directly to citizen portal
    // Later this can show role selection
    router.push('/citizen')
  }

  if (showLogin) {
    return <LoginPortal onBack={() => setShowLogin(false)} />
  }

  return <LandingPage onGetStarted={handleGetStarted} />
}
