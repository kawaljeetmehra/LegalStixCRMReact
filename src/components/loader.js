import React from 'react';

const Loader = () => {
  const loaderStyle = {
    width: '40px',
    aspectRatio: '1',
    '--c': 'linear-gradient(#B3B6C5 0 0)',
    '--m': 'radial-gradient(farthest-side, #B3B6C5 92%, #0000)',
    background: `
      var(--c), var(--m),
      var(--c), var(--m),
      var(--c), var(--m)`,
    backgroundSize: '8px 12px, 8px 8px',
    backgroundRepeat: 'no-repeat',
    animation: 'l17 1s infinite linear',
  };

  const keyframes = `
    @keyframes l17 {
      0%, 5% { background-position: 0 50%, 0 0, 50% 50%, 50% 0, 100% 50%, 100% 0 }
      12.5% { background-position: 0 50%, 0 calc(50% - 10px), 50% 50%, 50% 0, 100% 50%, 100% 0 }
      25% { background-position: 0 calc(50% + 10px), 0 50%, 50% 50%, 50% 0, 100% 50%, 100% 0 }
      37.5% { background-position: 0 calc(50% + 10px), 0 50%, 50% 50%, 50% calc(50% - 10px), 100% 50%, 100% 0 }
      50% { background-position: 0 50%, 0 0, 50% calc(50% + 10px), 50% 50%, 100% 50%, 100% 0 }
      62.5% { background-position: 0 50%, 0 0, 50% calc(50% + 10px), 50% 50%, 100% 50%, 100% calc(50% - 10px) }
      75% { background-position: 0 50%, 0 0, 50% 50%, 50% 0, 100% calc(50% + 10px), 100% 50% }
      87.5% { background-position: 0 50%, 0 0, 50% 50%, 50% 0, 100% calc(50% + 10px), 100% 50% }
      95%, 100% { background-position: 0 50%, 0 0, 50% 50%, 50% 0, 100% 50%, 100% 0 }
    }
  `;

  return (
    <div>
      <style>{keyframes}</style>
      <div className="loader" style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
