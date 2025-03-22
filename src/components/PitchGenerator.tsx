
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import InputSection from './InputSection';
import PitchDisplay from './PitchDisplay';
import { generatePitchFromText, generatePitchFromAudio } from '@/utils/pitchGenerationUtils';

const PitchGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('investors');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [pitchText, setPitchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAudioReady = (blob: Blob) => {
    setAudioBlob(blob);
  };
  
  const generatePitch = async () => {
    if (!inputText && !audioBlob) {
      toast.error('Please enter text or record audio first');
      return;
    }
    
    setIsLoading(true);
    
    try {
      let generatedPitch;
      
      if (audioBlob) {
        // In a real implementation, you would send the audio to a server for transcription
        // and then generate the pitch based on the transcription
        generatedPitch = await generatePitchFromAudio(audioBlob, selectedAudience);
      } else {
        generatedPitch = await generatePitchFromText(inputText, selectedAudience);
      }
      
      setPitchText(generatedPitch);
      toast.success('Pitch generated successfully!');
    } catch (error) {
      console.error('Error generating pitch:', error);
      toast.error('Failed to generate pitch. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegenerate = () => {
    generatePitch();
  };
  
  return (
    <section id="generator" className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pitch-black mb-4">
            Generate Your Perfect Pitch
          </h2>
          <p className="text-lg text-pitch-dark-gray max-w-2xl mx-auto">
            Input your idea as text or voice, select your target audience, and let our AI craft the perfect pitch for you.
          </p>
        </motion.div>
        
        <InputSection 
          inputText={inputText}
          setInputText={setInputText}
          selectedAudience={selectedAudience}
          setSelectedAudience={setSelectedAudience}
          onAudioReady={handleAudioReady}
        />
        
        <motion.div 
          className="flex justify-center mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button 
            onClick={generatePitch}
            disabled={isLoading || (!inputText && !audioBlob)}
            className="rounded-full px-8 py-6 bg-pitch-blue hover:bg-pitch-light-blue text-white transition-all duration-300 text-lg disabled:opacity-70"
          >
            {isLoading ? 'Generating...' : 'Generate Perfect Pitch'}
          </Button>
        </motion.div>
        
        {(pitchText || isLoading) && (
          <PitchDisplay 
            pitchText={pitchText} 
            isLoading={isLoading} 
            onRegenerate={handleRegenerate} 
          />
        )}
      </div>
    </section>
  );
};

export default PitchGenerator;
