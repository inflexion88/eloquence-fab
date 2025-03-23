
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Upload, Trash2, Waveform } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AudioRecorderProps {
  onAudioReady: (audioBlob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioReady }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioFileName, setAudioFileName] = useState<string>('Voice recording.webm');
  const [volume, setVolume] = useState<number[]>(Array(10).fill(3)); // For visualization
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Create audio context for visualization
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 32;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      // Start volume visualization
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      volumeIntervalRef.current = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        // Calculate average volume
        const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        // Generate random-looking but responsive visualization
        setVolume(Array(10).fill(0).map(() => Math.min(10, Math.max(1, (average / 25) + Math.random() * 3))));
      }, 100);
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioType = 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: audioType });
        setAudioBlob(blob);
        setAudioFileName('Voice recording.webm');
        onAudioReady(blob);
        
        if (volumeIntervalRef.current) {
          clearInterval(volumeIntervalRef.current);
          volumeIntervalRef.current = null;
        }
        
        if (audioContextRef.current) {
          audioContextRef.current.close().catch(console.error);
        }
        
        toast.success('Recording saved successfully', {
          description: 'Your voice memo is ready for pitch generation',
          duration: 3000,
        });
      };
      
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      
      mediaRecorder.start();
      toast.info('Recording started', {
        description: 'Speak clearly about your idea',
        duration: 3000,
      });
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Unable to access your microphone. Please check permissions.', {
        description: 'Make sure your browser has permission to use the microphone.',
      });
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
    setAudioFileName('Voice recording.webm');
    toast.info('Recording discarded', {
      description: 'You can record a new voice memo or use text input instead.',
      duration: 3000,
    });
  };

  const uploadAudio = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const fileBlob = file.slice(0, file.size, file.type);
        setAudioBlob(fileBlob);
        setAudioFileName(file.name);
        onAudioReady(fileBlob);
        toast.success('Audio uploaded successfully', {
          description: `File "${file.name}" is ready for pitch generation.`,
          duration: 3000,
        });
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
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center"
                    animate={{ 
                      boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 10px rgba(239, 68, 68, 0)'],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Mic size={22} className="text-white" />
                  </motion.div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-red-500 font-mono text-lg font-semibold">
                    {formatTime(recordingTime)}
                  </div>
                  
                  <div className="flex items-end h-6 gap-[2px] mt-1">
                    {volume.map((v, i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] bg-red-500 rounded-full"
                        initial={{ height: 3 }}
                        animate={{ height: v * 2 }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={stopRecording}
                  className="rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
                  size="icon"
                >
                  <Square size={18} className="text-white" />
                </Button>
              </motion.div>
            ) : (
              <>
                <Button 
                  onClick={startRecording}
                  className="rounded-full flex items-center gap-2 bg-pitch-blue hover:bg-pitch-light-blue px-5 py-6 transition-all duration-300 button-hover-effect"
                >
                  <Mic size={18} className="text-white" />
                  <span>Record Voice Memo</span>
                </Button>
                <Button 
                  onClick={uploadAudio}
                  variant="outline"
                  className="rounded-full flex items-center gap-2 border-pitch-dark-gray/30 text-pitch-dark-gray hover:border-pitch-blue hover:text-pitch-blue px-5 py-6 transition-all duration-300 button-hover-effect"
                >
                  <Upload size={18} />
                  <span>Upload Audio</span>
                </Button>
              </>
            )}
          </div>
        ) : (
          <motion.div 
            className="flex items-center gap-3 bg-pitch-blue/5 rounded-xl p-4 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-full bg-pitch-blue/10 flex items-center justify-center">
              <Waveform size={18} className="text-pitch-blue" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-pitch-black">
                Audio recording ready
              </div>
              <div className="text-xs text-pitch-dark-gray">
                {audioFileName}
              </div>
            </div>
            <Button
              onClick={discardRecording}
              variant="ghost"
              size="icon"
              className="text-pitch-dark-gray hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
            >
              <Trash2 size={16} />
            </Button>
          </motion.div>
        )}
      </div>
      
      <AnimatePresence>
        {!audioBlob && !isRecording && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="bg-pitch-blue/5 border-pitch-blue/10 mt-4 text-center">
              <AlertDescription className="text-sm text-pitch-dark-gray">
                Record or upload an audio file to generate a pitch from your spoken ideas
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AudioRecorder;
