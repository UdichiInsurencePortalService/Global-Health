
import { Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

// Insurance Themed Preloader Component
const Preloader = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Ambient Background Stars */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: 'white',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', maxWidth: '90%' }}>
        {/* Main Star Animation */}
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          margin: '0 auto 40px'
        }}>
          {/* Rotating Stars */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `orbit ${3 + i * 0.3}s linear infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              <svg
                width={40 - i * 5}
                height={40 - i * 5}
                viewBox="0 0 24 24"
                style={{
                  filter: `drop-shadow(0 0 ${8 - i}px rgba(255, 255, 255, 0.8))`,
                  animation: `starPulse ${1.5 + i * 0.2}s ease-in-out infinite`
                }}
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`rgba(255, 255, 255, ${1 - i * 0.15})`}
                />
              </svg>
            </div>
          ))}

          {/* Center Star */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'centerStar 2s ease-in-out infinite'
          }}>
            <svg width="50" height="50" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="white"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 1))'
                }}
              />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '20px',
          letterSpacing: '1px',
          animation: 'fadeInOut 2s ease-in-out infinite'
        }}>
        Global-Health
        </h3>

        {/* Dot Animation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px',
          marginBottom: '30px'
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'white',
                animation: 'dotBounce 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          margin: '0 auto',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, transparent, white, transparent)',
            animation: 'shimmer 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes orbit {
          from { 
            transform: translate(-50%, -50%) rotate(0deg) translateX(50px) rotate(0deg);
          }
          to { 
            transform: translate(-50%, -50%) rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }

        @keyframes starPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes centerStar {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.3) rotate(180deg);
          }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes dotBounce {
          0%, 80%, 100% { 
            transform: translateY(0);
            opacity: 0.5;
          }
          40% { 
            transform: translateY(-12px);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;