
import React, { useState, useEffect } from 'react';
import { SeasonalTheme } from '../types';
import { GearIcon, DesktopIcon, MobileIcon } from './icons';

interface HeaderProps {
  theme: SeasonalTheme;
  onOpenSettings: () => void;
  uiMode: 'desktop' | 'mobile';
  onToggleUiMode: (mode: 'desktop' | 'mobile') => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onOpenSettings, uiMode, onToggleUiMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = uiMode === 'mobile';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Dynamic sizing classes
  const containerClass = isMobile ? 'p-3 mb-4' : 'p-4 mb-6';
  const titleClass = isMobile ? 'text-lg' : 'text-2xl md:text-3xl';
  const dateClass = isMobile ? 'text-xs' : 'text-base';
  const clockClass = isMobile ? 'text-xl' : 'text-3xl md:text-4xl';
  const btnClass = isMobile ? 'p-1.5' : 'p-2';

  return (
    <header className={`${containerClass} rounded-lg shadow-lg ${theme.cardBg} ${theme.primaryTextColor} transition-all duration-300`}>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h1 className={`${titleClass} font-bold flex items-center gap-2 md:gap-3`}>
            {theme.icon}
            <span>{theme.greeting}</span>
          </h1>
          <p className={`mt-1 ${theme.secondaryTextColor} ${dateClass}`}>{formatDate(currentTime)}</p>
        </div>
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <div className={`text-right ${isMobile ? 'hidden' : 'hidden sm:block'}`}>
            <p className={`${clockClass} font-mono tracking-wider`}>{formatTime(currentTime)}</p>
          </div>
          
          {/* UI Mode Toggle */}
          <div className="flex bg-slate-800/50 rounded-lg p-1 border border-white/10">
            <button 
                onClick={() => onToggleUiMode('desktop')}
                className={`${btnClass} rounded-md transition-all ${uiMode === 'desktop' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                title="Giao diện Máy tính"
            >
                <DesktopIcon className={isMobile ? "text-xs" : ""} />
            </button>
            <button 
                onClick={() => onToggleUiMode('mobile')}
                className={`${btnClass} rounded-md transition-all ${uiMode === 'mobile' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                title="Giao diện Điện thoại"
            >
                <MobileIcon className={isMobile ? "text-xs" : ""} />
            </button>
          </div>

          <button 
            onClick={onOpenSettings}
            className={`${btnClass} rounded-full hover:bg-white/10 transition-colors ${theme.secondaryTextColor} hover:text-white`}
            title="Cài đặt & Dữ liệu"
          >
            <GearIcon className={isMobile ? "text-base" : "text-xl"} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
