import { MessageCircle, MapPin, Clock, Shield } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

export default function Contact() {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola Alma de Granja! Me gustaría hacer un pedido 🌿')
    window.open(`https://wa.me/56990861197?text=${msg}`, '_blank')
  }

  return (
    <section id="contacto" className="py-24 sm:py-32 bg-olive-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <ScrollAnimation>
            <span className="inline-block text-olive-300 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
              Contáctanos
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              ¿Listo para probar lo mejor del campo?
            </h2>
            <p className="text-olive-200 text-lg leading-relaxed mb-8">
              Escríbenos por WhatsApp y te ayudaremos con tu pedido. Nuestro equipo te 
              confirmará disponibilidad, pago y despacho de forma rápida y personalizada.
            </p>
            <button
              onClick={openWhatsApp}
              className="group inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-green-900/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle size={22} className="transition-transform group-hover:scale-110" />
              Escribir por WhatsApp
            </button>
          </ScrollAnimation>

          {/* Right */}
          <div className="space-y-6">
            <ScrollAnimation delay={100}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-gold-400" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-lg mb-2">Zonas de despacho</h3>
                    <p className="text-olive-200 leading-relaxed">
                      Rancagua · Machalí · Graneros · San Francisco de Mostazal
                    </p>
                    <p className="text-gold-400 text-sm font-medium mt-2">
                      Despacho gratis en compras sobre $20.000
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="text-gold-400" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-lg mb-2">Horario de atención</h3>
                    <p className="text-olive-200 leading-relaxed">
                      Lunes a Sábado: 9:00 — 20:00<br />
                      Domingos: 10:00 — 14:00
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="text-gold-400" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-lg mb-2">Compra segura</h3>
                    <p className="text-olive-200 leading-relaxed">
                      Tu pedido es confirmado personalmente por nuestro equipo. 
                      Coordinamos pago y despacho para que recibas todo perfecto.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
