import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '56990861197'
const INSTAGRAM_URL = 'https://www.instagram.com/almadegranja.cl/'

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13.4 21V12.8H16l.4-3.1h-3V7.8c0-.9.2-1.6 1.5-1.6h1.6V3.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.8v2.6H8.3v3.1h2.4V21h2.7z"
        fill="currentColor"
      />
    </svg>
  )
}

const socialButtons = [
  {
    id: 'whatsapp',
    label: 'Abrir WhatsApp de Alma de Granja',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: MessageCircle,
    className:
      'bg-green-600 text-white shadow-[0_10px_28px_rgba(15,118,110,0.35)] hover:bg-green-700 focus-visible:ring-green-500',
  },
  {
    id: 'instagram',
    label: 'Abrir Instagram de Alma de Granja',
    href: INSTAGRAM_URL,
    icon: InstagramIcon,
    className:
      'bg-gradient-to-br from-fuchsia-500 via-rose-500 to-orange-400 text-white shadow-[0_10px_28px_rgba(219,39,119,0.3)] hover:brightness-110 focus-visible:ring-rose-400',
  },
]

export default function FloatingSocialButtons() {
  return (
    <div
      className="fixed right-4 sm:right-6 bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] sm:bottom-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] z-40 animate-[floatingSocialIn_500ms_ease-out]"
      aria-label="Redes sociales"
    >
      <div className="flex flex-col gap-3 rounded-3xl bg-white/85 backdrop-blur-md border border-white/60 p-2.5 shadow-[0_14px_42px_rgba(0,0,0,0.16)]">
        {socialButtons.map(({ id, label, href, icon: Icon, className }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
          >
            <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        ))}

        <button
          type="button"
          aria-label="Facebook próximamente"
          disabled
          className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 border border-slate-300/80 cursor-not-allowed opacity-75"
          title="Próximamente"
        >
          <FacebookIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
