import React from 'react'

function loadingPage() {
  return (
    <div>
       
   (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="mt-3">Loading book details...</h4>
            <p className="text-muted">Please wait while we fetch the book information.</p>
          </div>
        </div>
      </div>
    );
  
    </div>
  )
}

export default loadingPage

