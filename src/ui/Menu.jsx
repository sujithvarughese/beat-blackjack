import styled from "styled-components"
import { motion } from "framer-motion"

const StyledMenu = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1rem;
  transform: translate(-50%, -50%);
  width: 380px;
  transition: all 0.5s;
  z-index: 1000;
  background-color: var(--COLOR-LIGHTER);
  border-top: 5px solid var(--COLOR-RED);
  border-radius: var(--BORDER-RADIUS-SM);
`
const Title = styled.div`
	font-weight: 400;
	font-size: 18px;
	text-align: center;
	
	@media (min-width: 600px) {
		font-size: 28px;
	}
`
const Menu = ({ title, ...props }) => {
    return (
        <StyledMenu {...props}
                     initial={{ scale: 0.5, opacity: 0.5 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0, opacity: 0 }}
        >
            {title && <Title {...props} >{title}</Title>}
            {props.children}
        </StyledMenu>
    )
}
export default Menu;