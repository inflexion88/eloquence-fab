
import { toast } from 'sonner';

// In a real implementation, you would send the data to a backend API
// This is a mockup that simulates the AI generating a pitch

// Sample pitch templates based on audience
const pitchTemplates = {
  investors: [
    "Our solution addresses a $[MARKET_SIZE] market with a proven [GROWTH_RATE]% year-over-year growth. We've developed a [PRODUCT_TYPE] that solves [PROBLEM] for [TARGET_MARKET], yielding [ROI]% ROI within [TIMEFRAME]. Our competitive advantage is our [UNIQUE_FEATURE], and we're seeking [INVESTMENT_AMOUNT] to scale operations and capture [MARKET_SHARE]% market share within [TIMELINE].",
    "We've identified a critical gap in the [INDUSTRY] market: [PROBLEM]. Our [SOLUTION_NAME] tackles this with [KEY_FEATURE], already showing [TRACTION_METRIC] with minimal marketing. The [MARKET_SIZE] opportunity is growing at [GROWTH_RATE]% annually, and we're positioned to capture [MARKET_SHARE]% with your investment of [INVESTMENT_AMOUNT].",
  ],
  customers: [
    "Imagine never having to worry about [PAIN_POINT] again. Our [PRODUCT_NAME] gives you [PRIMARY_BENEFIT] while also providing [SECONDARY_BENEFIT]. Unlike competitors, we offer [UNIQUE_ADVANTAGE] at [VALUE_PROPOSITION]. Thousands of customers have already experienced [KEY_OUTCOME] – join them today with our risk-free [GUARANTEE].",
    "Are you tired of [PROBLEM]? Our [PRODUCT_NAME] was designed specifically to give you [PRIMARY_BENEFIT] with none of the [NEGATIVE_ALTERNATIVE]. What makes us different is our [UNIQUE_FEATURE], resulting in [MEASURABLE_OUTCOME]. Try it today and see why customers report [POSITIVE_STATISTIC].",
  ],
  partners: [
    "We're seeking strategic partners in the [INDUSTRY] space to expand our [VALUE_OFFERING]. By combining our [YOUR_STRENGTH] with your [THEIR_STRENGTH], we can create a compelling [JOINT_OFFERING] that addresses [MARKET_NEED]. Our current [METRIC] demonstrates market validation, and together we can accelerate growth by [GROWTH_STRATEGY].",
    "Our partnership opportunity centers on combining your [THEIR_CAPABILITY] with our [YOUR_CAPABILITY] to deliver unprecedented [VALUE_PROPOSITION] to [TARGET_MARKET]. We've already established [TRACTION_METRIC], and our analysis suggests a partnership could yield [PROJECTED_RESULT] within [TIMEFRAME]. Let's explore how we can create mutual value.",
  ],
  executives: [
    "Our solution directly addresses three strategic priorities: [PRIORITY_1], [PRIORITY_2], and [PRIORITY_3]. Implementation requires minimal disruption, with ROI projected at [ROI]% within [TIMEFRAME]. The competitive landscape is shifting with [MARKET_TREND], making this initiative time-sensitive. We recommend a [APPROACH] approach beginning with [FIRST_STEP].",
    "This initiative aligns with our organization's [STRATEGIC_GOAL] while addressing the critical challenge of [PROBLEM]. Our analysis indicates [QUANTIFIED_BENEFIT] within [TIMEFRAME], with resource requirements of [RESOURCES]. The opportunity cost of delaying is [COST], and our implementation roadmap ensures minimal operational disruption through [METHODOLOGY].",
  ],
  developers: [
    "Our API solves [TECHNICAL_PROBLEM] with just [CODE_SIMPLICITY] lines of code. We offer [FEATURE_1], [FEATURE_2], and [FEATURE_3] out of the box, with [PERFORMANCE_METRIC] at scale. Our documentation includes [RESOURCES], and our community has already built [ECOSYSTEM_EXAMPLE]. Integration takes approximately [INTEGRATION_TIME].",
    "We've built a developer-first solution for [PROBLEM_DOMAIN] that reduces implementation time from [BEFORE_TIME] to [AFTER_TIME]. Our architecture supports [TECHNICAL_CAPABILITIES] while maintaining [SECURITY_COMPLIANCE]. The sandbox environment lets you test all features before committing, and our support team includes [EXPERTISE] to help with any integration challenges.",
  ],
  general: [
    "Our [PRODUCT_TYPE] helps [TARGET_AUDIENCE] achieve [PRIMARY_BENEFIT] without the usual [PAIN_POINT]. Unlike alternatives, we focus on [UNIQUE_APPROACH], resulting in [MEASURABLE_OUTCOME]. Our solution is already helping [SOCIAL_PROOF], and we're committed to [VISION_STATEMENT].",
    "We're on a mission to transform how [TARGET_AUDIENCE] approach [PROBLEM_AREA]. Our solution combines [FEATURE_1] and [FEATURE_2] to deliver [KEY_BENEFIT] in a way that's [DIFFERENTIATOR]. The result? [OUTCOME]. Join the [NUMBER] people who've already discovered the difference.",
  ],
};

