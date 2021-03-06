import React from 'react';

const Controls = props => (
  <div className='row'>
    <div className='contol-btns'>
      <div id='replay' className='btn btn-custom' onClick={props.handlePlayClick}>Play Again</div>
      <div id='reset' className='btn btn-custom' onClick={props.handleResetClick}>Reset</div>
    </div>
  </div>
);

export default Controls;