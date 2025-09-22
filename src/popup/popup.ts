import { 
  GiftSearchForm, 
  GiftSuggestion, 
  ExtensionState, 
  FormValidation,
  AmazonSearchParams,
  BudgetRange,
  GiftRecipient
} from '../types/interfaces';

/**
 * Popup script for Gerador de Presentes Aleatório
 * Handles form submission and search URL generation
 */

// Extension state
let extensionState: ExtensionState = {
  formData: {
    recipient: '',
    age: '',
    gender: '',
    interests: '',
    occasion: '',
    budget: ''
  },
  recentSearches: [],
  isValid: false,
  error: null
};

// Configuration
const SEARCH_BASE_URL = 'https://example.com/search';
const SEARCH_KEY = 'q';

// Recipients mapping
const RECIPIENTS: Record<string, string> = {
  'amigo': 'amigo',
  'pai': 'pai',
  'mae': 'mãe',
  'namorado': 'namorado',
  'irmao': 'irmão',
  'colega': 'colega de trabalho'
};

// Budget ranges mapping (placeholder)
const BUDGET_RANGES: Record<string, string> = {
  'low': '0-50',
  'medium': '50-200',
  'high': '200-500',
  'premium': '500+'
};

// DOM elements
let giftForm!: HTMLFormElement;
let recipientSelect!: HTMLSelectElement;
let interestsInput!: HTMLInputElement;
let budgetSelect!: HTMLSelectElement;
let generateBtn!: HTMLButtonElement;
let recentSearches!: HTMLDivElement;
let recentList!: HTMLDivElement;
let successToast!: HTMLDivElement;
let errorToast!: HTMLDivElement;

/**
 * Initialize the popup
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Gerador de Presentes Aleatório: Popup initialized');
  
  try {
    // Get DOM elements
    initializeDOMElements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load recent searches
    loadRecentSearches();
    
    // Initialize form validation
    initializeFormValidation();
    
    console.log('Popup ready');
  } catch (error) {
    console.error('Error initializing popup:', error);
    showError('Erro ao inicializar popup');
  }
});

/**
 * Initialize DOM elements
 */
function initializeDOMElements(): void {
  giftForm = document.getElementById('gift-form') as HTMLFormElement;
  recipientSelect = document.getElementById('recipient-select') as HTMLSelectElement;
  interestsInput = document.getElementById('interests-input') as HTMLInputElement;
  budgetSelect = document.getElementById('budget-select') as HTMLSelectElement;
  generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
  recentSearches = document.getElementById('recent-searches') as HTMLDivElement;
  recentList = document.getElementById('recent-list') as HTMLDivElement;
  successToast = document.getElementById('success-toast') as HTMLDivElement;
  errorToast = document.getElementById('error-toast') as HTMLDivElement;
}

/**
 * Set up event listeners
 */
function setupEventListeners(): void {
  // Form submission
  giftForm.addEventListener('submit', handleFormSubmit);
  
  // Form field changes
  recipientSelect.addEventListener('change', handleFormChange);
  interestsInput.addEventListener('input', handleFormChange);
  budgetSelect.addEventListener('change', handleFormChange);
  
  // Button click
  generateBtn.addEventListener('click', handleGenerateClick);
}

/**
 * Initialize form validation
 */
function initializeFormValidation(): void {
  // Real-time validation
  interestsInput.addEventListener('input', validateInterests);
  
  // Initial validation
  validateForm();
}

/**
 * Handle form submission
 */
