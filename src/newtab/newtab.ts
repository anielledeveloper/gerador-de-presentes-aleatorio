import { 
  GiftSearchForm, 
  GiftSuggestion, 
  ExtensionState, 
  FormValidation,
  AmazonSearchParams,
  BudgetRange,
  GiftRecipient
} from '../types/interfaces';
import { findGiftMatches, GiftSearchCriteria, GiftMatch, getCategoryEmoji, formatGiftDescription, getPriceRangeDisplay } from '../utils/giftMatcher';

/**
 * New tab script for Gerador de Presentes Aleatório
 * Handles form submission and Amazon search URL generation
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

// Gift matching state
let currentGiftMatches: GiftMatch[] = [];

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
let ageSelect!: HTMLSelectElement;
let genderSelect!: HTMLSelectElement;
let interestsInput!: HTMLInputElement;
let occasionSelect!: HTMLSelectElement;
let budgetSelect!: HTMLSelectElement;
let generateBtn!: HTMLButtonElement;
let giftResults!: HTMLDivElement;
let giftList!: HTMLDivElement;
let recentSearches!: HTMLDivElement;
let recentList!: HTMLDivElement;
let successToast!: HTMLDivElement;
let errorToast!: HTMLDivElement;

/**
 * Initialize the new tab page
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Gerador de Presentes Aleatório: New tab initialized');
  
  try {
    // Get DOM elements
    initializeDOMElements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load recent searches
    loadRecentSearches();
    
    // Initialize form validation
    initializeFormValidation();
    
    console.log('New tab page ready');
  } catch (error) {
    console.error('Error initializing new tab page:', error);
    showError('Erro ao inicializar página');
  }
});

/**
 * Initialize DOM elements
 */
