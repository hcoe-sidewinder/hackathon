"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#134E5E] to-[#71C9CE] text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Taking One Green Step At A Time
        </motion.h1>
        <motion.p
          className="text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Take your First Green Paila with us and become a part of an innovative
          energy credit sharing system. Lead the way in corporate environmental
          responsibility.
        </motion.p>
        <motion.a
          href="#how-it-works"
          className="inline-flex items-center bg-white text-[#134E5E] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#134E5E] hover:text-white transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Learn How It Works
          <motion.span
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowRight size={20} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
