import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

function Header() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    // Asegurar que los elementos sean visibles inicialmente con estilos inline
    if (logoRef.current) {
      logoRef.current.style.opacity = '1'
      logoRef.current.style.visibility = 'visible'
    }
    if (navRef.current?.children) {
      Array.from(navRef.current.children).forEach(child => {
        if (child instanceof HTMLElement) {
          child.style.opacity = '1'
          child.style.visibility = 'visible'
        }
      })
    }

    // Animación de entrada del header - solo posición, mantener opacidad
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, {
        x: -50
      }, {
        x: 0,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false
      })
    }

    if (navRef.current?.children) {
      gsap.fromTo(Array.from(navRef.current.children), {
        y: -20
      }, {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out',
        immediateRender: false
      })
    }
  }, [])

  useEffect(() => {
    // Animación del header al hacer scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(headerRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          boxShadow: '0 4px 20px rgba(10, 34, 64, 0.1)',
          duration: 0.3
        })
      } else {
        gsap.to(headerRef.current, {
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          duration: 0.3
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header ref={headerRef} className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          <a href="#inicio" className="flex items-center group">
            <img 
              ref={logoRef}
              src="/sudest_logo_transparent.png" 
              alt="SUDEST LOGÍSTICA - Transporte y Logística en Riudarenes" 
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ opacity: 1, visibility: 'visible' }}
            />
          </a>
          
          {/* Desktop Menu */}
          <div 
            ref={navRef} 
            className="hidden md:flex items-center space-x-8"
            style={{ opacity: 1, visibility: 'visible' }}
          >
            <a 
              href="#inicio" 
              className="font-semibold text-[#0A2240] hover:text-[#B0161F] transition-all duration-300 relative group py-2"
            >
              {t('nav.inicio')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B0161F] to-[#F7961D] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#servicios" 
              className="font-semibold text-[#0A2240] hover:text-[#B0161F] transition-all duration-300 relative group py-2"
            >
              {t('nav.servicios')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B0161F] to-[#F7961D] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#beneficios" 
              className="font-semibold text-[#0A2240] hover:text-[#B0161F] transition-all duration-300 relative group py-2"
            >
              {t('nav.beneficios')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B0161F] to-[#F7961D] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#contacto" 
              className="font-semibold text-[#0A2240] hover:text-[#B0161F] transition-all duration-300 relative group py-2"
            >
              {t('nav.contacto')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B0161F] to-[#F7961D] group-hover:w-full transition-all duration-300"></span>
            </a>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none text-[#0A2240]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú móvil"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            <a 
              href="#inicio" 
              className="block font-medium text-[#0A2240] hover:text-[#B0161F] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.inicio')}
            </a>
            <a 
              href="#servicios" 
              className="block font-medium text-[#0A2240] hover:text-[#B0161F] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.servicios')}
            </a>
            <a 
              href="#beneficios" 
              className="block font-medium text-[#0A2240] hover:text-[#B0161F] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.beneficios')}
            </a>
            <a 
              href="#contacto" 
              className="block font-medium text-[#0A2240] hover:text-[#B0161F] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contacto')}
            </a>
            <div className="pt-2">
              <LanguageSelector />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
