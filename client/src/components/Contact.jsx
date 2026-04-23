import { MessageCircle, MapPin, Clock3, Mail } from 'lucide-react'
import contactImg from '../assets/gallerymain.jpg'

export default function Contact() {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola Alma de Granja! Me gustaría hacer un pedido 🌿')
    window.open(`https://wa.me/56958086762?text=${msg}`, '_blank')
  }

  return (
    <section id="contacto" className="py-24 sm:py-32 bg-[color:var(--bg-dark)] text-[color:var(--text-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="rounded-3xl overflow-hidden min-h-[320px]">
            <img src={contactImg} alt="Campo y entorno Alma de Granja" className="w-full h-full object-cover" />
          </div>

          <div className="rounded-3xl border border-white/15 bg-[color:var(--bg-dark-soft)]/40 p-8 sm:p-10 backdrop-blur-sm">
            <span className="inline-block text-[color:var(--accent-soft)] text-sm font-semibold uppercase tracking-[0.15em] mb-3">Contacto</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-6">Conversemos tu pedido</h2>

            <div className="space-y-4 text-[color:var(--text-light)]/85 mb-8">
              <p className="flex gap-3"><MapPin size={18} className="mt-1 text-[color:var(--accent)]" /> Fundo El Milagro S/N, San Francisco de Mostazal, Región de O’Higgins</p>
              <p className="flex gap-3"><Clock3 size={18} className="mt-1 text-[color:var(--accent)]" /> Lunes a Sábado, 09:00 - 18:00 hrs</p>
              <p className="flex gap-3"><Mail size={18} className="mt-1 text-[color:var(--accent)]" /> hola@almadegranja.cl</p>
            </div>

            <button onClick={openWhatsApp} className="inline-flex items-center gap-3 bg-[color:var(--whatsapp)] hover:bg-[color:var(--whatsapp-hover)] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              <MessageCircle size={21} />
              Hablar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
