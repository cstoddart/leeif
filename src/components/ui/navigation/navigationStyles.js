import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

import { BORDER, BOX_SHADOW, COLORS } from '../../../constants';

export const StyledNavigation = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: ${BORDER};
`;

export const Logo = styled(Link)`
  font-size: 35px;
  font-weight: bold;
  z-index: 1;
  color: ${COLORS.TEXT};
`;

export const StyledSteps = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledNavLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 2px;
  color: ${COLORS.TEXT_LIGHT};

  &.active {
    color: ${COLORS.GREEN};
  }
`;

export const NumberCircle = styled.span`
  line-height: 1;
  border: 1.5px solid ${COLORS.TEXT_LIGHT};
  border-radius: 100px;
  height: 20px;
  width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  margin-right: 7px;
  padding-left: 2px;
  padding-bottom: 2px;

  .active & {
    background-color: ${COLORS.GREEN};
    border-color: ${COLORS.GREEN};
    color: white;
  }
`;

export const XButton = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: red;
  z-index: 1;
`;

export const Dash = styled.div`
  background-color: ${COLORS.TEXT_LIGHT};
  height: 2px;
  width: 20px;
  margin: 0 10px;
  display: inline-block;
`;