import galleryMain from "../assets/gallerymain.jpg"
import gallery_card_1 from "../assets/gallery_card_1.jpeg"
import gallery_card_2 from "../assets/gallery-card-2.PNG"
import ScrollAnimation from './ScrollAnimation.jsx'

export default function Gallery() {
  return (
    <section className="py-24 sm:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="inline-block text-olive-600 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
              Nuestro mundo
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">
              Del campo a tu mesa
            </h2>
            <p className="text-dark-light/70 text-lg max-w-2xl mx-auto">
              Un vistazo a nuestro origen, nuestros productos y la dedicación que ponemos en cada detalle.
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-4 sm:space-y-6">
          {/* Top: 1 large rectangular image */}
          <ScrollAnimation>
            <div className="aspect-[21/9] rounded-3xl overflow-hidden">
              <img
                src={galleryMain}
                alt="Paisaje del campo chileno al atardecer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </ScrollAnimation>

          {/* Bottom: 2 square images side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <ScrollAnimation delay={100}>
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src={gallery_card_1}
                  alt="Productos frescos artesanales"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src={gallery_card_2}
                  alt="Mesa con productos naturales del campo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
