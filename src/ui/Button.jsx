import styled from "styled-components"

const Button = styled.button`
  cursor: pointer;
  color: var(--COLOR-LIGHT);
  background: var(--COLOR-RED);
  font-weight: 800;
  border: none;
  border-radius: var(--BORDER-RADIUS-SM);
  padding: 0.5rem 1rem;
  box-shadow: var(--SHADOW-SM);
  transition: 0.3s ease-in-out all;
  text-transform: capitalize;
  width: 100px;
  height: 50px;
  
    @media (min-width: 640px) {
      width: 200px;
      height: 70px;
      font-size: 20px;
    }
  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
    outline-offset: -1px;
  }
  @media (min-width: 640px) {
    &:hover {
      color: var(--COLOR);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }
 
  &:has(svg) {
    line-height: 0;
  }
`

export default Button