async function handleFormSubmit(event: Event): Promise<void> {
  event.preventDefault();
  
  try {
    // Validate form
    if (!validateForm()) {
      showError('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Get form data
    const formData = getFormData();
    
    // Show loading state
    setLoadingState(true);
    
    // Generate search URL
    const searchUrl = generateSearchUrl(formData);
    
    // Create gift suggestion
    const suggestion: GiftSuggestion = {
      id: generateId(),
      searchUrl,
      keywords: formData.interests,
      budget: formData.budget,
      recipient: formData.recipient,
      timestamp: Date.now()
    };
    
    // Save to recent searches
    saveRecentSearch(suggestion);
    
    // Open search in new tab
    await openSearch(searchUrl);
    
    // Show success message
    showSuccess('Buscando presentes online...');
    
    // Update recent searches display
    updateRecentSearchesDisplay();
    
    console.log('Gift search generated:', suggestion);
  } catch (error) {
    console.error('Error handling form submission:', error);
    showError('Erro ao gerar busca de presentes');
  } finally {
    setLoadingState(false);
  }
}

/**
 * Handle form field changes
 */
function handleFormChange(): void {
  // Update form data
  extensionState.formData = getFormData();
  
  // Validate form
  validateForm();
}

/**
 * Handle generate button click
 */
function handleGenerateClick(): void {
  // Trigger form submission
  giftForm.dispatchEvent(new Event('submit'));
}

/**
 * Get form data
 */
function getFormData(): GiftSearchForm {
  return {
    recipient: recipientSelect.value,
    age: '',
    gender: '',
    interests: interestsInput.value.trim(),
    occasion: '',
    budget: budgetSelect.value
  };
}

/**
 * Validate form
 */
function validateForm(): boolean {
  const validation: FormValidation = {
    recipientValid: recipientSelect.value !== '',
    interestsValid: interestsInput.value.trim() !== '',
    budgetValid: budgetSelect.value !== '',
    isValid: false,
    errors: []
  };
  
  // Check individual fields
  if (!validation.recipientValid) {
    validation.errors.push('Selecione um destinatário');
  }
  
  if (!validation.interestsValid) {
    validation.errors.push('Digite os interesses');
  }
  
  if (!validation.budgetValid) {
    validation.errors.push('Selecione um orçamento');
  }
  
  // Overall validation
  validation.isValid = validation.recipientValid && validation.interestsValid && validation.budgetValid;
  
  // Update extension state
  extensionState.isValid = validation.isValid;
  extensionState.error = validation.errors.length > 0 ? validation.errors.join(', ') : null;
  
  // Update button state
  generateBtn.disabled = !validation.isValid;
  
  return validation.isValid;
}

/**
 * Validate interests input
 */
function validateInterests(): void {
  const interests = interestsInput.value.trim();
  const isValid = interests.length >= 2;
  
  // Update input appearance
  if (isValid) {
    interestsInput.classList.remove('invalid');
    interestsInput.classList.add('valid');
  } else {
    interestsInput.classList.remove('valid');
    interestsInput.classList.add('invalid');
  }
}

/**
 * Generate search URL
 */
function generateSearchUrl(formData: GiftSearchForm): string {
  // Build search keywords
  const recipientName = RECIPIENTS[formData.recipient] || formData.recipient;
  const keywords = `ideias de presente para ${recipientName} ${formData.interests}`;
  const encodedKeywords = encodeURIComponent(keywords);
  
  // Build URL parameters
  const params = new URLSearchParams();
  params.set(SEARCH_KEY, encodedKeywords);
  
  // Add price range if specified
  const priceCode = BUDGET_RANGES[formData.budget];
  if (priceCode) {
    params.set('price', priceCode);
  }
  
  // Build final URL
  const searchUrl = `${SEARCH_BASE_URL}?${params.toString()}`;
  
  console.log('Generated search URL:', searchUrl);
  return searchUrl;
}

/**
 * Open search in new tab
 */
async function openSearch(url: string): Promise<void> {
  try {
    console.log('Opening search URL:', url);
    
    // Check if chrome.tabs is available
    if (!chrome.tabs) {
      throw new Error('Chrome tabs API not available');
    }
    
    // Create new tab
    const tab = await chrome.tabs.create({ 
      url: url,
      active: true 
    });
    
    console.log('Search opened in tab:', tab.id);
  } catch (error) {
    console.error('Error opening search:', error);
    throw new Error('Erro ao abrir busca: ' + (error as Error).message);
  }
}

/**
 * Save recent search
 */
function saveRecentSearch(suggestion: GiftSuggestion): void {
  // Add to beginning of array
  extensionState.recentSearches.unshift(suggestion);
  
  // Keep only last 5 searches
  if (extensionState.recentSearches.length > 5) {
    extensionState.recentSearches = extensionState.recentSearches.slice(0, 5);
  }
  
  // Save to storage
  chrome.storage.local.set({ recentSearches: extensionState.recentSearches });
}

/**
 * Load recent searches
 */
async function loadRecentSearches(): Promise<void> {
  try {
    const result = await chrome.storage.local.get('recentSearches');
    if (result.recentSearches) {
      extensionState.recentSearches = result.recentSearches;
      updateRecentSearchesDisplay();
    }
  } catch (error) {
    console.error('Error loading recent searches:', error);
  }
}

/**
 * Update recent searches display
 */
function updateRecentSearchesDisplay(): void {
  if (extensionState.recentSearches.length === 0) {
    recentSearches.style.display = 'none';
    return;
  }
  
  recentSearches.style.display = 'block';
  recentList.innerHTML = '';
  
  extensionState.recentSearches.forEach((search, index) => {
    const searchItem = createRecentSearchItem(search, index);
    recentList.appendChild(searchItem);
  });
}

/**
 * Create recent search item
 */
function createRecentSearchItem(search: GiftSuggestion, index: number): HTMLDivElement {
  const item = document.createElement('div');
  item.className = 'recent-item';
  
  const recipientName = RECIPIENTS[search.recipient] || search.recipient;
  const budgetName = getBudgetDisplayName(search.budget);
  
  item.innerHTML = `
    <div class="recent-item-content">
      <div class="recent-item-title">${recipientName} - ${search.keywords}</div>
      <div class="recent-item-meta">${budgetName} • ${formatTime(search.timestamp)}</div>
    </div>
    <button class="recent-item-btn" data-url="${search.searchUrl}">
      🔍
    </button>
  `;
  
  // Add click listener
  const btn = item.querySelector('.recent-item-btn') as HTMLButtonElement;
  btn.addEventListener('click', () => {
    openSearch(search.searchUrl);
  });
  
  return item;
}

/**
 * Get budget display name
 */
function getBudgetDisplayName(budget: string): string {
  const budgetNames: Record<string, string> = {
    'qualquer': 'Qualquer Valor',
    'ate50': 'Até R$50',
    '50a100': 'R$50 a R$100',
    '100a200': 'R$100 a R$200',
    'acima200': 'Acima de R$200'
  };
  
  return budgetNames[budget] || budget;
}

/**
 * Set loading state
 */
function setLoadingState(isLoading: boolean): void {
  generateBtn.disabled = isLoading;
  
  const btnText = generateBtn.querySelector('.btn-text') as HTMLSpanElement;
  const btnLoading = generateBtn.querySelector('.btn-loading') as HTMLSpanElement;
  
  if (isLoading) {
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
  } else {
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  }
}

/**
 * Show success message
 */
function showSuccess(message: string): void {
  const toastMessage = successToast.querySelector('.toast-message') as HTMLSpanElement;
  toastMessage.textContent = message;
  
  successToast.classList.add('show');
  
  setTimeout(() => {
    successToast.classList.remove('show');
  }, 3000);
}

/**
 * Show error message
 */
function showError(message: string): void {
  const toastMessage = errorToast.querySelector('.toast-message') as HTMLSpanElement;
  toastMessage.textContent = message;
  
  errorToast.classList.add('show');
  
  setTimeout(() => {
    errorToast.classList.remove('show');
  }, 3000);
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format timestamp
 */
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  if (diff < 60000) { // Less than 1 minute
    return 'Agora';
  } else if (diff < 3600000) { // Less than 1 hour
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m atrás`;
  } else if (diff < 86400000) { // Less than 1 day
    const hours = Math.floor(diff / 3600000);
    return `${hours}h atrás`;
  } else {
    return date.toLocaleDateString('pt-BR');
  }
}

// Export for testing purposes
export { 
  extensionState, 
  generateSearchUrl, 
  validateForm, 
  showSuccess, 
  showError 
};
