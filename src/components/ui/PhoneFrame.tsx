import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto w-[320px] h-[650px]">
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-black rounded-[50px] shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
          <div className="w-40 h-6 bg-black rounded-b-3xl" />
        </div>
        
        {/* Screen */}
        <div className="absolute top-1 right-1 bottom-1 left-1 bg-white rounded-[46px] overflow-hidden">
          {/* Status Bar */}
          <div className="h-12 bg-black flex items-center px-6">
            <div className="flex-1">
              <div className="text-white text-sm font-medium">9:41</div>
            </div>
            <div className="space-x-1.5 flex">
              <div className="w-4 h-4 bg-white rounded-full opacity-75" />
              <div className="w-4 h-4 bg-white rounded-full opacity-75" />
              <div className="w-6 h-3 bg-white rounded-sm opacity-75" />
            </div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 top-12 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}