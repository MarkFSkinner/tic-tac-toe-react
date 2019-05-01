import React from 'react';

const Menu = props => (
  <div id='menu-holder'>
    <div id='menu'>
      <div className='selection-prompt players-prompt'>Please Select # of Players:</div>
      <div className='players-prompt'>
        <div id='players-one' className='btn btn-custom btn-lg'>1</div>
      </div>
      <div className='players-prompt'>
        <div id='players-two' className='btn btn-custom btn-lg'>2</div>
      </div>
      <div className='selection-prompt token-prompt'>Please Select Token for Player 1:</div>
      <div className='token-prompt'>
        <div id='player-x' className='btn btn-custom btn-lg'>X</div>
      </div>
      <div className='token-prompt'>
        <div id='player-o' className='btn btn-custom btn-lg'>O</div>
      </div>
      <div className='selection-prompt difficulty-prompt'>Please Select Difficulty:</div>
      <div className='difficulty-prompt'>
        <div id='easy' className='btn btn-custom btn-lg'>Easy</div>
      </div>
      <div className='difficulty-prompt'>
        <div id='medium' className='btn btn-custom btn-lg'>Intermediate</div>
      </div>
      <div className='difficulty-prompt'>
        <div id='hard' className='btn btn-custom btn-lg'>Unbeatable</div>
      </div>
      <div id='result'></div>
    </div>
  </div>
);

export default Menu;