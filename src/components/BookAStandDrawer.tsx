import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, User, Building2, Briefcase, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BookAStandDrawerProps {
  open: boolean;
  onClose: () => void;
}

const sectors = [
  "Disposables", "Healthcare Infrastructure", "Imaging & Diagnostics",
  "Medical Equipment", "IT Systems", "Laboratory", "Pharma/Nutrition",
];

const BookAStandDrawer = ({ open, onClose }: BookAStandDrawerProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = "rounded-none border-slate-200 h-10 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all font-inter text-sm";
  const labelClasses = "text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block font-inter";

  // SVG Path Animation Variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.5 }, opacity: { duration: 0.3, delay: 0.5 } }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-lg bg-[#F7F8F0] z-[101] shadow-2xl flex flex-col font-inter"
          >
            {/* Header - Reduced Height */}
            <div className="relative py-4 px-8 bg-white border-b border-slate-100 flex flex-col items-center">
              <button
                onClick={onClose}
                className="absolute top-3 right-4 p-2 rounded-full bg-slate-50 hover:bg-[#23471d]/5 hover:text-[#23471d] transition-all group lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center gap-1 w-full">
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-px w-6 bg-[#23471d]" />
                  <span className="text-[10px] font-bold text-[#23471d] uppercase tracking-[0.4em]">Registration</span>
                  <div className="h-px w-6 bg-[#23471d]" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center relative px-6">
                  BOOK A{" "}
                  <span className="text-[#d26019] relative inline-block">
                    STAND
                    <motion.svg
                      className="absolute -bottom-2.5 left-0 w-full h-2.5 text-[#23471d]"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.path
                        d="M2 10C60 2, 140 2, 198 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        variants={pathVariants}
                      />
                    </motion.svg>
                  </span>
                </h2>

                <button
                  onClick={onClose}
                  className="absolute top-6 right-8 p-2 rounded-full hover:bg-slate-50 transition-colors hidden lg:block"
                >
                  <X className="w-6 h-6 text-slate-400 hover:text-[#23471d]" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-16 h-16 bg-[#23471d]/10 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-[#23471d]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Success!</h3>
                  <p className="text-slate-600 mb-6 max-w-xs leading-relaxed text-sm">
                    Your exhibitor registration has been received. Our team will contact you shortly to finalize your stand.
                  </p>
                  <Button
                    onClick={() => { setSubmitted(false); onClose(); }}
                    className="h-11 px-8 rounded-none bg-[#23471d] hover:bg-[#d26019] text-white font-bold transition-all shadow-lg shadow-[#23471d]/20"
                  >
                    Close Registration
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-7">

                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                      <User className="w-4 h-4 text-[#d26019]" />
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#23471d]">Personal Information</h4>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Label className={labelClasses}>Title</Label>
                        <Select>
                          <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder="Title" />
                          </SelectTrigger>
                          <SelectContent>
                            {["Mr", "Ms", "Mrs", "Dr", "Prof"].map(t => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label className={labelClasses}>First Name</Label>
                        <Input required placeholder="E.g. John" className={inputClasses} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className={labelClasses}>Last Name</Label>
                        <Input required placeholder="E.g. Doe" className={inputClasses} />
                      </div>
                      <div>
                        <Label className={labelClasses}>Email Address</Label>
                        <Input type="email" required placeholder="john@company.com" className={inputClasses} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Label className={labelClasses}>Code</Label>
                        <Input placeholder="+971" className={inputClasses} />
                      </div>
                      <div className="col-span-2">
                        <Label className={labelClasses}>Mobile Number</Label>
                        <Input required placeholder="50 123 4567" className={inputClasses} />
                      </div>
                    </div>
                  </div>

                  {/* Company Details Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                      <Building2 className="w-4 h-4 text-[#d26019]" />
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#23471d]">Company Details</h4>
                    </div>

                    <div>
                      <Label className={labelClasses}>Company Name</Label>
                      <Input required placeholder="International Health Group" className={inputClasses} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className={labelClasses}>Job Title</Label>
                        <Input placeholder="E.g. Director" className={inputClasses} />
                      </div>
                      <div>
                        <Label className={labelClasses}>Department</Label>
                        <Input placeholder="E.g. Marketing" className={inputClasses} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className={labelClasses}>Country</Label>
                        <Input required placeholder="United Arab Emirates" className={inputClasses} />
                      </div>
                      <div>
                        <Label className={labelClasses}>City</Label>
                        <Input placeholder="Dubai" className={inputClasses} />
                      </div>
                    </div>
                  </div>

                  {/* Exhibition Interest Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                      <Briefcase className="w-4 h-4 text-[#d26019]" />
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#23471d]">Exhibition Interest</h4>
                    </div>

                    <div>
                      <Label className={labelClasses}>Primary Sector of Interest</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {sectors.map(s => (
                          <label key={s} className="flex items-center gap-2.5 p-2 bg-white border border-slate-100 hover:border-[#23471d]/20 transition-all cursor-pointer group shadow-sm">
                            <Checkbox className="rounded-none data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                            <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#23471d]">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className={labelClasses}>Space Requirement</Label>
                      <RadioGroup defaultValue="9" className="grid grid-cols-3 gap-3 mt-2">
                        {[["9", "9 sqm"], ["12", "12 sqm"], ["18", "18+ sqm"]].map(([v, l]) => (
                          <label key={v} className="flex items-center justify-center p-2 bg-white border border-slate-100 hover:border-[#23471d]/20 transition-all cursor-pointer group has-[:checked]:bg-[#23471d]/5 has-[:checked]:border-[#23471d] shadow-sm">
                            <RadioGroupItem value={v} className="sr-only" />
                            <span className="text-[11px] font-bold text-slate-500 group-hover:text-[#23471d] has-[:checked]:text-[#23471d]">{l}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className={labelClasses}>Additional Comments</Label>
                      <Textarea placeholder="Tell us more about your exhibition needs..." rows={3} className="rounded-none border-slate-200 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all font-inter text-sm" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 py-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <Checkbox required className="mt-1 rounded-none data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                      <span className="text-[11px] text-slate-500 leading-normal font-medium">
                        I agree to the <span className="text-[#23471d] font-bold hover:underline cursor-pointer">Terms & Conditions</span> of IHWE 2026.
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="h-12 rounded-none bg-[#23471d] hover:bg-[#d26019] text-white font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#23471d]/20 flex items-center justify-center gap-3 mb-6 group"
                  >
                    Submit Registration <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookAStandDrawer;
