import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'

function Hero() {
  const { t } = useTranslation()
  const [scrollPosition, setScrollPosition] = useState(0)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const backgroundRef = useRef(null)
  const containerRef = useRef(null)

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Efecto para animaciones iniciales
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !descriptionRef.current || !buttonsRef.current) return

    // Asegurar que los elementos sean visibles inicialmente con estilos inline
    if (titleRef.current) {
      titleRef.current.style.opacity = '1'
      titleRef.current.style.visibility = 'visible'
    }
    if (subtitleRef.current) {
      subtitleRef.current.style.opacity = '1'
      subtitleRef.current.style.visibility = 'visible'
    }
    if (descriptionRef.current) {
      descriptionRef.current.style.opacity = '1'
      descriptionRef.current.style.visibility = 'visible'
    }

    // Asegurar que los botones sean visibles desde el inicio
    if (buttonsRef.current.children && buttonsRef.current.children.length > 0) {
      const buttons = Array.from(buttonsRef.current.children)
      buttons.forEach(button => {
        if (button instanceof HTMLElement) {
          button.style.opacity = '1'
          button.style.visibility = 'visible'
        }
      })
    }

    // Animación del título - solo posición, mantener opacidad en 1
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, {
        y: 100
      }, {
        y: 0,
        duration: 1,
        ease: 'power4.out',
        immediateRender: false
      })
    }
    
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current, {
        y: 50
      }, {
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        immediateRender: false
      })
    }
    
    if (descriptionRef.current) {
      gsap.fromTo(descriptionRef.current, {
        y: 30
      }, {
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
        immediateRender: false
      })
    }
    
    // Animación de botones - solo posición y escala
    if (buttonsRef.current.children && buttonsRef.current.children.length > 0) {
      const buttons = Array.from(buttonsRef.current.children)
      buttons.forEach((button, index) => {
        if (button instanceof HTMLElement) {
          gsap.fromTo(button, {
            y: 30,
            scale: 0.8
          }, {
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.6 + (index * 0.1),
            ease: 'back.out(1.7)',
            immediateRender: false
          })
        }
      })
    }
  }, [])

  // Calcular la escala unificada basada en la posición del scroll
  const calculateUnifiedScale = () => {
    const startScale = 0
    const endScale = 400
    
    if (scrollPosition <= startScale) return 1
    if (scrollPosition >= endScale) return 0.92
    
    return 1 - ((scrollPosition - startScale) / (endScale - startScale)) * 0.08
  }

  // Calcular el radio de borde basado en la posición del scroll (todas las esquinas)
  const calculateBorderRadius = () => {
    const startRound = 0
    const endRound = 400
    
    if (scrollPosition <= startRound) return '0'
    if (scrollPosition >= endRound) return '50px'
    
    const radius = ((scrollPosition - startRound) / (endRound - startRound)) * 50
    return `${radius}px`
  }

  // Calcular la opacidad basada en la posición del scroll
  const calculateOpacity = () => {
    const startFade = 0
    const endFade = 500
    
    if (scrollPosition <= startFade) return 1
    if (scrollPosition >= endFade) return 0.75
    
    return 1 - ((scrollPosition - startFade) / (endFade - startFade)) * 0.25
  }

  const unifiedScale = calculateUnifiedScale()
  const borderRadius = calculateBorderRadius()
  const contentOpacity = calculateOpacity()

  return (
    <div className="relative w-full h-screen" style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      {/* Contenedor principal con escala unificada */}
      <div 
        ref={containerRef}
        className="relative w-full h-full"
        style={{
          transform: `scale(${unifiedScale})`,
          borderRadius: borderRadius,
          transformOrigin: 'center center',
          overflow: 'hidden',
          willChange: 'transform, border-radius',
          backgroundColor: '#0A2240',
          background: 'linear-gradient(to bottom right, #0A2240, #0d2d4f, #0A2240)'
        }}
      >
        {/* Fondo con efectos - debe respetar el border-radius */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0"
          style={{
            borderRadius: borderRadius,
            zIndex: 0,
            overflow: 'hidden'
          }}
        >
          <div 
            className="absolute top-0 right-0 w-96 h-96 bg-[#B0161F] rounded-full blur-3xl opacity-20"
            style={{
              transform: 'translate(20%, -20%)'
            }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-96 h-96 bg-[#F7961D] rounded-full blur-3xl opacity-20"
            style={{
              transform: 'translate(-20%, 20%)'
            }}
          ></div>
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A2240]/50"
            style={{
              borderRadius: borderRadius
            }}
          ></div>
        </div>
        
        {/* Contenido */}
        <div 
          ref={heroRef}
          className="relative z-10 flex items-center justify-center h-full px-4 md:px-16 max-w-7xl mx-auto"
          style={{
            opacity: contentOpacity
          }}
        >
            <div className="text-center">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white tracking-tight"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              {t('hero.title')}
            </h1>
            <div className="flex items-center justify-center my-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#F7961D] mr-4"></div>
              <p 
                ref={subtitleRef}
                className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-medium"
                style={{ opacity: 1, visibility: 'visible' }}
              >
                {t('hero.subtitle')}
              </p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#F7961D] ml-4"></div>
            </div>
            <p 
              ref={descriptionRef}
              className="text-base md:text-lg lg:text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              {t('hero.description')}
            </p>
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
              style={{ opacity: 1 }}
            >
              <a
                href="#servicios"
                className="group relative px-10 py-4 bg-gradient-to-r from-[#B0161F] to-[#F7961D] text-white rounded-lg font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{ opacity: 1, display: 'inline-block' }}
              >
                <span className="relative z-10">{t('hero.buttonServices')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F7961D] to-[#B0161F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#contacto"
                className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-base hover:bg-white hover:text-[#0A2240] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ opacity: 1, display: 'inline-block' }}
              >
                {t('hero.buttonContact')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
