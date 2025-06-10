//     import React, { useEffect, useState } from "react";

// const ScrollToTopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const goToTop = () => {
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   };

//   const listenToScroll = () => {
//     const scrollThreshold = 250;
//     const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//     setIsVisible(winScroll > scrollThreshold);
//   };

//   useEffect(() => {
//     listenToScroll(); // Initial check
//     window.addEventListener("scroll", listenToScroll);
//     return () => window.removeEventListener("scroll", listenToScroll);
//   }, []);

//   const buttonStyle = {
//     fontSize: '2.4rem',
//     width: '6rem',
//     height: '6rem',
//     color: '#fff',
//     backgroundColor: '#007bff',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//     borderRadius: '50%',
//     position: 'fixed',
//     bottom: '5rem',
//     right: '5rem',
//     zIndex: 999,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     border: 'none',
//     outline: 'none',
//     animation: 'gototop 1.2s linear infinite alternate-reverse',
//   };

//   return (
//     <>
//       <style>
//         {`
//           @keyframes gototop {
//             0% { transform: translateY(-0.5rem); }
//             100% { transform: translateY(1rem); }
//           }

//           @media (max-width: 768px) {
//             .scroll-to-top-btn {
//               right: auto !important;
//               left: 40% !important;
//             }
//           }
//         `}
//       </style>

//       {isVisible && (
//         <button
//           className="scroll-to-top-btn"
//           style={buttonStyle}
//           onClick={goToTop}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = '#0056b3';
//             e.target.style.transform = 'scale(1.1)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = '#007bff';
//             e.target.style.transform = 'scale(1)';
//           }}
//           aria-label="Scroll to top"
//           title="Scroll to top"
//         >
//           ↑
//         </button>
//       )}
//     </>
//   );
// };

// export default ScrollToTopButton.jsx;
