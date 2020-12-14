import React, { Component } from 'react'

import dicomParser from 'dicom-parser';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';
import {useState} from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport';
import initCornerstone from './CornerstoneInitialization';

initCornerstone();

class CornerStoneViewPort extends Component{
    state = {
        tools: [
          // Mouse
          {
            name: 'Wwwc',
            mode: 'active',
            modeOptions: { mouseButtonMask: 1 },
          },
          {
            name: 'Zoom',
            mode: 'active',
            modeOptions: { mouseButtonMask: 2 },
          },
          {
            name: 'Pan',
            mode: 'active',
            modeOptions: { mouseButtonMask: 4 },
          },
          // Scroll
          { name: 'StackScrollMouseWheel', mode: 'active' },
          // Touch
          { name: 'PanMultiTouch', mode: 'active' },
          { name: 'ZoomTouchPinch', mode: 'active' },
          { name: 'StackScrollMultiTouch', mode: 'active' },
        ],
        imageIds: [
          'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
          'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
        ],
      };


 render(){
  return (
    <CornerstoneViewport
    tools={this.state.tools}
    imageIds={this.state.imageIds}
    style={{ minWidth: '100%', height: '512px', flex: '1' }}/>
   

  );
}
}

export default CornerStoneViewPort;
