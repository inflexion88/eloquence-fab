
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pitch-gray/30 to-white z-0"></div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pitch-blue/5 z-0"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pitch-light-blue/5 z-0"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.6, 0.5]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-pitch-blue/10 text-pitch-blue text-sm font-medium">
            Introducing PitchPerfect.ai
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-pitch-black mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transform your rough ideas into 
          <span className="text-pitch-blue"> perfect pitches</span>
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl text-pitch-dark-gray mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Our AI instantly converts your notes or voice memos into polished elevator pitches 
          tailored specifically to your target audience.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button 
            onClick={scrollToGenerator}
            className="rounded-full px-8 py-6 bg-pitch-blue hover:bg-pitch-light-blue text-white transition-all duration-300 text-lg"
          >
            Try It Now
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-6 border-pitch-dark-gray/30 text-pitch-dark-gray hover:border-pitch-blue hover:text-pitch-blue transition-all duration-300 text-lg"
          >
            Learn More
          </Button>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} className="text-pitch-dark-gray" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
