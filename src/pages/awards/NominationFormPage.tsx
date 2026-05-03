import NominationHero from "./NominationHero";
import NominationForm from "./NominationForm";
import NominationSidebar from "./NominationSidebar";

const NominationFormPage = () => (
  <div className="min-h-screen bg-[#f4f7f9]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

    {/* Hero */}
    <NominationHero />

    {/* Main Content */}
    <section id="nomination-form" className="py-6">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* Left — Form */}
          <div className="flex-1 min-w-0">
            <NominationForm />
          </div>

          {/* Right — Sidebar sticky */}
          <div className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-4">
            <NominationSidebar />
          </div>

        </div>
      </div>
    </section>

    {/* Footer strip */}
    <div className="border-t border-slate-200 py-6 text-center">
      <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-widest">
        9th IHWE • Namo Gange Global Health Excellence Awards 2026
      </p>
    </div>

  </div>
);

export default NominationFormPage;
