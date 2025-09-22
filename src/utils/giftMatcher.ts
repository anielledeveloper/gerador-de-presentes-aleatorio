/**
 * Intelligent gift matching algorithm
 */

import { Gift, GIFT_DATABASE, PRICE_RANGES } from '../data/giftDatabase';

export interface GiftSearchCriteria {
  recipient: string;
  age: string;
  gender: string;
  interests: string;
  occasion: string;
  budget: string;
}

export interface GiftMatch {
  gift: Gift;
  score: number;
  reasons: string[];
}

/**
 * Match gifts based on search criteria
 */
export function findGiftMatches(criteria: GiftSearchCriteria): GiftMatch[] {
  const matches: GiftMatch[] = [];
  
  for (const gift of GIFT_DATABASE) {
    const score = calculateMatchScore(gift, criteria);
    
    if (score > 0) {
      const reasons = generateMatchReasons(gift, criteria);
      matches.push({ gift, score, reasons });
    }
  }
  
  // Sort by score (highest first) and return top 6 matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

/**
 * Calculate match score for a gift
 */
function calculateMatchScore(gift: Gift, criteria: GiftSearchCriteria): number {
  let score = 0;
  
  // Age group matching (40% weight)
  if (gift.ageGroup === criteria.age || gift.ageGroup === 'all') {
    score += 40;
  }
  
  // Gender matching (30% weight)
  if (gift.gender === criteria.gender || gift.gender === 'unisex' || gift.gender === 'all') {
    score += 30;
  }
  
  // Budget matching (25% weight)
  if (gift.priceRange === criteria.budget) {
    score += 25;
  } else if (criteria.budget === 'low' && gift.priceRange === 'medium') {
    score += 15; // Partial match for low budget
  } else if (criteria.budget === 'medium' && (gift.priceRange === 'low' || gift.priceRange === 'high')) {
    score += 15; // Partial match for medium budget
  } else if (criteria.budget === 'high' && (gift.priceRange === 'medium' || gift.priceRange === 'premium')) {
    score += 15; // Partial match for high budget
  }
  
  // Interest matching (35% weight)
  const interestScore = calculateInterestScore(gift, criteria.interests);
  score += interestScore * 0.35;
  
  // Occasion matching (20% weight)
  const occasionScore = calculateOccasionScore(gift, criteria.occasion);
  score += occasionScore * 0.20;
  
  // Recipient type matching (15% weight)
  const recipientScore = calculateRecipientScore(gift, criteria.recipient);
  score += recipientScore * 0.15;
  
  // Popularity bonus (10% weight)
  score += gift.popularity;
  
  return Math.round(score);
}

/**
 * Calculate interest matching score
 */
function calculateInterestScore(gift: Gift, interests: string): number {
  if (!interests.trim()) return 0;
  
  const userInterests = interests.toLowerCase().split(/[,\s]+/).filter(i => i.length > 2);
  const giftInterests = gift.interests.map(i => i.toLowerCase());
  const giftTags = gift.tags.map(t => t.toLowerCase());
  
  let matches = 0;
  let totalChecks = userInterests.length;
  
  for (const userInterest of userInterests) {
    // Check direct interest matches
    if (giftInterests.some(gi => gi.includes(userInterest) || userInterest.includes(gi))) {
      matches += 2; // Higher weight for direct interest matches
    }
    // Check tag matches
    else if (giftTags.some(gt => gt.includes(userInterest) || userInterest.includes(gt))) {
      matches += 1; // Lower weight for tag matches
    }
    // Check category matches
    else if (gift.category.toLowerCase().includes(userInterest) || userInterest.includes(gift.category.toLowerCase())) {
      matches += 1;
    }
    // Check subcategory matches
    else if (gift.subcategory.toLowerCase().includes(userInterest) || userInterest.includes(gift.subcategory.toLowerCase())) {
      matches += 1;
    }
  }
  
  return totalChecks > 0 ? (matches / totalChecks) * 100 : 0;
}

/**
 * Calculate occasion matching score
 */
function calculateOccasionScore(gift: Gift, occasion: string): number {
  if (!occasion) return 0;
  
  const occasionMap: Record<string, string[]> = {
    'aniversario': ['aniversário', 'birthday'],
    'natal': ['natal', 'christmas'],
    'dia_das_maes': ['dia das mães', 'mothers day', 'mãe'],
    'dia_dos_pais': ['dia dos pais', 'fathers day', 'pai'],
    'formatura': ['formatura', 'graduation'],
    'promocao': ['promoção', 'promotion'],
    'casa_nova': ['casa nova', 'new home'],
    'casamento': ['casamento', 'wedding'],
    'viagem': ['viagem', 'travel'],
    'outro': ['outro', 'other']
  };
  
  const occasionKeywords = occasionMap[occasion] || [occasion];
  const giftOccasions = gift.occasions.map(o => o.toLowerCase());
  
  for (const keyword of occasionKeywords) {
    if (giftOccasions.some(go => go.includes(keyword) || keyword.includes(go))) {
      return 100;
    }
  }
  
  return 0;
}

/**
 * Calculate recipient type matching score
 */
function calculateRecipientScore(gift: Gift, recipient: string): number {
  if (!recipient) return 0;
  
  const recipientMap: Record<string, string[]> = {
    'amigo': ['amigo', 'friend'],
    'pai': ['pai', 'father'],
    'mae': ['mãe', 'mother'],
    'namorado': ['namorado', 'boyfriend', 'girlfriend'],
    'irmao': ['irmão', 'irmã', 'brother', 'sister'],
    'colega': ['colega', 'colleague', 'work']
  };
  
  const recipientKeywords = recipientMap[recipient] || [recipient];
  const giftRecipients = gift.recipientTypes.map(r => r.toLowerCase());
  
  for (const keyword of recipientKeywords) {
    if (giftRecipients.some(gr => gr.includes(keyword) || keyword.includes(gr))) {
      return 100;
    }
  }
  
  return 0;
}

/**
 * Generate human-readable reasons for why a gift was matched
 */
function generateMatchReasons(gift: Gift, criteria: GiftSearchCriteria): string[] {
  const reasons: string[] = [];
  
  // Age group reason
  if (gift.ageGroup === criteria.age) {
    const ageLabels: Record<string, string> = {
      'child': 'ideal para crianças',
      'teen': 'perfeito para adolescentes',
      'adult': 'excelente para adultos',
      'senior': 'ideal para idosos'
    };
    reasons.push(ageLabels[gift.ageGroup] || 'adequado para a faixa etária');
  }
  
  // Budget reason
  if (gift.priceRange === criteria.budget) {
    const budgetLabels: Record<string, string> = {
      'low': 'dentro do orçamento até R$50',
      'medium': 'dentro do orçamento de R$50-200',
      'high': 'dentro do orçamento de R$200-500',
      'premium': 'dentro do orçamento premium'
    };
    reasons.push(budgetLabels[gift.priceRange] || 'dentro do orçamento');
  }
  
  // Interest reasons
  const userInterests = criteria.interests.toLowerCase().split(/[,\s]+/).filter(i => i.length > 2);
  const matchingInterests = userInterests.filter(interest => 
    gift.interests.some(gi => gi.toLowerCase().includes(interest)) ||
    gift.tags.some(gt => gt.toLowerCase().includes(interest))
  );
  
  if (matchingInterests.length > 0) {
    reasons.push(`combina com os interesses: ${matchingInterests.join(', ')}`);
  }
  
  // Category reason
  reasons.push(`categoria: ${gift.category}`);
  
  // Popularity reason
  if (gift.popularity >= 8) {
    reasons.push('muito popular e bem avaliado');
  } else if (gift.popularity >= 6) {
    reasons.push('bem avaliado pelos usuários');
  }
  
  return reasons;
}

/**
 * Get price range display name
 */
export function getPriceRangeDisplay(priceRange: string): string {
  const range = PRICE_RANGES[priceRange as keyof typeof PRICE_RANGES];
  return range ? range.label : priceRange;
}

/**
 * Get category emoji
 */
export function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    'Tecnologia': '💻',
    'Livros': '📚',
    'Esportes': '⚽',
    'Casa': '🏠',
    'Moda': '👗',
    'Beleza': '💄',
    'Hobbies': '🎨',
    'Jogos': '🎮',
    'Saúde': '🏥'
  };
  
  return emojiMap[category] || '🎁';
}

/**
 * Format gift description for display
 */
export function formatGiftDescription(gift: Gift): string {
  let description = gift.description;
  
  // Add price range info
  const priceInfo = getPriceRangeDisplay(gift.priceRange);
  description += ` (${priceInfo})`;
  
  return description;
}
