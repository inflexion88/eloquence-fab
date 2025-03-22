
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="bg-pitch-gray/20 border-t border-pitch-gray/30 py-12 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-pitch-blue flex items-center justify-center mr-3">
                <span className="text-white font-semibold text-xl">P</span>
              </div>
              <h3 className="text-xl font-semibold">
                PitchPerfect<span className="text-pitch-blue">.ai</span>
              </h3>
            </div>
            <p className="text-pitch-dark-gray mb-6 max-w-md">
              Transform your rough ideas into polished elevator pitches tailored to your target audience with the power of AI.
            </p>
            <div className="flex items-center space-x-4">
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-pitch-black flex items-center justify-center text-white"
                whileHover={{ y: -2, backgroundColor: '#0072F5' }}
                transition={{ duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-pitch-black flex items-center justify-center text-white"
                whileHover={{ y: -2, backgroundColor: '#0072F5' }}
                transition={{ duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4c0 0-4.9-.7-7 3 2.5 1.8 4 4.1 4.5 7-2.3-2.8-6.5-7-12.5-7C4 14 1 16 1 20h11c7.5 0 10-6 10-16z"></path>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-pitch-black flex items-center justify-center text-white"
                whileHover={{ y: -2, backgroundColor: '#0072F5' }}
                transition={{ duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-pitch-black font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue transition-colors">Use Cases</a>
              </li>
              <li>
                <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue transition-colors">API</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-pitch-black font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-pitch-gray/30 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-pitch-dark-gray text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PitchPerfect.ai. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-pitch-dark-gray hover:text-pitch-blue text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
