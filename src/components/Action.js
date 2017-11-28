import React from 'react';

const Action = (props) => {
  const { hasOptions, handlePick } = props;
  return (
    <div>
      <button
        onClick={handlePick}
        disabled={!hasOptions}>
        What should i do?
      </button>
    </div>
  );
}

export default Action;
