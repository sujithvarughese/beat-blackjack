import styled from "styled-components"

const StyledAction = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 1rem;
  padding: 1rem;
  align-items: center;
  display: flex;
  bottom: 0;
  justify-content: space-around;
  transition: all 0.5s;
  z-index: 1000;
  border: 1px solid var(--COLOR-DARK);
  border-radius: var(--BORDER-RADIUS-MD);
  
  @media(min-width: 640px) {
    justify-content: flex-end;
    gap: 2rem;
  }
`

const Action = (props) => {
    return (
        <StyledAction>
            {props.children}
        </StyledAction>
    )
}
export default Action;