import { toast } from 'sonner';
import { claudeService } from '@/services/claudeService';

// Function to generate pitch from text using Claude
export const generatePitchFromText = async (text: string, audience: string): Promise<string> => {
  try {
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
    // In a real implementation, you would:
    // 1. Send the audio to a transcription service (e.g., Whisper)
    // 2. Get the transcribed text
    // 3. Send the text to Claude for pitch generation
    
    // For this mockup, we'll simulate a transcription with fixed text
    const simulatedTranscription = "We're building an AI-powered platform that automatically converts spoken ideas into professional pitch presentations targeted for specific audiences like investors or customers. Our technology saves hours of preparation time and helps people communicate their ideas more effectively.";
    
    // Using Claude to generate the pitch, with flag indicating it's from audio
    return await claudeService.generatePitch(simulatedTranscription, audience, true);
  } catch (error) {
    console.error('Error generating pitch from audio:', error);
    toast.error('Failed to process audio');
    throw error;
  }
};

// Note: The existing pitchTemplates and extractKeywords functions would be removed 
// as they're no longer needed with Claude integration
