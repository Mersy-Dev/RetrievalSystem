'use client'

// import { useTranslations } from 'next-intl'
// import Link from 'next/link'
// import AuthButtons from './AuthButtons'
// import InvestmentButtons from './InvestmentButtons'
// import LanguageSwitcher from './LanguageSwitcher'
// import OurInvestmentTools from './OurInvestmentTools'
import { useState, useEffect, useRef } from 'react'

const MobileMenu = () => {
//   const t = useTranslations('Navbar')
  const [isOpen, setIsOpen] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

//   const closeMenu = () => setIsOpen(false) // Function to close menu

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className="container mx-auto lg:hidden py-8 border-t mt-4 border-gray-100/40"
    >
      <div className="flex flex-col space-y-4">
        {/* <OurInvestmentTools isMobile closeMenu={closeMenu} />
        <Link href="/#campaigns" className="hover:text-blue-600" onClick={closeMenu}>
          {t('campaign')}
        </Link>
        <Link href="/about" className="hover:text-blue-600" onClick={closeMenu}>
          {t('about')}
        </Link>
        <InvestmentButtons closeMenu={closeMenu} />
        <hr />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <LanguageSwitcher closeMenu={closeMenu} />
          <AuthButtons closeMenu={closeMenu} />
        </div> */}
      </div>
    </div>
  )
}

export default MobileMenu
