export default function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical styles for above-the-fold content */
        .hero-section {
          position: relative;
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          background-color: white;
          overflow-x: hidden;
          padding: 1rem;
        }
        
        .hero-title {
          font-family: 'Fustat', serif;
          font-weight: 900;
          font-size: clamp(1.5rem, 4vw, 3.5rem);
          color: #669B80;
          text-align: center;
          margin-bottom: 1rem;
          line-height: 1.2;
          opacity: 1;
          transform: translateY(0);
        }
        
        .hero-subtitle {
          font-family: 'Rubik', sans-serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: #374151;
          text-align: center;
          line-height: 1.6;
          max-width: 579px;
          margin: 0 auto;
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Preload animations to prevent FOUC */
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `
    }} />
  );
}
