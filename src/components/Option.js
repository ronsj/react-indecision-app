import React from 'react';

const Option = (props) => {
  const { optionText, handleDeleteOption } = props;
  return (
    <div>
      {optionText}
      <button onClick={(e) => props.handleDeleteOption(optionText)}>
        Remove
      </button>
    </div>
  );
}

export default Option;
