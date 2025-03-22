
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
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
  { id: 'investors', label: 'Investors' },
  { id: 'customers', label: 'Potential Customers' },
  { id: 'partners', label: 'Business Partners' },
  { id: 'executives', label: 'Executives' },
  { id: 'developers', label: 'Developers' },
  { id: 'general', label: 'General Audience' },
];

const TargetAudienceSelector: React.FC<TargetAudienceSelectorProps> = ({ 
  selectedAudience, 
  setSelectedAudience 
}) => {
  const selectedLabel = audienceOptions.find(option => option.id === selectedAudience)?.label || 'Select Audience';
  
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="block text-sm font-medium text-pitch-dark-gray mb-2">
        Target Audience
      </label>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between bg-white border border-pitch-gray rounded-xl px-4 py-2 h-12 text-left hover:border-pitch-blue transition-all duration-200"
          >
            <span>{selectedLabel}</span>
            <ChevronDown size={16} className="text-pitch-dark-gray" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[240px] bg-white rounded-xl p-1 shadow-lg border border-pitch-gray/20">
          {audienceOptions.map((option) => (
            <DropdownMenuItem
              key={option.id}
              className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer text-pitch-black hover:bg-pitch-blue/5 transition-all duration-200 ${
                selectedAudience === option.id ? 'bg-pitch-blue/5' : ''
              }`}
              onClick={() => setSelectedAudience(option.id)}
            >
              <span>{option.label}</span>
              {selectedAudience === option.id && (
                <Check size={16} className="text-pitch-blue" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <p className="text-xs text-pitch-dark-gray mt-2 ml-1">
        We'll tailor your pitch specifically for this audience.
      </p>
    </motion.div>
  );
};

export default TargetAudienceSelector;
