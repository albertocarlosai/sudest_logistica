import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

function Servicios() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsRef = useRef(null)

  const servicios = [
    {
      image: "/contratacion_camiones.jpg",
      titleKey: "camiones",
      color: "from-sudest-azul-oscuro to-[#0d2d4f]"
    },
    {
      image: "/carga_descarga.jpg",
      titleKey: "carga",
      color: "from-sudest-rojo-intenso to-[#c91e2a]"
    },
    {
      image: "/almacenamiento.jpg",
      titleKey: "almacenamiento",
      color: "from-sudest-naranja to-[#ffa64d]"
    },
    {
      image: "/video_security.jpg",
      titleKey: "vigilancia",
      color: "from-[#3A3A3A] to-[#2A2A2A]"
    }
  ]

  useEffect(() => {
    // Asegurar que los elementos sean visibles inicialmente con estilos inline
    if (titleRef.current) {
      titleRef.current.style.opacity = '1'
      titleRef.current.style.visibility = 'visible'
    }
    if (subtitleRef.current) {
      subtitleRef.current.style.opacity = '1'
      subtitleRef.current.style.visibility = 'visible'
    }
    if (cardsRef.current?.children) {
      Array.from(cardsRef.current.children).forEach(card => {
        if (card instanceof HTMLElement) {
          card.style.opacity = '1'
          card.style.visibility = 'visible'
        }
      })
    }

    // Animación del título - solo posición
    const titleAnimation = titleRef.current ? gsap.fromTo(titleRef.current, {
      y: -50
    }, {
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      immediateRender: false
    }) : null

    const subtitleAnimation = subtitleRef.current ? gsap.fromTo(subtitleRef.current, {
      y: -30
    }, {
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: subtitleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      immediateRender: false
    }) : null

    // Animación de las tarjetas - solo posición y escala
    const cards = cardsRef.current ? Array.from(cardsRef.current.children) : []
    const eventHandlers = []
    
    if (cards.length > 0) {
      const cardsAnimation = gsap.fromTo(cards, {
        y: 100,
        scale: 0.8
      }, {
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        immediateRender: false
      })

      // Animación de hover con GSAP
      cards.forEach((card) => {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        }

        card.addEventListener('mouseenter', handleMouseEnter)
        card.addEventListener('mouseleave', handleMouseLeave)
        
        eventHandlers.push({ card, handleMouseEnter, handleMouseLeave })
      })

      // Cleanup function
      return () => {
        titleAnimation?.kill()
        subtitleAnimation?.kill()
        cardsAnimation?.kill()
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === titleRef.current || 
              trigger.vars.trigger === subtitleRef.current ||
              trigger.vars.trigger === cardsRef.current) {
            trigger.kill()
          }
        })
        eventHandlers.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
          card.removeEventListener('mouseenter', handleMouseEnter)
          card.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    } else {
      return () => {
        titleAnimation?.kill()
        subtitleAnimation?.kill()
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === titleRef.current || 
              trigger.vars.trigger === subtitleRef.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="servicios" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0A2240] tracking-tight"
            style={{ opacity: 1, visibility: 'visible' }}
          >
            {t('servicios.title')}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B0161F] mr-3"></div>
            <p 
              ref={subtitleRef} 
              className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-medium"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              {t('servicios.subtitle')}
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B0161F] ml-3"></div>
          </div>
        </div>

        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ opacity: 1, visibility: 'visible' }}
        >
          {servicios.map((servicio, index) => (
            <article
              key={index}
              className={`bg-gradient-to-br ${servicio.color} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
            >
              {/* Efecto de brillo al hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="mb-5 overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={servicio.image} 
                    alt={`${t(`servicios.items.${servicio.titleKey}.title`)} - SUDEST LOGÍSTICA`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                  {t(`servicios.items.${servicio.titleKey}.title`)}
                </h3>
                <p className="text-gray-200 leading-relaxed text-sm md:text-base group-hover:text-white transition-colors">
                  {t(`servicios.items.${servicio.titleKey}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Servicios
