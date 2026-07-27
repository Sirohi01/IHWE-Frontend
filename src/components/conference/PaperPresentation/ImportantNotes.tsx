// ImportantNotes.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/lib/api";
import { Megaphone, ClipboardCheck, CheckCircle2 } from "lucide-react";

const ImportantNotes: React.FC = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/paper-presentation`);
        if (res.data.success && res.data.data && res.data.data.importantNotes) {
          setNotes(res.data.data.importantNotes);
        }
      } catch (error) {
        console.error("Error fetching paper presentation data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full">
      <div className="px-5 sm:px-6 lg:px-14">
        <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#eefaf2] to-[#f4fdf6] border border-[#d1f0db]">

          <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block opacity-60">
            <Megaphone size={40} className="text-[#39a936]" strokeWidth={1.5} />
          </div>

          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:block opacity-60">
            <ClipboardCheck size={48} className="text-[#39a936]" strokeWidth={1.5} />
          </div>

          <div className="relative z-10 flex items-center px-5 py-2 md:px-24">
            <div className="w-full mx-auto md:mx-0">
              <h3 className="mb-2 text-[13px] font-bold tracking-wide text-[#1B1B1B] uppercase">
                Important Notes
                <div className="mt-1 h-[2px] w-8 rounded-full bg-[#39a936]" />
              </h3>

              <ul className="space-y-1.5 text-[12px] text-gray-700">
                {notes.map((note, index) => (
                  <li key={index} className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={14} className="shrink-0 text-[#39a936]" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantNotes;