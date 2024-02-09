import React from 'react'
import '../index.css'

/**
 * @description  "Below is the loader Function Component "
 * @summary 1. It is showed when API's are in pending state
 *         
 *         
 *          
.
 */
const Loader = () => {
    return (
        <div className="vh-100 ">
          <p className="align-middle">Loading...</p>
        </div>
      );
}

export default Loader;