// Function to simulate pitch generation from text
export const generatePitchFromText = async (text: string, audience: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // In a real implementation, you would send the text to an AI service
    // For now, we'll use a template-based approach with some randomization
    
    const templates = pitchTemplates[audience as keyof typeof pitchTemplates] || pitchTemplates.general;
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    // Extract key concepts from input text (in a real implementation, this would be done by AI)
    const keywords = extractKeywords(text);
    
    // Replace placeholders with keywords or default values
    let generatedPitch = selectedTemplate;
    
    // Replace placeholders with extracted keywords or generic values
    generatedPitch = generatedPitch
      .replace(/\[PRODUCT_TYPE\]/g, keywords.productType || "innovative solution")
      .replace(/\[PRODUCT_NAME\]/g, keywords.productName || "product")
      .replace(/\[PROBLEM\]/g, keywords.problem || "significant market challenge")
      .replace(/\[SOLUTION_NAME\]/g, keywords.solutionName || "solution")
      .replace(/\[TARGET_MARKET\]/g, keywords.targetMarket || "our target customers")
      .replace(/\[MARKET_SIZE\]/g, keywords.marketSize || "$10B")
      .replace(/\[GROWTH_RATE\]/g, keywords.growthRate || "25")
      .replace(/\[UNIQUE_FEATURE\]/g, keywords.uniqueFeature || "proprietary technology")
      .replace(/\[ROI\]/g, keywords.roi || "300")
      .replace(/\[TIMEFRAME\]/g, keywords.timeframe || "6 months")
      .replace(/\[INVESTMENT_AMOUNT\]/g, keywords.investmentAmount || "$2M")
      .replace(/\[MARKET_SHARE\]/g, keywords.marketShare || "15")
      .replace(/\[TIMELINE\]/g, keywords.timeline || "2 years")
      .replace(/\[INDUSTRY\]/g, keywords.industry || "industry")
      .replace(/\[KEY_FEATURE\]/g, keywords.keyFeature || "innovative approach")
      .replace(/\[TRACTION_METRIC\]/g, keywords.tractionMetric || "strong early traction")
      .replace(/\[PAIN_POINT\]/g, keywords.painPoint || "common frustration")
      .replace(/\[PRIMARY_BENEFIT\]/g, keywords.primaryBenefit || "significant benefits")
      .replace(/\[SECONDARY_BENEFIT\]/g, keywords.secondaryBenefit || "additional advantages")
      .replace(/\[UNIQUE_ADVANTAGE\]/g, keywords.uniqueAdvantage || "unparalleled quality")
      .replace(/\[VALUE_PROPOSITION\]/g, keywords.valueProposition || "excellent value")
      .replace(/\[KEY_OUTCOME\]/g, keywords.keyOutcome || "transformative results")
      .replace(/\[GUARANTEE\]/g, keywords.guarantee || "satisfaction guarantee")
      .replace(/\[NEGATIVE_ALTERNATIVE\]/g, keywords.negativeAlternative || "common drawbacks")
      .replace(/\[MEASURABLE_OUTCOME\]/g, keywords.measurableOutcome || "measurable improvements")
      .replace(/\[POSITIVE_STATISTIC\]/g, keywords.positiveStatistic || "95% satisfaction")
      .replace(/\[VALUE_OFFERING\]/g, keywords.valueOffering || "market reach")
      .replace(/\[YOUR_STRENGTH\]/g, keywords.yourStrength || "technology")
      .replace(/\[THEIR_STRENGTH\]/g, keywords.theirStrength || "distribution network")
      .replace(/\[JOINT_OFFERING\]/g, keywords.jointOffering || "solution")
      .replace(/\[MARKET_NEED\]/g, keywords.marketNeed || "growing demand")
      .replace(/\[METRIC\]/g, keywords.metric || "customer base")
      .replace(/\[GROWTH_STRATEGY\]/g, keywords.growthStrategy || "targeting new markets")
      .replace(/\[THEIR_CAPABILITY\]/g, keywords.theirCapability || "market position")
      .replace(/\[YOUR_CAPABILITY\]/g, keywords.yourCapability || "innovative technology")
      .replace(/\[PROJECTED_RESULT\]/g, keywords.projectedResult || "significant growth")
      .replace(/\[PRIORITY_1\]/g, keywords.priority1 || "operational efficiency")
      .replace(/\[PRIORITY_2\]/g, keywords.priority2 || "customer retention")
      .replace(/\[PRIORITY_3\]/g, keywords.priority3 || "market expansion")
      .replace(/\[MARKET_TREND\]/g, keywords.marketTrend || "increasing competition")
      .replace(/\[APPROACH\]/g, keywords.approach || "phased")
      .replace(/\[FIRST_STEP\]/g, keywords.firstStep || "pilot program")
      .replace(/\[STRATEGIC_GOAL\]/g, keywords.strategicGoal || "long-term vision")
      .replace(/\[QUANTIFIED_BENEFIT\]/g, keywords.quantifiedBenefit || "30% improvement")
      .replace(/\[RESOURCES\]/g, keywords.resources || "minimal investment")
      .replace(/\[COST\]/g, keywords.cost || "potential market share loss")
      .replace(/\[METHODOLOGY\]/g, keywords.methodology || "proven implementation framework")
      .replace(/\[TECHNICAL_PROBLEM\]/g, keywords.technicalProblem || "complex integration issues")
      .replace(/\[CODE_SIMPLICITY\]/g, keywords.codeSimplicity || "a few")
      .replace(/\[FEATURE_1\]/g, keywords.feature1 || "seamless integration")
      .replace(/\[FEATURE_2\]/g, keywords.feature2 || "robust security")
      .replace(/\[FEATURE_3\]/g, keywords.feature3 || "detailed analytics")
      .replace(/\[PERFORMANCE_METRIC\]/g, keywords.performanceMetric || "high performance")
      .replace(/\[ECOSYSTEM_EXAMPLE\]/g, keywords.ecosystemExample || "useful extensions")
      .replace(/\[INTEGRATION_TIME\]/g, keywords.integrationTime || "minutes")
      .replace(/\[PROBLEM_DOMAIN\]/g, keywords.problemDomain || "common challenges")
      .replace(/\[BEFORE_TIME\]/g, keywords.beforeTime || "weeks")
      .replace(/\[AFTER_TIME\]/g, keywords.afterTime || "hours")
      .replace(/\[TECHNICAL_CAPABILITIES\]/g, keywords.technicalCapabilities || "scalability and flexibility")
      .replace(/\[SECURITY_COMPLIANCE\]/g, keywords.securityCompliance || "industry standards")
      .replace(/\[EXPERTISE\]/g, keywords.expertise || "experienced engineers")
      .replace(/\[TARGET_AUDIENCE\]/g, keywords.targetAudience || "users")
      .replace(/\[UNIQUE_APPROACH\]/g, keywords.uniqueApproach || "customer-centric design")
      .replace(/\[SOCIAL_PROOF\]/g, keywords.socialProof || "thousands of satisfied customers")
      .replace(/\[VISION_STATEMENT\]/g, keywords.visionStatement || "continuous innovation")
      .replace(/\[NUMBER\]/g, keywords.number || "growing number of")
      .replace(/\[DIFFERENTIATOR\]/g, keywords.differentiator || "user-friendly and effective")
      .replace(/\[OUTCOME\]/g, keywords.outcome || "unprecedented results")
      .replace(/\[PROBLEM_AREA\]/g, keywords.problemArea || "everyday challenges");

    return generatedPitch;
  } catch (error) {
    console.error('Error generating pitch from text:', error);
    toast.error('Failed to generate pitch');
    throw error;
  }
};

