import styled from "styled-components"

const Input = styled.input`
  border: 1px solid var(--COLOR-DARK);
  background-color: var(--COLOR-LIGHTER);
  border-radius: var(--BORDER-RADIUS-SM);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--SHADOW-SM);
  width: 100%;
  
  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
    outline-offset: -1px;
  }
`

export default Input