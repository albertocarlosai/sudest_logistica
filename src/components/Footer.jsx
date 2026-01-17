import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

function Footer() {
  const { t } = useTranslation()
  const footerRef = useRef(null)

  useEffect(() => {
    if (!footerRef.current) return
    
    // Asegurar que los elementos sean visibles inicialmente con estilos inline
    if (footerRef.current?.children) {
      Array.from(footerRef.current.children).forEach(child => {
        if (child instanceof HTMLElement) {
          child.style.opacity = '1'
          child.style.visibility = 'visible'
        }
      })
    }
    
    // Animación - solo posición
    gsap.fromTo(footerRef.current?.children || [], {
      y: 30
    }, {
      y: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      immediateRender: false
    })
  }, [])

  return (
    <footer className="bg-[#0A2240] text-white py-12">
      <div 
        ref={footerRef} 
        className="container mx-auto px-4"
        style={{ opacity: 1, visibility: 'visible' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img 
              src="/sudest_logo_transparent.png" 
              alt="SUDEST LOGÍSTICA - Transporte y Logística en Riudarenes" 
              className="h-14 w-auto object-contain mb-4 filter brightness-0 invert opacity-90"
            />
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.enlaces')}</h3>
            <nav aria-label="Enlaces del pie de página">
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#inicio" className="hover:text-[#F7961D] transition-colors duration-200">
                    {t('nav.inicio')}
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-[#F7961D] transition-colors duration-200">
                    {t('nav.servicios')}
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="hover:text-[#F7961D] transition-colors duration-200">
                    {t('nav.beneficios')}
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="hover:text-[#F7961D] transition-colors duration-200">
                    {t('nav.contacto')}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.contacto')}</h3>
            <address className="not-italic space-y-2 text-gray-300 text-sm">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-[#F7961D] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span dangerouslySetInnerHTML={{ __html: t('contacto.direccionValue') }}></span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#F7961D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('footer.vigilancia')}</span>
              </div>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SUDEST LOGÍSTICA. {t('footer.copyright')} | 
            {t('footer.location')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
