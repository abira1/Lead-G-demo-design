import React from 'react';

const GlassBox = ({ 
  children, 
  className = "", 
  blur = 12,
  opacity = 0.1,
  border = true,
  noise = true,
  hover = true,
  glow = false,
  hoverScale = 1.02,
  ...props 
}) => {
  const baseClasses = `
    relative overflow-hidden transition-all duration-500 ease-out
    ${hover ? 'hover:shadow-2xl hover:shadow-cyan-500/10' : ''}
    ${glow ? 'hover:shadow-lg hover:shadow-cyan-400/20' : ''}
    ${className}
  `;

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
    transform: 'translateZ(0)', // Hardware acceleration
    willChange: 'transform, box-shadow, background-color',
  };

  return (
    <div
      className={baseClasses}
      style={glassStyles}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = `scale(${hoverScale}) translateZ(0)`;
          e.currentTarget.style.background = `rgba(255, 255, 255, ${Math.min(opacity + 0.03, 0.25)})`;
          if (border) {
            e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.3)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'scale(1) translateZ(0)';
          e.currentTarget.style.background = `rgba(255, 255, 255, ${opacity})`;
          if (border) {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }
        }
      }}
      {...props}
    >
      {/* Enhanced border gradient on hover */}
      {border && (
        <div className="absolute inset-0 rounded-inherit opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div 
            className="absolute inset-0 rounded-inherit"
            style={{
              background: 'linear-gradient(45deg, rgba(0, 255, 209, 0.2), rgba(142, 102, 255, 0.2), rgba(255, 110, 180, 0.2))',
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'subtract',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'subtract'
            }}
          />
        </div>
      )}

      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'linear-gradient(45deg, rgba(0, 255, 209, 0.1), rgba(142, 102, 255, 0.1), rgba(255, 110, 180, 0.1))',
          }}
        />
      </div>

      {noise && (
        <div 
          className="absolute inset-0 opacity-5 transition-opacity duration-300"
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