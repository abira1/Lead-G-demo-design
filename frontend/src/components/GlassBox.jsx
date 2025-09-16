import React from 'react';

const GlassBox = ({ 
  children, 
  className = "", 
  blur = 12,
  opacity = 0.1,
  border = true,
  noise = true,
  ...props 
}) => {
  const glassStyles = {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: border ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    backgroundImage: noise ? `
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0),
      radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)
    ` : 'none',
    backgroundSize: noise ? '10px 10px, 20px 20px' : 'none',
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={glassStyles}
      {...props}
    >
      {noise && (
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassBox;