// ImportantNotes.tsx

import React from "react";

const ImportantNotes: React.FC = () => {
  return (
    <section className="w-full py-6">
      <div className="mx-auto w-full max-w-[1320px] px-4 lg:px-0">
        <div
          className="relative min-h-[120px] w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/important-notes-bg.png')",
          }}
        >
          {/* Content */}
          <div className="relative z-10 flex min-h-[120px] items-center px-6 py-5 md:px-12">
            <div className="max-w-[650px]">

              <h3 className="mb-3 text-[18px] font-semibold tracking-wide text-[#111827]">
                IMPORTANT NOTES
              </h3>

              <ul className="space-y-2 text-[14px] leading-[20px] text-[#374151]">
                <li className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#111827]" />
                  Only registered participants are eligible to present their papers.
                </li>

                <li className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#111827]" />
                  Each presenter will get 10–12 minutes for presentation followed by Q&A.
                </li>

                <li className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#111827]" />
                  Certificates will be provided to all presenting authors.
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantNotes;