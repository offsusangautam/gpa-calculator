import { useEffect } from 'react';

const LoadAdScript = ({ src, containerId }) => {
  useEffect(() => {
    if (!src) return;

    // If containerId is provided, append script there; else append to body
    const parent = containerId ? document.getElementById(containerId) : document.body;
    if (!parent) return;

    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;

    parent.appendChild(script);

    return () => {
      parent.removeChild(script);
    };
  }, [src, containerId]);

  return null;
};

export default LoadAdScript;
