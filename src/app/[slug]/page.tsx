import Nav from '@/components/nav'
import Footer from '@/components/footer'
import RequestAccess from '@/components/waitlist'
import BuiltFor from '@/components/built-for'

// This dynamic page catches all feature sub-pages and renders a gorgeous Bolto/Shapes layout for them.
export default function FeaturePage({ params }: { params: { slug: string } }) {
  // Format slug to nice title: "people-directory" -> "People Directory"
  const formattedTitle = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      <Nav />
      
      <main className="pt-40 pb-20">
        <section className="px-6 text-center max-w-[1000px] mx-auto mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAFAF9] border border-gray-200 mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
              Platform Feature
            </span>
          </div>

          <h1 className="text-[clamp(44px,6vw,72px)] font-medium tracking-tight text-[#1A1611] mb-6 leading-[1.05] text-balance">
            {formattedTitle}
            <br/>
            <span className="font-serif italic font-normal text-[#B08D57]">on autopilot.</span>
          </h1>

          <p className="text-[clamp(18px,2.5vw,21px)] text-[#57534E] mb-10 max-w-[600px] mx-auto leading-relaxed text-balance">
            Forget manual updates and fragmented systems. MambaHR unifies {formattedTitle.toLowerCase()} into one intelligent, self-driving platform.
          </p>

          <a href="#request-access" className="inline-flex items-center justify-center bg-[#1C1917] text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg">
            Get a demo
          </a>
        </section>

        {/* Massive Bolto-style Feature Image Container */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32">
          <div className="w-full aspect-[16/9] bg-[#FAFAF9] rounded-[40px] border border-gray-100 overflow-hidden shadow-sm relative flex items-center justify-center p-8 md:p-16">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              {/* Fallback beautiful image representing the feature */}
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                alt={formattedTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
            
            {/* Overlay CSS Mockup */}
            <div className="absolute bottom-[-10%] md:bottom-10 right-[-5%] md:right-10 bg-white rounded-xl shadow-2xl p-6 border border-gray-100 max-w-sm">
               <div className="text-xl font-semibold mb-2">Automated {formattedTitle}</div>
               <div className="text-sm text-gray-500">Mamba's AI engine is actively managing this workflow in the background.</div>
            </div>
          </div>
        </section>

        <BuiltFor />
        <RequestAccess />
      </main>

      <Footer />
    </div>
  )
}
