import { MessageCircle, MapPin, Clock3, ShieldCheck, Leaf } from 'lucide-react'
import contactImg from '../assets/contenido2.jpeg'

const contactInfo = [
  {
    icon: MapPin,
    text: "O'Higgins de Pilay",
  },
  {
    icon: Clock3,
    text: 'Lunes a Sábado, 09:00 - 18:00 hrs',
  },
]

export default function Contact() {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola Alma de Granja! Me gustaría hacer un pedido 🌿')
    window.open(`https://wa.me/56958086762?text=${msg}`, '_blank')
  }

  return (
    <section
      id="contacto"
      className="py-20 sm:py-28 lg:py-32 bg-[color:var(--bg-primary)] text-[color:var(--text-light)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="group rounded-[2rem] sm:rounded-[2.25rem] overflow-hidden min-h-[340px] sm:min-h-[420px] lg:min-h-[560px] shadow-[0_20px_60px_rgba(0,0,0,0.32)] animate-[contactFadeIn_0.85s_ease-out_forwards]">
            <img
              src={contactImg}
              alt="Tabla gourmet y productos del campo"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>

          <div className="relative rounded-[2rem] sm:rounded-[2.25rem] border border-white/15 bg-[linear-gradient(135deg,rgba(34,49,34,0.90),rgba(60,75,45,0.85))] p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.36)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_78px_rgba(0,0,0,0.38)] animate-[contactFadeIn_0.95s_ease-out_forwards]">
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_20%_10%,rgba(196,163,90,0.15),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(90,120,70,0.24),transparent_55%)]" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C4A35A]/35 bg-[#1f2b1f]/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#D8C4A0] mb-5">
                <Leaf size={14} />
                Contacto
              </span>

              <h2 className="font-heading font-bold text-4xl sm:text-5xl leading-[1.05] mb-6">
                <span className="block text-white">Conversemos</span>
                <span className="block text-[#C4A35A]">tu pedido</span>
              </h2>

              <div className="mb-6 sm:mb-7 flex items-center gap-3 text-[#C4A35A]/85">
                <span className="h-px w-16 sm:w-20 bg-[#C4A35A]/55" />
                <Leaf size={15} />
              </div>

              <p className="text-[15px] sm:text-base leading-relaxed text-[color:var(--text-light)]/85 max-w-xl mb-7 sm:mb-8">
                Estamos aquí para ayudarte a elegir los mejores productos del campo y resolver tus dudas con una atención cálida y personalizada.
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 sm:gap-4">
                    <span className="mt-0.5 shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#D8C4A0]">
                      <Icon size={18} />
                    </span>
                    <p className="text-base sm:text-[1.05rem] leading-snug text-[color:var(--text-light)]/92">{text}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={openWhatsApp}
                className="w-full inline-flex items-center justify-center gap-3 bg-[color:var(--whatsapp)] hover:bg-[color:var(--whatsapp-hover)] text-white px-6 py-4 rounded-full font-semibold text-lg shadow-[0_10px_30px_rgba(37,211,102,0.28)] hover:shadow-[0_16px_36px_rgba(37,211,102,0.36)] transition-all duration-300 hover:scale-[1.01]"
              >
                <MessageCircle size={21} />
                Hablar por WhatsApp
              </button>

              <p className="mt-4 inline-flex items-center gap-2 text-sm text-[color:var(--text-light)]/75">
                <ShieldCheck size={16} className="text-[color:var(--whatsapp)]" />
                Respondemos rápido y de forma segura
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
