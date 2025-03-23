
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, TrendingUp } from 'lucide-react';

const SuccessStories: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah J.',
      role: 'Startup Founder',
      company: 'TechNova',
      quote: 'PitchPerfect helped us secure $2.5M in seed funding on our first investor meeting. The tailored pitch made all the difference.',
      icon: <Star className="text-yellow-400" size={18} />,
      audience: 'investors'
    },
    {
      id: 2,
      name: 'Michael R.',
      role: 'Sales Director',
      company: 'EnterpriseX',
      quote: 'We've seen a 43% increase in customer conversions since using these AI-generated pitches. The personalization is remarkable.',
      icon: <TrendingUp className="text-green-500" size={18} />,
      audience: 'customers'
    },
    {
      id: 3,
      name: 'David L.',
      role: 'CEO',
      company: 'InnovateHub',
      quote: 'This tool helped us form three crucial strategic partnerships. The partner-specific messaging resonated perfectly with our audience.',
      icon: <Award className="text-blue-500" size={18} />,
      audience: 'partners'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 pt-6 border-t border-pitch-gray/30"
    >
      <motion.h4 
        className="text-lg font-semibold text-pitch-black mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Success Stories
      </motion.h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="bg-white border border-pitch-gray/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-full bg-pitch-blue/10">
                {testimonial.icon}
              </div>
              <div>
                <h5 className="font-medium text-sm text-pitch-black">{testimonial.name}</h5>
                <p className="text-xs text-pitch-dark-gray">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
            
            <blockquote className="text-sm text-pitch-dark-gray italic">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="mt-3 text-xs font-medium text-pitch-blue bg-pitch-blue/5 rounded-full px-2 py-0.5 inline-block">
              {testimonial.audience.charAt(0).toUpperCase() + testimonial.audience.slice(1)} focused
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.p
        className="text-xs text-center mt-4 text-pitch-dark-gray/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        Join thousands of professionals who have transformed their pitching success.
      </motion.p>
    </motion.div>
  );
};

export default SuccessStories;
