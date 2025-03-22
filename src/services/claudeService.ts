
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
      console.log('Claude API request:', {
        prompt,
        maxTokens,
        temperature,
        system
      });
      
      // For demo purposes, generate a more realistic-looking pitch based on the prompt
      const demoResponse = generateDemoPitch(prompt);
      
      return {
        success: true,
        content: demoResponse
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
    
    The pitch should be concise (2-3 paragraphs), compelling, and highlight the unique value proposition.`;
    
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
  },
  
  // In a real implementation, this would call a transcription service like Whisper
  transcribeAudio: async (audioBlob: Blob): Promise<string> => {
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('Transcribing audio file:', audioBlob);
      
      // In a real implementation, you would send the audio to a transcription service
      // and get back the text. For now, we'll return a placeholder.
      return "We're building an AI-powered platform that automatically converts spoken ideas into professional pitch presentations targeted for specific audiences. The technology saves hours of preparation time and helps people communicate more effectively with their stakeholders. Our initial focus is on startups and entrepreneurs who need to quickly prepare different versions of their pitch for investors, customers, and partners.";
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio');
    }
  }
};

// Helper function for demo purposes to generate realistic-looking pitches
function generateDemoPitch(prompt: string): string {
  const audienceMatch = prompt.match(/tailored specifically for (\w+)/i);
  const audience = audienceMatch ? audienceMatch[1].toLowerCase() : 'general';
  
  const pitches = {
    investors: `We've developed an AI-powered platform that transforms rough ideas into polished pitch presentations in seconds. Our proprietary algorithms analyze the core value proposition and automatically tailor the messaging for investor audiences, highlighting market opportunity, business model, and growth potential.

With $2.4M in annual recurring revenue and a 94% customer retention rate, we're growing at 28% quarter-over-quarter. Our target market of 4.2 million startups and small businesses represents a $840M annual opportunity, and we're currently capturing just 0.3% of this market.

We're seeking $5M in Series A funding to expand our sales team, enhance our AI capabilities, and develop enterprise features that our larger customers have been requesting.`,
    
    customers: `Imagine turning your rough ideas into compelling, professional pitches within seconds. That's exactly what our platform delivers. Simply input your concept through text or voice, and our AI instantly crafts a polished pitch tailored specifically to resonate with your customers.

Our technology analyzes what matters most to your audience and highlights the benefits and value proposition in clear, persuasive language. Users report saving an average of 5.4 hours per week on pitch preparation, allowing them to focus on what they do best - building relationships and closing deals.

Sign up today for a 14-day free trial and experience the difference that professional, consistent messaging makes in your customer conversations.`,
    
    partners: `Our AI-powered pitch generation platform creates a unique opportunity for partnership and integration with your existing business solutions. By combining your expertise in customer relationship management with our automated pitch creation technology, we can offer businesses a seamless experience from prospect identification to persuasive presentation.

This collaboration would allow your customers to automatically generate tailored pitches directly from the customer data in your system, ensuring consistent messaging that evolves with each client relationship. Early tests show this integration could increase deal conversion rates by 32% and reduce pitch preparation time by 78%.

We're looking for strategic partners who share our vision of empowering businesses with AI-enhanced communication tools, and your market position makes you an ideal candidate for this opportunity.`,
    
    general: `Our platform uses advanced AI to instantly transform your ideas into professional, persuasive pitches for any audience. Whether you're pitching to investors, customers, or partners, our technology analyzes what matters most to your specific audience and crafts compelling messaging that highlights the key benefits and value propositions.

Users can input their concepts through text or voice, and within seconds receive a polished pitch that's ready to use. The platform saves hours of preparation time and ensures consistent, effective communication across all stakeholders.

With flexible pricing plans starting at just $29 per month, businesses of any size can access professional-quality pitch creation that adapts to their evolving needs.`
  };
  
  return pitches[audience as keyof typeof pitches] || pitches.general;
}
