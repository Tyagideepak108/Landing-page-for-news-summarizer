// Phase 2: The Action (JS Logic - The Script)

class PageTransitionManager {
  constructor() {
    this.isTransitioning = false
    this.transitionDuration = 600 // 0.6 seconds
  }

  // Step 1: Intercept Click (Roko!)
  interceptNavigation(targetUrl, event) {
    // Browser ko bolo: "Ruk ja bhai! Abhi naya page mat khol."
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    // Agar already transition chal raha hai to ignore kar do
    if (this.isTransitioning) return false

    // Current page check kar lo
    if (window.location.pathname === targetUrl) return false

    // Transition start kar do
    this.startTransition(targetUrl)
    return true
  }

  // Step 2: Trigger Exit Animation (Jaadu Shuru)
  startTransition(targetUrl) {
    this.isTransitioning = true
    
    // Current page par State B wali class laga do
    const mainContainer = document.body
    mainContainer.classList.add('page-exit')
    mainContainer.classList.remove('page-normal', 'page-enter')

    // Step 3: Wait (Intezaar) - Animation complete hone ka wait kar
    setTimeout(() => {
      this.completTransition(targetUrl)
    }, this.transitionDuration / 2) // Half duration par page change kar do
  }

  // Step 4: Change Page (Switch)
  completTransition(targetUrl) {
    // "Ja Simran, naya URL load kar le."
    window.location.href = targetUrl
    
    // Reset transition state
    this.isTransitioning = false
  }

  // New page load hone par entry animation
  initializeNewPage() {
    const mainContainer = document.body
    
    // Initially State C (entry) set kar do
    mainContainer.classList.add('page-enter')
    mainContainer.classList.remove('page-normal', 'page-exit')

    // Thoda wait kar ke normal state mein le jao
    setTimeout(() => {
      mainContainer.classList.add('page-enter-active')
      mainContainer.classList.remove('page-enter')
      
      // Animation complete hone par normal state
      setTimeout(() => {
        mainContainer.classList.add('page-normal')
        mainContainer.classList.remove('page-enter-active')
      }, this.transitionDuration)
    }, 50)
  }
}

// Global instance banao
window.pageTransitionManager = new PageTransitionManager()

// Page load hone par initialize kar do
document.addEventListener('DOMContentLoaded', () => {
  window.pageTransitionManager.initializeNewPage()
})

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PageTransitionManager
}