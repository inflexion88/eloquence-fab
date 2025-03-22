
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-panel"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <motion.div 
          className="w-10 h-10 rounded-lg bg-pitch-blue flex items-center justify-center mr-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white font-semibold text-xl">P</span>
        </motion.div>
        <motion.h1 
          className="text-pitch-black text-xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          PitchPerfect<span className="text-pitch-blue">.ai</span>
        </motion.h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <motion.a 
          href="#features" 
          className="text-pitch-black hover:text-pitch-blue transition-colors duration-200"
          whileHover={{ y: -2 }}
        >
          Features
        </motion.a>
        <motion.a 
          href="#how-it-works" 
          className="text-pitch-black hover:text-pitch-blue transition-colors duration-200"
          whileHover={{ y: -2 }}
        >
          How It Works
        </motion.a>
        <motion.a 
          href="#generator" 
          className="text-pitch-black hover:text-pitch-blue transition-colors duration-200"
          whileHover={{ y: -2 }}
        >
          Try It
        </motion.a>
      </nav>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="rounded-full px-4 hover:bg-pitch-blue hover:text-white border-pitch-blue text-pitch-blue transition-all duration-300">
          Sign In
        </Button>
        <Button className="rounded-full px-4 bg-pitch-blue hover:bg-pitch-light-blue text-white transition-all duration-300">
          Get Started
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
