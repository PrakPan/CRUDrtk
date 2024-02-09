import React, { useEffect } from 'react';

const Title = ({ title }) => {
  useEffect(() => {
    document.title = title || 'Home';
    return () => {
      document.title = 'Home';
    };
  }, [title]); 

  return (
    <div>
      
    </div>
  );
};

export default Title;
