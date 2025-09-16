"use client";
import { useEffect, useState } from "react";

export default function SWRegister() {
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", { 
          scope: "/" 
        });
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, prompt user to refresh
                if (confirm('New content is available. Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });

        console.log('SW registered successfully');
      } catch (e) {
        console.error("SW registration failed", e);
      }
    };

    // Register service worker
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    // Handle install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("load", register);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <>
      {/* Online/Offline indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm z-50">
          You are offline. Some features may not work.
        </div>
      )}
      
      {/* Install prompt */}
      {installPrompt && (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:w-80 bg-white shadow-lg rounded-lg p-4 border z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">Install App</p>
              <p className="text-xs text-gray-600">Add to home screen for quick access</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setInstallPrompt(null)}
                className="text-gray-500 text-xs px-2 py-1"
              >
                Later
              </button>
              <button
                onClick={handleInstall}
                className="bg-indigo-600 text-white text-xs px-3 py-1 rounded"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