// Function to simulate pitch generation from audio
export const generatePitchFromAudio = async (audioBlob: Blob, audience: string): Promise<string> => {
  // Simulate API call delay for audio transcription and processing
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    // In a real implementation, you would:
    // 1. Send the audio to a transcription service
    // 2. Get the transcribed text
    // 3. Send the text to an AI service for pitch generation
    
    // For this mockup, we'll simulate a transcription with fixed text
    const simulatedTranscription = "We're building an AI-powered platform that automatically converts spoken ideas into professional pitch presentations targeted for specific audiences like investors or customers. Our technology saves hours of preparation time and helps people communicate their ideas more effectively.";
    
    // Use the same text-based generation with our simulated transcription
    return generatePitchFromText(simulatedTranscription, audience);
  } catch (error) {
    console.error('Error generating pitch from audio:', error);
    toast.error('Failed to process audio');
    throw error;
  }
};

// Helper function to extract keywords from text
// In a real implementation, this would be done with NLP or AI
const extractKeywords = (text: string): Record<string, string> => {
  const keywords: Record<string, string> = {};
  
  // Simple keyword extraction based on common terms
  if (text.toLowerCase().includes('app')) {
    keywords.productType = 'mobile application';
    keywords.solutionName = 'app';
  } else if (text.toLowerCase().includes('platform')) {
    keywords.productType = 'platform';
    keywords.solutionName = 'platform';
  } else if (text.toLowerCase().includes('service')) {
    keywords.productType = 'service';
    keywords.solutionName = 'service';
  }
  
  // Extract potential product name (capitalized phrases)
  const productNameMatch = text.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
  if (productNameMatch) {
    keywords.productName = productNameMatch[0];
  }
  
  // Extract problem statements
  if (text.toLowerCase().includes('problem') || text.toLowerCase().includes('challenge')) {
    const problemIndex = Math.max(
      text.toLowerCase().indexOf('problem'),
      text.toLowerCase().indexOf('challenge')
    );
    
    if (problemIndex !== -1) {
      const problemSection = text.substring(problemIndex, problemIndex + 100);
      const endOfSentence = problemSection.indexOf('.');
      
      if (endOfSentence !== -1) {
        keywords.problem = problemSection.substring(0, endOfSentence + 1);
      }
    }
  }
  
  // Extract benefit statements
  if (text.toLowerCase().includes('benefit') || text.toLowerCase().includes('helps')) {
    const benefitIndex = Math.max(
      text.toLowerCase().indexOf('benefit'),
      text.toLowerCase().indexOf('helps')
    );
    
    if (benefitIndex !== -1) {
      const benefitSection = text.substring(benefitIndex, benefitIndex + 100);
      const endOfSentence = benefitSection.indexOf('.');
      
      if (endOfSentence !== -1) {
        keywords.primaryBenefit = benefitSection.substring(0, endOfSentence + 1);
      }
    }
  }
  
  return keywords;
};
