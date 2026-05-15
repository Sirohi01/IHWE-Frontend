import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import contactimage from '../../assets/contact.webp';
import { mediaRegistrationApi, otpApi } from '@/lib/api';
import { toast } from "sonner";
import { CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';


const MediaContact = () => {
  // 1. Initialize state for form fields
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: ''
  });

  // OTP State
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [emailOtpValue, setEmailOtpValue] = useState("");
  const [emailResendTimer, setEmailResendTimer] = useState(0);

  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [mobileOtpValue, setMobileOtpValue] = useState("");
  const [mobileResendTimer, setMobileResendTimer] = useState(0);

  const [isVerifying, setIsVerifying] = useState({ email: false, mobile: false });

  // Timers Effect
  React.useEffect(() => {
    let eTimer: any, mTimer: any;
    if (emailResendTimer > 0) eTimer = setInterval(() => setEmailResendTimer(p => p - 1), 1000);
    if (mobileResendTimer > 0) mTimer = setInterval(() => setMobileResendTimer(p => p - 1), 1000);
    return () => { clearInterval(eTimer); clearInterval(mTimer); };
  }, [emailResendTimer, mobileResendTimer]);

  // OTP Handlers
  const requestOtp = async (type: 'email' | 'mobile') => {
    const identifier = type === 'email' ? formData.email : formData.phone;
    if (!identifier) return toast.error(`Please enter a valid ${type}`);
    if (type === 'mobile' && identifier.length !== 10) return toast.error("Please enter a valid 10-digit mobile number");
    if (type === 'email' && !identifier.includes('@')) return toast.error("Please enter a valid email address");

    setIsVerifying(p => ({ ...p, [type]: true }));
    try {
      const res = await otpApi.request(identifier, type === 'email' ? 'email' : 'phone', formData.name || "Media PR Lead");
      if (res.success) {
        toast.success(`OTP sent to your ${type}`);
        type === 'email' ? setEmailOtpSent(true) : setMobileOtpSent(true);
        type === 'email' ? setEmailResendTimer(60) : setMobileResendTimer(60);
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setIsVerifying(p => ({ ...p, [type]: false }));
    }
  };

  const verifyOtp = async (type: 'email' | 'mobile') => {
    const identifier = type === 'email' ? formData.email : formData.phone;
    const otp = type === 'email' ? emailOtpValue : mobileOtpValue;
    if (!otp) return toast.error("Please enter OTP");

    setIsVerifying(p => ({ ...p, [type]: true }));
    try {
      const res = await otpApi.verify(identifier, otp, type === 'email' ? 'email' : 'phone');
      if (res.success) {
        toast.success(`${type.toUpperCase()} verified successfully!`);
        type === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
      } else {
        toast.error(res.message || "Invalid OTP");
      }
    } catch (e) {
      toast.error("Verification error");
    } finally {
      setIsVerifying(p => ({ ...p, [type]: false }));
    }
  };

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOtpVerified) return toast.error("Please verify your email address via OTP first");
    if (!mobileOtpVerified) return toast.error("Please verify your mobile number via OTP first");

    try {
        const response = await mediaRegistrationApi.submitEnquiry(formData);
        if (response.success) {
            toast.success("Message sent successfully!");
            setFormData({
                name: '',
                organization: '',
                email: '',
                phone: '',
                message: ''
            });
            setEmailOtpSent(false);
            setEmailOtpVerified(false);
            setEmailOtpValue("");
            setMobileOtpSent(false);
            setMobileOtpVerified(false);
            setMobileOtpValue("");
        } else {
            toast.error(response.message || "Failed to send message");
        }
    } catch (error) {
        toast.error("Something went wrong. Please try again later.");
        console.error("Submission error:", error);
    }
  };


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="w-full py-4 px-4 flex justify-center font-sans" >
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full max-w-[1400px] flex flex-wrap lg:p-8 p-4 rounded-xl"
        style={{ backgroundImage: `url(${contactimage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Left Section: Media Enquiries (referencing image_a04ae1.png) */}
        <div className="flex-1 space-y-8 z-10 w-full md:w-[60%]">
          <motion.div variants={itemVariants}>
            <h2 className="text-[#2ecc71] font-bold text-sm tracking-widest uppercase mb-4">
              Media Enquiries
            </h2>
            <p className="text-gray-300 text-lg max-w-sm">
              For media partnerships, interviews, accreditation and press passes.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-2 border border-[#2ecc71]/30 rounded-md group-hover:bg-[#2ecc71]/10 transition-colors">
                <Mail className="w-5 h-5 text-[#2ecc71]" />
              </div>
              <span className="text-white font-medium">media@ihwe.in</span>
            </div>
            
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-2 border border-[#2ecc71]/30 rounded-md group-hover:bg-[#2ecc71]/10 transition-colors">
                <Phone className="w-5 h-5 text-[#2ecc71]" />
              </div>
              <span className="text-white font-medium">+91 88600 12345</span>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 bg-gradient-to-r from-[#27ae60] to-[#2ecc71] text-white px-8 py-4 rounded-lg font-bold uppercase text-sm tracking-wide shadow-lg shadow-[#2ecc71]/20"
          >
            Media Accreditation <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Right Section: Contact Form */}
        <div className="flex-1 z-10 w-full md:w-[40%]">
          <motion.h2 
            variants={itemVariants}
            className="text-white font-bold text-xl uppercase mb-4 tracking-wide"
          >
            Contact Our PR Team
          </motion.h2>

          {/* 4. Attached handleSubmit to form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="md:col-span-1">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name" 
                required
                className="w-full bg-[#001f4d]/50 border border-white/20 rounded-md p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#2ecc71] transition-colors"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="md:col-span-1">
              <input 
                type="text" 
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Media Organization" 
                className="w-full bg-[#001f4d]/50 border border-white/20 rounded-md p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#2ecc71] transition-colors"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={emailOtpVerified || emailOtpSent}
                  placeholder="Email Address" 
                  required
                  className={`w-full bg-[#001f4d]/50 border ${emailOtpVerified ? 'border-green-500/50 text-green-400' : 'border-white/20'} rounded-md p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#2ecc71] transition-colors pr-24`}
                />
                {!emailOtpVerified && (
                  <button 
                    type="button" 
                    onClick={() => requestOtp('email')} 
                    disabled={isVerifying.email || !formData.email.includes('@') || emailResendTimer > 0} 
                    className="absolute right-2 px-3 py-2 bg-[#2ecc71] text-white text-[10px] font-bold rounded hover:bg-[#27ae60] disabled:bg-gray-600 transition-all"
                  >
                    {isVerifying.email ? "..." : emailResendTimer > 0 ? `${emailResendTimer}s` : emailOtpSent ? "RE-SEND" : "GET OTP"}
                  </button>
                )}
                {emailOtpVerified && <CheckCircle size={18} className="absolute right-4 text-green-500" />}
              </div>
              {emailOtpSent && !emailOtpVerified && (
                <div className="mt-2 flex gap-2">
                  <input 
                    placeholder="OTP" 
                    value={emailOtpValue} 
                    onChange={(e) => setEmailOtpValue(e.target.value)} 
                    maxLength={6} 
                    className="w-24 bg-[#001f4d]/50 border border-[#2ecc71]/30 rounded p-2 text-white text-center tracking-widest font-bold outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={() => verifyOtp('email')} 
                    disabled={isVerifying.email || emailOtpValue.length < 4} 
                    className="bg-[#2ecc71] text-white px-4 py-2 rounded text-[10px] font-bold hover:bg-[#27ae60] transition-all"
                  >
                    VERIFY
                  </button>
                </div>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className="relative flex items-center">
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={mobileOtpVerified || mobileOtpSent}
                  placeholder="Phone Number" 
                  required
                  className={`w-full bg-[#001f4d]/50 border ${mobileOtpVerified ? 'border-green-500/50 text-green-400' : 'border-white/20'} rounded-md p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#2ecc71] transition-colors pr-24`}
                />
                {!mobileOtpVerified && (
                  <button 
                    type="button" 
                    onClick={() => requestOtp('mobile')} 
                    disabled={isVerifying.mobile || formData.phone.length < 10 || mobileResendTimer > 0} 
                    className="absolute right-2 px-3 py-2 bg-[#2ecc71] text-white text-[10px] font-bold rounded hover:bg-[#27ae60] disabled:bg-gray-600 transition-all"
                  >
                    {isVerifying.mobile ? "..." : mobileResendTimer > 0 ? `${mobileResendTimer}s` : mobileOtpSent ? "RE-SEND" : "GET OTP"}
                  </button>
                )}
                {mobileOtpVerified && <CheckCircle size={18} className="absolute right-4 text-green-500" />}
              </div>
              {mobileOtpSent && !mobileOtpVerified && (
                <div className="mt-2 flex gap-2">
                  <input 
                    placeholder="OTP" 
                    value={mobileOtpValue} 
                    onChange={(e) => setMobileOtpValue(e.target.value)} 
                    maxLength={6} 
                    className="w-24 bg-[#001f4d]/50 border border-[#2ecc71]/30 rounded p-2 text-white text-center tracking-widest font-bold outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={() => verifyOtp('mobile')} 
                    disabled={isVerifying.mobile || mobileOtpValue.length < 4} 
                    className="bg-[#2ecc71] text-white px-4 py-2 rounded text-[10px] font-bold hover:bg-[#27ae60] transition-all"
                  >
                    VERIFY
                  </button>
                </div>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="md:col-span-2">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Your Message" 
                className="w-full bg-[#001f4d]/50 border border-white/20 rounded-md p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#2ecc71] transition-colors resize-none"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2 flex justify-start">
              <motion.button
                type="submit"
                disabled={!emailOtpVerified || !mobileOtpVerified}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 bg-gradient-to-r from-[#27ae60] to-[#48c9b0] text-white px-12 py-3 rounded-lg font-bold uppercase text-sm tracking-wide shadow-lg ${(!emailOtpVerified || !mobileOtpVerified) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Send Message <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MediaContact;