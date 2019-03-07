import React from 'react';

const renderErrors = (comp) => {
  return comp.state.error.map((e) => {
    return (
      <li className="error">
        {e}
      </li>
    )
  });
}

const ErrorRenderer = (props) => {
  return (
    <div style={{paddingTop: 20}}>
      <span className="error">
        Oops! There {props.comp.state.error.length > 1 ? "are errors" : "is an error"} in your submission:
      </span>
      {renderErrors(props.comp)}
    </div>
  )
}

export default ErrorRenderer;
