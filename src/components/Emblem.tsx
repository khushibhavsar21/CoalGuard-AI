import React from 'react';

export const CoalGuardLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => {
  return (
    <div className={`flex items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm ${className}`} style={{ width: size, height: size }}>
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield */}
        <path d="M12 2L3 6V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V6L12 2Z" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#0F172A" />
        {/* Coal Pickaxe / Mining diamond & AI circuit node */}
        <path d="M12 7L16 11L12 15L8 11L12 7Z" fill="#38BDF8" />
        <circle cx="12" cy="11" r="1.5" fill="#0F172A" />
        <path d="M12 15V19" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 19H15" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const IndiaGovEmblem: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Ashoka Stambh minimalist vector */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-amber-600">
        <path d="M12 2C10.9 2 10 2.9 10 4V6H14V4C14 2.9 13.1 2 12 2ZM7 6V11C7 11.6 7.4 12 8 12H9V14H7C6.4 14 6 14.4 6 15V19C6 19.6 6.4 20 7 20H17C17.6 20 18 19.6 18 19V15C18 14.4 17.6 14 17 14H15V12H16C16.6 12 17 11.6 17 11V6H19V4H17V3C17 2.4 16.6 2 16 2H15V4H9V2H8C7.4 2 7 2.4 7 3V4H5V6H7ZM11 14H13V18H11V14Z" opacity="0.9" />
        <circle cx="12" cy="16" r="1" fill="#FFFFFF" />
      </svg>
      <span className="text-[9px] font-bold tracking-wider text-slate-700 uppercase leading-none mt-0.5">सत्यमेव जयते</span>
    </div>
  );
};
