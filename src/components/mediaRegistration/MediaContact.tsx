import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import contactimage from '../../assets/contact.webp';

const MediaContact = () => {
  // 1. Initialize state for form fields
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: ''
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted Successfully:', formData);
    // You can add your API logic here
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
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address" 
                required
                className="w-full bg-[#001f4d]/50 border border-white/20 rounded-md p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#2ecc71] transition-colors"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="md:col-span-1">
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number" 
                className="w-full bg-[#001f4d]/50 border border-white/20 rounded-md p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#2ecc71] transition-colors"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="md:col-span-2">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Your Message" 
                className="w-full bg-[#001f4d]/50 border border-white/20 rounded-md p-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#2ecc71] transition-colors resize-none"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2 flex justify-start">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-gradient-to-r from-[#27ae60] to-[#48c9b0] text-white px-12 py-3 rounded-lg font-bold uppercase text-sm tracking-wide shadow-lg"
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