import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PitchGenerator from '@/components/PitchGenerator';
import Footer from '@/components/Footer';
import { Lightbulb, BarChartBig, Target, Zap } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          <HeroSection />
          
          {/* Features Section */}
          <section id="features" className="py-20 px-6 bg-pitch-off-white">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-pitch-black mb-4">
                  Why Use PitchPerfect<span className="text-pitch-blue">.ai</span>
                </h2>
                <p className="text-lg text-pitch-dark-gray max-w-2xl mx-auto">
                  Our AI-powered platform helps you communicate your ideas effectively to any audience.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Lightbulb className="text-pitch-blue" size={32} />,
                    title: "Idea Transformation",
                    description: "Convert rough concepts into polished, compelling pitches in seconds."
                  },
                  {
                    icon: <Target className="text-pitch-blue" size={32} />,
                    title: "Audience Targeting",
                    description: "Customize your pitch for specific audiences from investors to customers."
                  },
                  {
                    icon: <Zap className="text-pitch-blue" size={32} />,
                    title: "Time Efficiency",
                    description: "Save hours of preparation and refinement with instant pitch generation."
                  },
                  {
                    icon: <BarChartBig className="text-pitch-blue" size={32} />,
                    title: "Improved Results",
                    description: "Increase engagement and conversion with professionally crafted messaging."
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-2xl p-6 subtle-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-pitch-blue/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-pitch-black mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-pitch-dark-gray">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section id="how-it-works" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-pitch-black mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-pitch-dark-gray max-w-2xl mx-auto">
                  Three simple steps to transform your ideas into perfect pitches.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    number: "01",
                    title: "Input Your Idea",
                    description: "Type your rough concept or upload a voice memo explaining your idea."
                  },
                  {
                    number: "02",
                    title: "Select Your Audience",
                    description: "Choose who you're pitching to - investors, customers, partners, or others."
                  },
                  {
                    number: "03",
                    title: "Generate Your Pitch",
                    description: "Our AI instantly creates a tailored, compelling pitch ready to use."
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="text-5xl font-bold text-pitch-blue/10 mb-2">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-pitch-black mb-3">
                      {step.title}
                    </h3>
                    <p className="text-pitch-dark-gray">
                      {step.description}
                    </p>
                    
                    {index < 2 && (
                      <motion.div 
                        className="hidden md:block absolute top-10 right-[-30px] z-10 text-pitch-blue/30"
                        animate={{ 
                          x: [0, 5, 0],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 10H56M56 10L48 2M56 10L48 18" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonial Section */}
          <section className="py-20 px-6 bg-pitch-blue/5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="bg-white rounded-2xl p-8 md:p-12 subtle-shadow text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-center mb-6">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3333 23.3333H8.33333C7.89131 23.3333 7.46738 23.1577 7.15482 22.8452C6.84226 22.5326 6.66667 22.1087 6.66667 21.6667V13.3333C6.66667 11.5652 7.36905 9.86953 8.61929 8.61929C9.86953 7.36905 11.5652 6.66667 13.3333 6.66667V10C12.4493 10 11.6014 10.3512 10.9763 10.9763C10.3512 11.6014 10 12.4493 10 13.3333H18.3333V23.3333ZM33.3333 23.3333H23.3333V13.3333H31.6667C31.6667 12.4493 31.3155 11.6014 30.6904 10.9763C30.0652 10.3512 29.2174 10 28.3333 10V6.66667C30.1014 6.66667 31.7971 7.36905 33.0474 8.61929C34.2976 9.86953 35 11.5652 35 13.3333V21.6667C35 22.1087 34.8244 22.5326 34.5118 22.8452C34.1993 23.1577 33.7754 23.3333 33.3333 23.3333Z" fill="#0072F5"/>
                  </svg>
                </div>
                
                <motion.h3 
                  className="text-2xl md:text-3xl font-medium text-pitch-black mb-6 max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  "PitchPerfect.ai transformed how I present my startup to investors. What used to take hours of drafting and refinement now takes seconds, and the results are consistently impressive."
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-16 h-16 rounded-full bg-pitch-gray mx-auto mb-3 overflow-hidden">
                    <div className="w-full h-full bg-pitch-blue/20 flex items-center justify-center">
                      <span className="text-pitch-blue font-medium text-xl">SJ</span>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-pitch-black">Sarah Johnson</p>
                  <p className="text-pitch-dark-gray">Founder, TechVenture</p>
                </motion.div>
              </motion.div>
            </div>
          </section>
          
          {/* Generator Section */}
          <PitchGenerator />
        </main>
        
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default Index;
