import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // Make sure to create this CSS file

function App() {
  const save = () => {
    // Implement save functionality
  };

  const discard = () => {
    // Implement discard functionality
  };

  return (
    <div id="verticalButtons">
      <button className="cool-button" onClick={save}>Save</button>
      <button className="cool-button" onClick={discard}>Discard</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
