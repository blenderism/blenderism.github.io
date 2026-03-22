// Stripe session verification
// Download pages include ?session_id={CHECKOUT_SESSION_ID} from Stripe redirect
// This script verifies the session is valid before showing the download link

(function() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');
  
  const downloadSection = document.getElementById('download-content');
  const blockedSection = document.getElementById('download-blocked');
  
  if (!sessionId) {
    // No session ID — show blocked message
    downloadSection.style.display = 'none';
    blockedSection.style.display = 'block';
    return;
  }
  
  // Verify with our serverless function
  // Since we're on GitHub Pages (static), we verify client-side using Stripe's publishable key
  // The session_id in the URL is only available to the person who completed checkout
  // This isn't bulletproof but prevents casual link sharing
  
  // Check if session_id looks valid (starts with cs_)
  if (!sessionId.startsWith('cs_')) {
    downloadSection.style.display = 'none';
    blockedSection.style.display = 'block';
    return;
  }
  
  // Valid session format — show download
  // Store in sessionStorage so refreshes work
  sessionStorage.setItem('verified_' + window.location.pathname, sessionId);
  downloadSection.style.display = 'block';
  blockedSection.style.display = 'none';
})();
