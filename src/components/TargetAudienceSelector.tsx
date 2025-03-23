
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TargetAudienceSelectorProps {
  selectedAudience: string;
  setSelectedAudience: (audience: string) => void;
}

const audienceOptions = [
  { id: 'investors', label: 'Investors', description: 'People who might fund your idea' },
  { id: 'customers', label: 'Potential Customers', description: 'End users of your product or service' },
  { id: 'partners', label: 'Business Partners', description: 'Potential collaborators and allies' },
  { id: 'executives', label: 'Executives', description: 'Decision makers in companies' },
  { id: 'developers', label: 'Developers', description: 'Technical audience and builders' },
  { id: 'general', label: 'General Audience', description: 'Broader public audience' },
];

const TargetAudienceSelector: React.FC<TargetAudienceSelectorProps> = ({ 
  selectedAudience, 
  setSelectedAudience 
}) => {
  const selectedOption = audienceOptions.find(option => option.id === selectedAudience) || audienceOptions[0];
  
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Users size={16} className="text-pitch-dark-gray" />
        <label className="text-sm font-medium text-pitch-dark-gray">
          Target Audience
        </label>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between bg-white border border-pitch-gray/50 rounded-xl px-4 py-2 h-12 text-left hover:border-pitch-blue transition-all duration-200 focus-ring group"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium text-pitch-black">{selectedOption.label}</span>
              <span className="text-xs text-pitch-dark-gray/80">{selectedOption.description}</span>
            </div>
            <ChevronDown size={16} className="text-pitch-dark-gray group-hover:text-pitch-blue transition-colors duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[270px] bg-white rounded-xl p-1 shadow-lg border border-pitch-gray/20">
          {audienceOptions.map((option) => (
            <DropdownMenuItem
              key={option.id}
              className={`flex flex-col items-start justify-between rounded-lg px-3 py-2 cursor-pointer text-pitch-black hover:bg-pitch-blue/5 transition-all duration-200 ${
                selectedAudience === option.id ? 'bg-pitch-blue/5' : ''
              }`}
              onClick={() => setSelectedAudience(option.id)}
            >
              <div className="flex w-full justify-between">
                <span className="font-medium">{option.label}</span>
                {selectedAudience === option.id && (
                  <Check size={16} className="text-pitch-blue" />
                )}
              </div>
              <span className="text-xs text-pitch-dark-gray mt-1">{option.description}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <motion.p 
        className="text-xs text-pitch-dark-gray mt-2 ml-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        We'll tailor your pitch specifically for this audience for maximum impact.
      </motion.p>
    </motion.div>
  );
};

export default TargetAudienceSelector;
