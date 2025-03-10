/**
 * Simple footer component.
 */

import React from 'react';

const SimpleFooter = () => {
    return (
      <footer className="bg-neutral-800 text-white py-3 text-center">
        <p className="text-neutral-400">&copy; {new Date().getFullYear()} ArtOfWorkflows. All rights reserved.</p>
      </footer>
    );
  };
  
  export default SimpleFooter; 