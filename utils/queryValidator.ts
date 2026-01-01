/**
 * SoundVision Service Domain Validator
 * Ensures queries stay within our supported service scope
 */

interface ValidationResult {
  isValid: boolean;
  reason?: string;
  suggestedResponse?: string;
}

// Keywords that indicate the query is within our service domain
const VALID_DOMAIN_KEYWORDS = [
  // Equipment brands we support
  'control4', 'lutron', 'qolsys', 'alarm.com', 'araknis', 'ubiquiti', 'luma',
  'lg', 'sony', 'anthem', 'unifi', 'dream machine',
  
  // General categories we support
  'automation', 'smart home', 'lighting', 'shades', 'blinds', 'security', 'alarm',
  'camera', 'surveillance', 'network', 'wifi', 'internet', 'router', 'switch',
  'av', 'audio', 'video', 'tv', 'television', 'speaker', 'receiver', 'amp', 'amplifier',
  'remote', 'streaming', 'hdmi', 'projector', 'screen', 'soundbar',
  
  // Common issues/actions
  'install', 'setup', 'configure', 'troubleshoot', 'connect', 'reset', 'reboot',
  'offline', 'not working', 'connection', 'pairing', 'password', 'app',
  
  // Our company
  'soundvision', 'sound vision', 'service', 'support', 'help', 'technician'
];

// Keywords that clearly indicate off-topic queries
const INVALID_DOMAIN_KEYWORDS = [
  // Competitor systems (be graceful about these)
  'savant', 'crestron', 'elan',
  
  // Completely unrelated topics
  'recipe', 'cooking', 'weather', 'sports', 'politics', 'news',
  'medical', 'health', 'legal', 'financial', 'stock', 'investment',
  'dating', 'relationship', 'homework', 'essay', 'poetry',
  'game', 'gaming', 'xbox', 'playstation',
  
  // General knowledge queries
  'history of', 'who is', 'who was', 'biography', 'famous',
  'capital of', 'population of', 'define', 'meaning of',
  'translate', 'translation'
];

/**
 * Validates if a user query is within SoundVision's service domain
 */
export function validateServiceQuery(query: string): ValidationResult {
  const lowerQuery = query.toLowerCase().trim();
  
  // Check for empty or very short queries
  if (lowerQuery.length < 3) {
    return {
      isValid: false,
      reason: 'Query too short',
      suggestedResponse: "I'm here to help with your SoundVision equipment and home automation systems. How can I assist you today?"
    };
  }
  
  // Check for competitor systems - be graceful
  const hasCompetitorMention = INVALID_DOMAIN_KEYWORDS
    .filter(keyword => ['savant', 'crestron', 'elan'].includes(keyword))
    .some(keyword => lowerQuery.includes(keyword));
    
  if (hasCompetitorMention) {
    return {
      isValid: false,
      reason: 'Competitor system mentioned',
      suggestedResponse: "I specialize in SoundVision's equipment including Control4, Lutron, Qolsys, Araknis, Ubiquiti, and Luma systems. For questions about other brands, I'd recommend reaching out to that manufacturer's support team."
    };
  }
  
  // Check for clearly off-topic keywords
  const hasInvalidKeyword = INVALID_DOMAIN_KEYWORDS.some(keyword => 
    lowerQuery.includes(keyword)
  );
  
  if (hasInvalidKeyword) {
    return {
      isValid: false,
      reason: 'Off-topic query',
      suggestedResponse: "I'm specifically designed to help with your SoundVision home automation, security, networking, and AV equipment. Is there something I can help you troubleshoot with your home systems?"
    };
  }
  
  // Check for valid domain keywords (more permissive)
  const hasValidKeyword = VALID_DOMAIN_KEYWORDS.some(keyword => 
    lowerQuery.includes(keyword)
  );
  
  // Allow queries that mention our valid domains
  if (hasValidKeyword) {
    return { isValid: true };
  }
  
  // For ambiguous queries, check if they're asking general questions
  const generalQuestionPatterns = [
    /^(what|how|when|where|why|who|which)/,
    /tell me about/,
    /explain/,
    /can you help me (with|learn|understand)/,
    /(write|create|make) (a|an|me)/
  ];
  
  const seemsLikeGeneralQuestion = generalQuestionPatterns.some(pattern => 
    pattern.test(lowerQuery)
  );
  
  // Check if the query mentions equipment/technical terms generically
  const technicalTerms = [
    'device', 'system', 'equipment', 'problem', 'issue', 'error',
    'set up', 'install', 'configure', 'connect', 'disconnect'
  ];
  
  const hasTechnicalContext = technicalTerms.some(term => 
    lowerQuery.includes(term)
  );
  
  // If it seems technical but didn't match our keywords, give benefit of doubt
  // but provide guidance
  if (hasTechnicalContext && !seemsLikeGeneralQuestion) {
    return { isValid: true };
  }
  
  // If it's clearly a general question without technical context, reject
  if (seemsLikeGeneralQuestion && !hasTechnicalContext) {
    return {
      isValid: false,
      reason: 'General knowledge query',
      suggestedResponse: "I'm your SoundVision equipment expert, specializing in home automation, security, networking, and AV systems. I'm here to help troubleshoot your Control4, Lutron, Qolsys, Luma, or other installed equipment. What can I help you with?"
    };
  }
  
  // For very short or ambiguous queries, allow them but they might not get great results
  // This catches things like "help", "problem", etc.
  return { isValid: true };
}

/**
 * Get a friendly rejection message for invalid queries
 */
export function getOutOfScopeMessage(query: string): string {
  const validation = validateServiceQuery(query);
  
  if (validation.suggestedResponse) {
    return validation.suggestedResponse;
  }
  
  // Default fallback
  return "I'm designed to help specifically with SoundVision's home automation, security, networking, and AV equipment. This includes troubleshooting Control4 automation, Lutron lighting and shades, Qolsys security systems, Araknis/Ubiquiti networking, Luma cameras, and premium AV equipment. How can I assist you with your installed systems?";
}
