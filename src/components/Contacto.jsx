import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

function Contacto() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)

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
    if (infoRef.current?.children) {
      Array.from(infoRef.current.children).forEach(child => {
        if (child instanceof HTMLElement) {
          child.style.opacity = '1'
          child.style.visibility = 'visible'
        }
      })
    }
    if (formRef.current?.children) {
      Array.from(formRef.current.children).forEach(child => {
        if (child instanceof HTMLElement) {
          child.style.opacity = '1'
          child.style.visibility = 'visible'
        }
      })
    }

    // Animación del título - solo posición
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, {
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
      })
    }

    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current, {
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
      })
    }

    // Animación del formulario e información - solo posición
    if (infoRef.current?.children) {
      gsap.fromTo(Array.from(infoRef.current.children), {
        x: -50
      }, {
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        immediateRender: false
      })
    }

    if (formRef.current?.children) {
      gsap.fromTo(Array.from(formRef.current.children), {
        x: 50
      }, {
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        immediateRender: false
      })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Animación de éxito
    const button = e.target.querySelector('button[type="submit"]')
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })
    
    // Aquí puedes agregar la lógica de envío del formulario
    alert(t('contacto.success'))
  }

  return (
    <section 
      ref={sectionRef}
      id="contacto" 
      className="py-24 bg-gradient-to-br from-[#0A2240] via-[#0d2d4f] to-[#0A2240] text-white relative overflow-hidden"
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B0161F] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F7961D] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              {t('contacto.title')}
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#F7961D] mr-3"></div>
              <p 
                ref={subtitleRef} 
                className="text-lg md:text-xl text-gray-200 font-medium"
                style={{ opacity: 1, visibility: 'visible' }}
              >
                {t('contacto.subtitle')}
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#F7961D] ml-3"></div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div 
                ref={infoRef}
                style={{ opacity: 1, visibility: 'visible' }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {t('contacto.infoTitle')}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#F7961D] p-3 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-white mb-1">{t('contacto.direccion')}</h4>
                      <address className="text-gray-200 not-italic" dangerouslySetInnerHTML={{ __html: t('contacto.direccionValue') }}></address>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#B0161F] p-3 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-white mb-1">{t('contacto.telefono')}</h4>
                      <p className="text-gray-200">
                        {t('contacto.telefonoValue')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#0A2240] p-3 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-white mb-1">{t('contacto.horario')}</h4>
                      <p className="text-gray-200" dangerouslySetInnerHTML={{ __html: t('contacto.horarioValue') }}></p>
                    </div>
                  </div>
                  
                  {/* Botón de WhatsApp */}
                  <div className="pt-4">
                    <a
                      href="https://wa.me/34XXXXXXXXX?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20servicios%20logísticos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center space-x-3 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.984-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>{t('contacto.whatsapp')}</span>
                    </a>
                    <p className="text-center text-gray-300 text-sm mt-2">{t('contacto.whatsappDescription')}</p>
                  </div>
                </div>
              </div>

              <div 
                ref={formRef}
                style={{ opacity: 1, visibility: 'visible' }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {t('contacto.formTitle')}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-gray-200 mb-2">
                      {t('contacto.nombre')}
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7961D] focus:border-[#F7961D] text-white placeholder-gray-400 transition-all"
                      placeholder={t('contacto.nombrePlaceholder')}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                      {t('contacto.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7961D] focus:border-[#F7961D] text-white placeholder-gray-400 transition-all"
                      placeholder={t('contacto.emailPlaceholder')}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-200 mb-2">
                      {t('contacto.mensaje')}
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows="5"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7961D] focus:border-[#F7961D] text-white placeholder-gray-400 transition-all resize-none"
                      placeholder={t('contacto.mensajePlaceholder')}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full bg-gradient-to-r from-[#B0161F] to-[#F7961D] text-white px-8 py-4 rounded-lg font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                  >
                    <span className="relative z-10">{t('contacto.enviar')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F7961D] to-[#B0161F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
