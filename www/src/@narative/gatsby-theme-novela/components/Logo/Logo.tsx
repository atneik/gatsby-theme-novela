import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@narative/gatsby-theme-novela/src/styles/media";

import { Icon } from '@narative/gatsby-theme-novela/src/types';

const Logo: Icon = ({ fill = "white" }) => {
  return (
    <LogoContainer>
      <svg version="1.1" id="Layer_1" x="0px" y="0px" width="100px" height="100%" viewBox="0 0 914.667 360" >
      <g transform="translate(-160, 40)">
        <polyline fill= {fill} points="160.333,239.5 160.333,172.918 180.89,145.691 260.902,39.106 361.333,172.918 361.333,239.823 
          260.833,105.851 	"/>
        <polyline fill= {fill} points="361.333,239.5 402.333,239.5 402.333,38.5 361.333,38.5 	"/>
        <polyline fill= {fill} points="402.056,106.012 502.333,239.823 502.333,172.918 402.016,39.106 	"/>
        <polyline fill= {fill} points="502.333,239.5 543.333,239.5 543.333,38.5 502.333,38.5 	"/>
        <polyline fill= {fill} points="744.333,239.5 677.119,239.5 649.892,219.242 543.308,139.081 677.119,38.5 744.025,38.5 
          610.368,139 	"/>
      </g>
      </svg>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  .Logo__Mobile {
    display: none;
  }
  ${mediaqueries.tablet`
    .Logo__Desktop {
      display: none;
    }
    
    .Logo__Mobile{
      display: block;
    }
  `}
`;