function initializeDOMElements(): void {
  giftForm = document.getElementById('gift-form') as HTMLFormElement;
  recipientSelect = document.getElementById('recipient-select') as HTMLSelectElement;
  ageSelect = document.getElementById('age-select') as HTMLSelectElement;
  genderSelect = document.getElementById('gender-select') as HTMLSelectElement;
  interestsInput = document.getElementById('interests-input') as HTMLInputElement;
  occasionSelect = document.getElementById('occasion-select') as HTMLSelectElement;
  budgetSelect = document.getElementById('budget-select') as HTMLSelectElement;
  generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
  giftResults = document.getElementById('gift-results') as HTMLDivElement;
  giftList = document.getElementById('gift-list') as HTMLDivElement;
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
  ageSelect.addEventListener('change', handleFormChange);
  genderSelect.addEventListener('change', handleFormChange);
  interestsInput.addEventListener('input', handleFormChange);
  occasionSelect.addEventListener('change', handleFormChange);
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
    
    // Find gift matches using intelligent algorithm
    const searchCriteria: GiftSearchCriteria = {
      recipient: formData.recipient,
      age: formData.age,
      gender: formData.gender,
      interests: formData.interests,
      occasion: formData.occasion,
      budget: formData.budget
    };
    
    currentGiftMatches = findGiftMatches(searchCriteria);
    
    if (currentGiftMatches.length === 0) {
      showError('Nenhum presente encontrado. Tente ajustar os critérios de busca.');
      return;
    }
    
    // Display gift suggestions
    displayGiftSuggestions(currentGiftMatches);
    
    // Save to recent searches
    const suggestion: GiftSuggestion = {
      id: generateId(),
      searchUrl: '', // No longer using Amazon search
      keywords: formData.interests,
      budget: formData.budget,
      recipient: formData.recipient,
      timestamp: Date.now()
    };
    
    saveRecentSearch(suggestion);
    
    // Show success message
    showSuccess(`Encontrados ${currentGiftMatches.length} presentes perfeitos!`);
    
    // Update recent searches display
    updateRecentSearchesDisplay();
    
    console.log('Gift matches found:', currentGiftMatches);
  } catch (error) {
    console.error('Error handling form submission:', error);
    showError('Erro ao encontrar presentes');
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
    age: ageSelect.value,
    gender: genderSelect.value,
    interests: interestsInput.value.trim(),
    occasion: occasionSelect.value,
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
  
  if (!ageSelect.value) {
    validation.errors.push('Selecione uma faixa etária');
  }
  
  if (!genderSelect.value) {
    validation.errors.push('Selecione um gênero');
  }
  
  if (!validation.interestsValid) {
    validation.errors.push('Digite os interesses');
  }
  
  if (!occasionSelect.value) {
    validation.errors.push('Selecione uma ocasião');
  }
  
  if (!validation.budgetValid) {
    validation.errors.push('Selecione um orçamento');
  }
  
  // Overall validation
  validation.isValid = validation.recipientValid && 
                      ageSelect.value !== '' && 
                      genderSelect.value !== '' && 
                      validation.interestsValid && 
                      occasionSelect.value !== '' && 
                      validation.budgetValid;
  
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
 * Display gift suggestions
 */
function displayGiftSuggestions(matches: GiftMatch[]): void {
  giftResults.style.display = 'block';
  giftList.innerHTML = '';
  
  matches.forEach((match, index) => {
    const giftItem = createGiftItem(match, index + 1);
    giftList.appendChild(giftItem);
  });
  
  // Scroll to results
  giftResults.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Create gift item element
 */
function createGiftItem(match: GiftMatch, rank: number): HTMLDivElement {
  const item = document.createElement('div');
  item.className = 'gift-item';
  
  const emoji = getCategoryEmoji(match.gift.category);
  const priceRange = getPriceRangeDisplay(match.gift.priceRange);
  const score = Math.round(match.score);
  
  item.innerHTML = `
    <div class="gift-rank">#${rank}</div>
    <div class="gift-content">
      <div class="gift-header">
        <div class="gift-category">${emoji} ${match.gift.category}</div>
        <div class="gift-score">${score}% match</div>
      </div>
      <h4 class="gift-name">${match.gift.name}</h4>
      <p class="gift-description">${formatGiftDescription(match.gift)}</p>
      <div class="gift-reasons">
        ${match.reasons.map(reason => `<span class="reason-tag">${reason}</span>`).join('')}
      </div>
    </div>
    <div class="gift-actions">
      <button class="gift-btn primary" data-gift-name="${match.gift.name}">
        🔍 Buscar Online
      </button>
    </div>
  `;
  
  // Add event listener to the button
  const searchBtn = item.querySelector('.gift-btn') as HTMLButtonElement;
  searchBtn.addEventListener('click', () => {
    searchGiftOnline(match.gift.name);
  });
  
  return item;
}

/**
 * Search gift online (placeholder function)
 */
function searchGiftOnline(giftName: string): void {
  const searchQuery = encodeURIComponent(giftName);
  const searchUrl = `${SEARCH_BASE_URL}?${SEARCH_KEY}=${searchQuery}`;
  
  if (typeof chrome !== 'undefined' && chrome.tabs) {
    chrome.tabs.create({ url: searchUrl, active: true });
  } else {
    window.open(searchUrl, '_blank');
  }
}

// searchGiftOnline is now used via event listeners, no need for global assignment

/**
 * Open search in new tab (placeholder function)
 */
async function openSearch(url: string): Promise<void> {
  try {
    console.log('Opening search URL:', url);
    
    // Check if we're in a Chrome extension context
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      // Use Chrome tabs API
      const tab = await chrome.tabs.create({ 
        url: url,
        active: true 
      });
      console.log('Search opened in tab:', tab.id);
    } else {
      // Fallback to window.open for non-extension contexts
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }
      console.log('Search opened in new window');
    }
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
  
  // Save to storage if Chrome API is available
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({ recentSearches: extensionState.recentSearches });
  } else {
    // Fallback to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(extensionState.recentSearches));
  }
}

/**
 * Load recent searches
 */
async function loadRecentSearches(): Promise<void> {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // Use Chrome storage API
      const result = await chrome.storage.local.get('recentSearches');
      if (result.recentSearches) {
        extensionState.recentSearches = result.recentSearches;
        updateRecentSearchesDisplay();
      }
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem('recentSearches');
      if (stored) {
        extensionState.recentSearches = JSON.parse(stored);
        updateRecentSearchesDisplay();
      }
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
  validateForm, 
  showSuccess, 
  showError 
};
