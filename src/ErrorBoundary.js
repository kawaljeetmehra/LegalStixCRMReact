import React, { useState, useEffect } from 'react';
import Header from './screens/header';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      // Update state with error information
      setHasError(true);
      setError(error);
      setErrorInfo(errorInfo);
      // You can also log the error to an error reporting service
      // logErrorToMyService(error, errorInfo);
    };

    // Assign the error handler to the global error event
    window.addEventListener('error', errorHandler);

    // Clean up the event listener
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    // Render custom fallback UI when an error occurs
    return (
      <Header>
            <link href="https://fonts.googleapis.com/css?family=Encode+Sans+Semi+Condensed:100,200,300,400" rel="stylesheet00" />
              <div style={{marginTop: "-10%"}}>
                <h1>500</h1>
                <h2>Unexpected Error <b>:(</b></h2>
                <h2 style={{marginTop: "-3%"}}>Try Again by refreshing the page</h2>
                <div class="gears mt-1">
                    <div class="gear one">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    </div>
                    <div class="gear two">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    </div>
                    <div class="gear three">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
                <script src="js/main.js" type="text/javascript"></script>
              </div>
      </Header>
    );
  }

  // If no error, render children normally
  return children;
};

export default ErrorBoundary;
