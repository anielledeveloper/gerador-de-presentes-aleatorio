/**
 * Background script for Gerador de Presentes Aleatório
 * Handles extension icon clicks to open new tab
 */

/**
 * Handle extension icon click
 */
chrome.action.onClicked.addListener(async (tab) => {
  try {
    console.log('Extension icon clicked, opening new tab');
    
    // Open the extension page in a new tab
    await chrome.tabs.create({
      url: chrome.runtime.getURL('newtab.html'),
      active: true
    });
    
    console.log('New tab opened with extension page');
  } catch (error) {
    console.error('Error opening new tab:', error);
  }
});

/**
 * Handle extension installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Gerador de Presentes Aleatório installed:', details.reason);
});

/**
 * Handle extension startup
 */
chrome.runtime.onStartup.addListener(() => {
  console.log('Gerador de Presentes Aleatório started');
});
