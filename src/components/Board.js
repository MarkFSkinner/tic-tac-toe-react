import React from 'react';

const Board = props => (
  <div id='main-square'>
    <div className='row'>
      <div id='0' className='col-4 square top-row'>
      </div>
      <div id='1' className='col-4 square top-row'>
      </div>
      <div id='2' className='col-4 square top-row'>
      </div>
    </div>
    <div className='row'>
      <div id='3' className='col-4 square'>
      </div>
      <div id='4' className='col-4 square'>
      </div>
      <div id='5' className='col-4 square'>
      </div>
    </div>
    <div className='row'>
      <div id='6' className='col-4 square bottom-row'>
      </div>
      <div id='7' className='col-4 square bottom-row'>
      </div>
      <div id='8' className='col-4 square bottom-row'>
      </div>
    </div>
  </div>
);

export default Board;