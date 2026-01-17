import Header from './components/Header'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Beneficios from './components/Beneficios'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Beneficios />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
