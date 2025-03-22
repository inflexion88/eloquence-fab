
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Copy, Check, RotateCw, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface PitchDisplayProps {
  pitchText: string;
  isLoading: boolean;
  onRegenerate: () => void;
}

const PitchDisplay: React.FC<PitchDisplayProps> = ({ 
  pitchText, 
  isLoading, 
  onRegenerate 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = () => {
    if (!pitchText) return;
    
    navigator.clipboard.writeText(pitchText)
      .then(() => {
        setIsCopied(true);
        toast.success('Pitch copied to clipboard!');
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast.error('Failed to copy. Please try again.');
      });
  };
  
  const downloadAsTxt = () => {
    if (!pitchText) return;
    
    const blob = new Blob([pitchText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'perfect-pitch.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Pitch downloaded as text file');
  };
  
  const sharePitch = () => {
    if (!pitchText) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Perfect Pitch',
        text: pitchText,
      })
      .then(() => toast.success('Shared successfully'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      copyToClipboard();
      toast.success('Pitch copied to clipboard for sharing');
    }
  };
  
  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold text-pitch-black mb-4">
        Your Perfect Pitch
      </h3>
      
      <div className="relative min-h-[200px] rounded-xl border border-pitch-gray/50 bg-pitch-gray/10 p-5 mb-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative w-12 h-12 mb-4">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-pitch-blue/30"
                    animate={{ 
                      scale: [1.1, 1.3, 1.1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-pitch-blue/60"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      opacity: [0.6, 0.4, 0.6],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-pitch-blue"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: [0.5, 0.8, 0.5] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <p className="text-pitch-dark-gray text-sm animate-pulse">
                  Crafting your perfect pitch...
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="prose prose-sm max-w-none"
            >
              {pitchText ? (
                <p className="text-pitch-black leading-relaxed">{pitchText}</p>
              ) : (
                <p className="text-pitch-dark-gray text-center italic">
                  Your pitch will appear here once generated
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {pitchText && !isLoading && (
        <motion.div 
          className="flex flex-wrap gap-2 justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-pitch-gray/50 text-pitch-dark-gray hover:border-pitch-blue hover:text-pitch-blue transition-all duration-200"
              onClick={copyToClipboard}
            >
              {isCopied ? <Check size={16} className="mr-1" /> : <Copy size={16} className="mr-1" />}
              {isCopied ? 'Copied' : 'Copy'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-pitch-gray/50 text-pitch-dark-gray hover:border-pitch-blue hover:text-pitch-blue transition-all duration-200"
              onClick={downloadAsTxt}
            >
              <Download size={16} className="mr-1" />
              Download
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-pitch-gray/50 text-pitch-dark-gray hover:border-pitch-blue hover:text-pitch-blue transition-all duration-200"
              onClick={sharePitch}
            >
              <Share2 size={16} className="mr-1" />
              Share
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-pitch-dark-gray hover:text-pitch-blue hover:bg-pitch-blue/5 transition-all duration-200"
            onClick={onRegenerate}
            disabled={isLoading}
          >
            <RotateCw size={16} className="mr-1" />
            Regenerate
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PitchDisplay;
