
# Claude Integration for PitchPerfect.ai

This document outlines how to fully integrate the Claude AI model into the PitchPerfect.ai application.

## Implementation Steps

1. **Set up a backend service or serverless function**
   - Create an API endpoint that will communicate with Anthropic's Claude API
   - This is necessary to protect your API keys and handle rate limiting

2. **Update the Claude Service**
   - Replace the placeholder in `src/services/claudeService.ts` with actual API calls
   - Make sure to handle appropriate error states and rate limiting

3. **Implement audio transcription**
   - For the voice memo feature, integrate with a transcription service like OpenAI's Whisper API
   - Update the `generatePitchFromAudio` function in `pitchGenerationUtils.ts` to use this service

## Example Backend Implementation (Node.js)

```javascript
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/generate-pitch', async (req, res) => {
  const { prompt, system, temperature, maxTokens } = req.body;
  
  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: "claude-3-opus-20240229",
      max_tokens: maxTokens,
      temperature: temperature,
      system: system,
      messages: [
        { role: "user", content: prompt }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    });
    
    res.json({ 
      success: true, 
      content: response.data.content[0].text 
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
```

## Security Considerations

- Never expose your Anthropic API key in client-side code
- Consider implementing rate limiting to avoid excessive API costs
- Add authentication to your backend to prevent unauthorized access

## Testing

Before deploying to production, test thoroughly with a variety of inputs to ensure:
- The pitches are appropriate for each audience type
- The system handles errors gracefully
- Response times are acceptable
