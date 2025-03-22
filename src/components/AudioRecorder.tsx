
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AudioRecorderProps {
  onAudioReady: (audioBlob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioReady }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        onAudioReady(blob);
      };
      
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      
      mediaRecorder.start();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Unable to access your microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setIsRecording(false);
    }
  };

  const discardRecording = () => {
    setAudioBlob(null);
  };

  const uploadAudio = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setAudioBlob(file);
        onAudioReady(file);
        toast.success('Audio uploaded successfully');
      }
    };
    input.click();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex flex-col items-center">
        {!audioBlob ? (
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            {isRecording ? (
              <motion.div 
                className="flex items-center gap-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"
                    animate={{ 
                      boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 10px rgba(239, 68, 68, 0)'],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Mic size={20} className="text-white" />
                  </motion.div>
                </div>
                <div className="text-red-500 font-mono text-lg">
                  {formatTime(recordingTime)}
                </div>
                <Button 
                  onClick={stopRecording}
                  className="rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  size="icon"
                >
                  <Square size={18} className="text-white" />
                </Button>
              </motion.div>
            ) : (
              <>
                <Button 
                  onClick={startRecording}
                  className="rounded-full flex items-center gap-2 bg-pitch-blue hover:bg-pitch-light-blue px-5 py-6 transition-all duration-300"
                >
                  <Mic size={18} className="text-white" />
                  <span>Record Voice Memo</span>
                </Button>
                <Button 
                  onClick={uploadAudio}
                  variant="outline"
                  className="rounded-full flex items-center gap-2 border-pitch-dark-gray/30 text-pitch-dark-gray hover:border-pitch-blue hover:text-pitch-blue px-5 py-6 transition-all duration-300"
                >
                  <Upload size={18} />
                  <span>Upload Audio</span>
                </Button>
              </>
            )}
          </div>
        ) : (
          <motion.div 
            className="flex items-center gap-3 bg-pitch-gray/40 rounded-xl p-3 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-full bg-pitch-blue/10 flex items-center justify-center">
              <Mic size={18} className="text-pitch-blue" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-pitch-black">
                Audio recording ready
              </div>
              <div className="text-xs text-pitch-dark-gray">
                {audioBlob.name || 'Voice recording.webm'}
              </div>
            </div>
            <Button
              onClick={discardRecording}
              variant="ghost"
              size="icon"
              className="text-pitch-dark-gray hover:text-red-500 hover:bg-red-50 rounded-full"
            >
              <Trash2 size={16} />
            </Button>
          </motion.div>
        )}
      </div>
      
      <div className="text-center mt-4 text-sm text-pitch-dark-gray">
        {!audioBlob && !isRecording ? (
          <span>Record or upload an audio file to generate a pitch</span>
        ) : isRecording ? (
          <span>Recording... speak clearly about your idea</span>
        ) : (
          <span>Audio ready for pitch generation</span>
        )}
      </div>
    </motion.div>
  );
};

export default AudioRecorder;
