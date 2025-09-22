/**
 * Gift recipient interface
 */
export interface GiftRecipient {
  /** Recipient identifier */
  id: string;
  /** Display name */
  name: string;
  /** Search-friendly name */
  searchName: string;
}

/**
 * Budget range interface
 */
export interface BudgetRange {
  /** Budget identifier */
  id: string;
  /** Display name */
  name: string;
  /** Amazon price range code */
  amazonCode: string;
  /** Minimum price in cents */
  minPrice?: number;
  /** Maximum price in cents */
  maxPrice?: number;
}

/**
 * Gift search form data interface
 */
export interface GiftSearchForm {
  /** Selected recipient */
  recipient: string;
  /** Age group */
  age: string;
  /** Gender */
  gender: string;
  /** User interests */
  interests: string;
  /** Occasion */
  occasion: string;
  /** Selected budget range */
  budget: string;
}

/**
 * Amazon search parameters interface
 */
export interface AmazonSearchParams {
  /** Search keywords */
  keywords: string;
  /** Price range code */
  priceCode?: string;
  /** Sort parameter */
  sort: string;
}

/**
 * Gift suggestion interface
 */
export interface GiftSuggestion {
  /** Suggestion identifier */
  id: string;
  /** Generated search URL */
  searchUrl: string;
  /** Search keywords used */
  keywords: string;
  /** Budget range applied */
  budget: string;
  /** Recipient type */
  recipient: string;
  /** Timestamp of generation */
  timestamp: number;
}

/**
 * Extension state interface
 */
export interface ExtensionState {
  /** Current form data */
  formData: GiftSearchForm;
  /** Recent searches */
  recentSearches: GiftSuggestion[];
  /** Is form valid */
  isValid: boolean;
  /** Error message */
  error: string | null;
}

/**
 * Form validation interface
 */
export interface FormValidation {
  /** Is recipient valid */
  recipientValid: boolean;
  /** Is interests valid */
  interestsValid: boolean;
  /** Is budget valid */
  budgetValid: boolean;
  /** Overall form validity */
  isValid: boolean;
  /** Error messages */
  errors: string[];
}

/**
 * Amazon URL configuration interface
 */
export interface AmazonUrlConfig {
  /** Base Amazon URL */
  baseUrl: string;
  /** Search parameter key */
  searchKey: string;
  /** Price range parameter key */
  priceKey: string;
  /** Sort parameter key */
  sortKey: string;
  /** Sort by review value */
  sortByReview: string;
}

/**
 * Gift category interface
 */
export interface GiftCategory {
  /** Category identifier */
  id: string;
  /** Category name */
  name: string;
  /** Category keywords */
  keywords: string[];
  /** Category icon */
  icon: string;
}

/**
 * Search history interface
 */
export interface SearchHistory {
  /** History items */
  items: GiftSuggestion[];
  /** Maximum history size */
  maxSize: number;
  /** Last updated timestamp */
  lastUpdated: number;
}

/**
 * Extension configuration interface
 */
export interface ExtensionConfig {
  /** Extension version */
  version: string;
  /** Amazon URL configuration */
  amazonConfig: AmazonUrlConfig;
  /** Available recipients */
  recipients: GiftRecipient[];
  /** Available budget ranges */
  budgetRanges: BudgetRange[];
  /** Available gift categories */
  categories: GiftCategory[];
}

/**
 * Form field interface
 */
export interface FormField {
  /** Field identifier */
  id: string;
  /** Field label */
  label: string;
  /** Field type */
  type: 'select' | 'text' | 'textarea';
  /** Field placeholder */
  placeholder?: string;
  /** Field options (for select fields) */
  options?: Array<{ value: string; label: string }>;
  /** Field validation rules */
  validation?: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

/**
 * UI state interface
 */
export interface UIState {
  /** Is form loading */
  isLoading: boolean;
  /** Is form submitted */
  isSubmitted: boolean;
  /** Current step */
  currentStep: number;
  /** Total steps */
  totalSteps: number;
  /** Show success message */
  showSuccess: boolean;
  /** Success message */
  successMessage: string;
}

/**
 * Error interface
 */
export interface GiftError {
  /** Error message */
  message: string;
  /** Error type */
  type: 'VALIDATION' | 'NETWORK' | 'AMAZON' | 'UNKNOWN';
  /** Error timestamp */
  timestamp: number;
  /** Error context */
  context?: Record<string, any>;
}

/**
 * Analytics interface */
export interface Analytics {
  /** Total searches performed */
  totalSearches: number;
  /** Most searched recipient */
  mostSearchedRecipient: string;
  /** Most searched interests */
  mostSearchedInterests: string[];
  /** Most used budget range */
  mostUsedBudget: string;
  /** Last search timestamp */
  lastSearchTimestamp: number;
}

/**
 * Settings interface */
export interface Settings {
  /** Save search history */
  saveHistory: boolean;
  /** Maximum history size */
  maxHistorySize: number;
  /** Default recipient */
  defaultRecipient: string;
  /** Default budget */
  defaultBudget: string;
  /** Show tips */
  showTips: boolean;
  /** Analytics enabled */
  analyticsEnabled: boolean;
}

/**
 * Tip interface */
export interface Tip {
  /** Tip identifier */
  id: string;
  /** Tip title */
  title: string;
  /** Tip content */
  content: string;
  /** Tip category */
  category: 'general' | 'recipient' | 'interests' | 'budget';
  /** Tip icon */
  icon: string;
}

/**
 * Search result interface */
export interface SearchResult {
  /** Result identifier */
  id: string;
  /** Product title */
  title: string;
  /** Product URL */
  url: string;
  /** Product image URL */
  imageUrl: string;
  /** Product price */
  price: string;
  /** Product rating */
  rating: number;
  /** Number of reviews */
  reviewCount: number;
  /** Product availability */
  available: boolean;
}

/**
 * Gift idea interface */
export interface GiftIdea {
  /** Idea identifier */
  id: string;
  /** Idea title */
  title: string;
  /** Idea description */
  description: string;
  /** Idea category */
  category: string;
  /** Idea price range */
  priceRange: string;
  /** Idea recipient type */
  recipientType: string;
  /** Idea keywords */
  keywords: string[];
  /** Idea image URL */
  imageUrl: string;
  /** Idea popularity score */
  popularityScore: number;
}
