
import { toast } from 'sonner';

interface ClaudeRequestOptions {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  system?: string;
}

interface ClaudeResponse {
  success: boolean;
  content: string;
  error?: string;
}

export const claudeService = {
  generateContent: async (options: ClaudeRequestOptions): Promise<ClaudeResponse> => {
    const { prompt, maxTokens = 1000, temperature = 0.7, system } = options;
    
    try {
      // In a real implementation, this would be an API call to your backend
      // that interfaces with Anthropic's Claude API
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // This is a placeholder for the actual API call
      // In production, you would send a request to your backend
      console.log('Claude MCI request:', {
        prompt,
        maxTokens,
        temperature,
        system
      });
      
      // For now, we'll return a mock response
      // When connected to a real backend, you would parse the response from Claude
      return {
        success: true,
        content: "This is a simulated Claude MCI response. In production, this would be actual content from Claude."
      };
    } catch (error) {
      console.error('Error generating content with Claude:', error);
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  },
  
  // This method specifically for pitch generation
  generatePitch: async (
    inputText: string,
    audience: string,
    isFromAudio: boolean = false
  ): Promise<string> => {
    // Create a system prompt that gives Claude instructions
    const system = `You are an expert pitch writer assistant. Your task is to craft compelling, 
    concise elevator pitches based on the user's rough ideas. The pitch should be tailored for a 
    specific audience: ${audience}. Create a pitch that is persuasive, clear, and highlights 
    the most important aspects of the idea.${isFromAudio ? " This input was transcribed from audio, so account for potential transcription errors." : ""}`;
    
    // Create the main prompt for Claude
    const prompt = `Please create a professional elevator pitch based on the following idea, 
    tailored specifically for ${audience}:
    
    ${inputText}
    
    The pitch should be concise (1-3 paragraphs), compelling, and highlight the unique value proposition.`;
    
    const response = await claudeService.generateContent({
      prompt,
      system,
      temperature: 0.7,
      maxTokens: 500
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to generate pitch');
    }
    
    return response.content;
  }
};
