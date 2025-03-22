
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mic, AlignLeft } from 'lucide-react';
import AudioRecorder from './AudioRecorder';
import TargetAudienceSelector from './TargetAudienceSelector';

interface InputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  selectedAudience: string;
  setSelectedAudience: (audience: string) => void;
  onAudioReady: (audioBlob: Blob) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  setInputText,
  selectedAudience,
  setSelectedAudience,
  onAudioReady
}) => {
  const [activeTab, setActiveTab] = useState('text');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-semibold text-pitch-black mb-4">
        Input Your Idea
      </h3>
      
      <TargetAudienceSelector 
        selectedAudience={selectedAudience} 
        setSelectedAudience={setSelectedAudience} 
      />
      
      <Tabs 
        defaultValue="text" 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger 
            value="text" 
            className="data-[state=active]:bg-pitch-blue data-[state=active]:text-white rounded-lg"
          >
            <AlignLeft size={16} className="mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger 
            value="audio" 
            className="data-[state=active]:bg-pitch-blue data-[state=active]:text-white rounded-lg"
          >
            <Mic size={16} className="mr-2" />
            Voice
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Textarea
              placeholder="Describe your idea, product or service in a few sentences..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[160px] rounded-xl border-pitch-gray/50 focus:border-pitch-blue focus:ring-pitch-blue/10 resize-none transition-all duration-200"
            />
            <p className="text-xs text-pitch-dark-gray mt-2 ml-1">
              Write your rough idea, we'll transform it into a perfect pitch.
            </p>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="audio" className="mt-0">
          <AudioRecorder onAudioReady={onAudioReady} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default InputSection;
