
import { toast } from 'sonner';
import { claudeService } from '@/services/claudeService';

// Function to generate pitch from text using Claude
export const generatePitchFromText = async (text: string, audience: string): Promise<string> => {
  try {
    if (!text.trim()) {
      throw new Error('Please enter some text about your idea');
    }
    
    toast.info('Analyzing your idea...', {
      duration: 3000,
    });
    
    // Using our Claude service to generate the pitch
    return await claudeService.generatePitch(text, audience, false);
  } catch (error) {
    console.error('Error generating pitch from text:', error);
    toast.error('Failed to generate pitch');
    throw error;
  }
};

// Function to generate pitch from audio using Claude
export const generatePitchFromAudio = async (audioBlob: Blob, audience: string): Promise<string> => {
  try {
    if (!audioBlob) {
      throw new Error('No audio recording found');
    }
    
    toast.info('Transcribing your audio...', {
      duration: 3000,
    });
    
    // Step 1: Transcribe the audio using the Claude service
    const transcription = await claudeService.transcribeAudio(audioBlob);
    
    toast.success('Audio transcribed successfully', {
      duration: 2000,
    });
    
    toast.info('Crafting your perfect pitch...', {
      duration: 3000,
    });
    
    // Step 2: Generate the pitch using the transcription
    return await claudeService.generatePitch(transcription, audience, true);
  } catch (error) {
    console.error('Error generating pitch from audio:', error);
    toast.error('Failed to process audio');
    throw error;
  }
};

