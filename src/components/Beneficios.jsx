import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

function Beneficios() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const itemsRef = useRef(null)

  const beneficios = [
    { key: 'experiencia' },
    { key: 'vigilancia' },
    { key: 'flota' },
    { key: 'personal' },
    { key: 'ubicacion' },
    { key: 'servicio' }
  ]

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.opacity = '1'
      titleRef.current.style.visibility = 'visible'
    }
    if (itemsRef.current?.children) {
      Array.from(itemsRef.current.children).forEach(item => {
        if (item instanceof HTMLElement) {
          item.style.opacity = '1'
          item.style.visibility = 'visible'
        }
      })
    }

    if (titleRef.current) {
      gsap.fromTo(titleRef.current, {
        y: -30
      }, {
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        immediateRender: false
      })
    }

    if (itemsRef.current?.children) {
      gsap.fromTo(Array.from(itemsRef.current.children), {
        y: 50
      }, {
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: itemsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        immediateRender: false
      })
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="beneficios" 
      className="py-24 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0A2240] tracking-tight"
            style={{ opacity: 1, visibility: 'visible' }}
          >
            {t('beneficios.title')}
          </h2>
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B0161F] mr-3"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              {t('beneficios.subtitle')}
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B0161F] ml-3"></div>
          </div>
        </div>

        <div 
          ref={itemsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ opacity: 1, visibility: 'visible' }}
        >
          {beneficios.map((beneficio, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#F7961D]/30 relative overflow-hidden"
            >
              {/* Efecto de fondo al hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7961D]/5 to-[#B0161F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-[#B0161F] to-[#F7961D] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#0A2240] mb-4 group-hover:text-[#B0161F] transition-colors">
                  {t(`beneficios.items.${beneficio.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base group-hover:text-gray-700 transition-colors">
                  {t(`beneficios.items.${beneficio.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Beneficios
