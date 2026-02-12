"use client";
import { MessageCircle, Sparkles, Stethoscope } from "lucide-react";
import { useState, useEffect } from "react";

export default function ChatButton({ onClick }: { onClick: () => void }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [shouldVibrate, setShouldVibrate] = useState(false);

  // Hide tooltip after 8 seconds on first load
  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => clearTimeout(tooltipTimer);
  }, []);

  // Vibrate animation every 10 seconds
  useEffect(() => {
    const vibrateInterval = setInterval(() => {
      setShouldVibrate(true);
      
      // Stop vibration after 1 second
      setTimeout(() => {
        setShouldVibrate(false);
      }, 1000);
    }, 10000); // Vibrate every 10 seconds

    return () => clearInterval(vibrateInterval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      {/* Tooltip */}
      <div
        className={`
          absolute bottom-full right-0 mb-3 transition-all duration-500
          ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
        `}
      >
        <div className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-3 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 min-w-[280px]">
          {/* Medical Icon */}
          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full p-1.5 shadow-lg animate-bounce">
            <Stethoscope size={14} className="text-white" />
          </div>
          
          {/* Tooltip Text */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
              <MessageCircle size={16} />
              Learn about Malaria
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Symptoms • Treatment • Prevention • More
            </p>
          </div>
          
          {/* Tooltip Arrow */}
          <div className="absolute top-full right-6 -mt-px">
            <div className="border-8 border-transparent border-t-white dark:border-t-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => {
          onClick();
          setShowTooltip(false);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          // Don't hide tooltip on hover if it's within first 8 seconds
          setTimeout(() => setShowTooltip(false), 2000);
        }}
        aria-label="Open malaria information assistant"
        className={`
          relative w-16 h-16 rounded-full shadow-2xl
          bg-gradient-to-br from-sky-500 to-blue-600
          hover:from-sky-600 hover:to-blue-700
          text-white flex items-center justify-center
          transform hover:scale-110 active:scale-95
          transition-all duration-300 ease-out
          ${shouldVibrate ? 'animate-vibrate' : ''}
          group
        `}
      >
        {/* Pulse Ring Animation */}
        <span className="absolute inset-0 rounded-full bg-sky-400 opacity-75 animate-ping-slow" />
        <span className="absolute inset-0 rounded-full bg-sky-500 opacity-50 animate-pulse-ring" />
        
        {/* Icon */}
        <MessageCircle 
          size={28} 
          className="relative z-10 group-hover:rotate-12 transition-transform duration-300" 
        />
        
        {/* Info Badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center animate-bounce-subtle">
          <Sparkles size={12} className="text-white" />
        </span>
      </button>

      {/* Bottom Hint Text (appears after tooltip fades) */}
      <div
        className={`
          absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
          transition-all duration-500 text-xs font-medium text-gray-600 dark:text-gray-400
          ${!showTooltip ? 'opacity-100' : 'opacity-0'}
        `}
      >
        Malaria Info
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes vibrate {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, -2px) rotate(-2deg); }
          20% { transform: translate(2px, -1px) rotate(2deg); }
          30% { transform: translate(-2px, 1px) rotate(-1deg); }
          40% { transform: translate(2px, 2px) rotate(1deg); }
          50% { transform: translate(-2px, -1px) rotate(-2deg); }
          60% { transform: translate(2px, 1px) rotate(2deg); }
          70% { transform: translate(-2px, 2px) rotate(-1deg); }
          80% { transform: translate(2px, -2px) rotate(1deg); }
          90% { transform: translate(-2px, -1px) rotate(-2deg); }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-vibrate {
          animation: vibrate 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}