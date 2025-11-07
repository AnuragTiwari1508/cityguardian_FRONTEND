"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Menu, X } from "lucide-react"
import { useState } from "react"

interface NavigationHeaderProps {
  title: string
  showBackButton?: boolean
  customBackPath?: string
  children?: React.ReactNode
}

export default function NavigationHeader({ 
  title, 
  showBackButton = true, 
  customBackPath, 
  children 
}: NavigationHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleBack = () => {
    if (customBackPath) {
      router.push(customBackPath)
    } else {
      router.back()
    }
  }

  const handleHome = () => {
    router.push('/')
  }

  // Generate breadcrumb from pathname
  const generateBreadcrumb = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ name: 'Home', path: '/' }]
    
    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      const name = path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ')
      breadcrumbs.push({ name, path: currentPath })
    })
    
    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumb()

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Back button and title */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-green-400 hover:bg-green-400/10 hover:text-green-300"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHome}
              className="text-green-400 hover:bg-green-400/10 hover:text-green-300"
            >
              <Home className="w-4 h-4" />
            </Button>

            <div className="hidden sm:block">
              <h1 className="text-green-400 font-black text-lg tracking-wider">{title}</h1>
              <div className="flex items-center gap-1 text-xs text-green-300/70 font-mono">
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.path} className="flex items-center gap-1">
                    {index > 0 && <span className="text-green-500/50">/</span>}
                    <button
                      onClick={() => router.push(crumb.path)}
                      className="hover:text-green-300 transition-colors"
                    >
                      {crumb.name}
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile title */}
            <div className="block sm:hidden">
              <h1 className="text-green-400 font-black text-base tracking-wider">{title}</h1>
            </div>
          </div>

          {/* Right side - Custom children or menu */}
          <div className="flex items-center gap-3">
            {children}
            
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-green-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile breadcrumb */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-green-500/30 py-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-green-300/70 font-mono">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.path} className="flex items-center gap-1">
                  {index > 0 && <span className="text-green-500/50">/</span>}
                  <button
                    onClick={() => {
                      router.push(crumb.path)
                      setMobileMenuOpen(false)
                    }}
                    className="hover:text-green-300 transition-colors p-1 rounded"
                  >
                    {crumb.name}
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}