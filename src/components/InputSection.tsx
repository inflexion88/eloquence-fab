
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mic, AlignLeft, Sparkles } from 'lucide-react';
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
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-2 mb-4"
      >
        <Sparkles size={18} className="text-pitch-blue" />
        <h3 className="text-xl font-semibold text-pitch-black">
          Input Your Idea
        </h3>
      </motion.div>
      
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
            className="data-[state=active]:bg-pitch-blue data-[state=active]:text-white rounded-lg transition-all duration-200 focus-ring"
          >
            <AlignLeft size={16} className="mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger 
            value="audio" 
            className="data-[state=active]:bg-pitch-blue data-[state=active]:text-white rounded-lg transition-all duration-200 focus-ring"
          >
            <Mic size={16} className="mr-2" />
            Voice
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          {activeTab === 'text' && (
            <TabsContent value="text" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="focus-within:ring-1 focus-within:ring-pitch-blue/20 rounded-xl transition-all duration-200"
              >
                <Textarea
                  placeholder="Describe your idea, product or service in a few sentences..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[160px] rounded-xl border-pitch-gray/50 focus:border-pitch-blue focus:ring-pitch-blue/10 resize-none transition-all duration-200 focus-ring"
                />
                <motion.p 
                  className="text-xs text-pitch-dark-gray mt-2 ml-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  Write your rough idea, we'll transform it into a perfect pitch.
                </motion.p>
              </motion.div>
            </TabsContent>
          )}
          
          {activeTab === 'audio' && (
            <TabsContent value="audio" className="mt-0">
              <AudioRecorder onAudioReady={onAudioReady} />
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default InputSection;
