import styled from "styled-components"

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--COLOR-LIGHTER);
	border-radius: var(--BORDER-RADIUS-LG);
	box-shadow: var(--SHADOW-LG);
	padding: 3rem;
	transition: all 0.5s ease-in-out;
    z-index: 1000;
`

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--BACKDROP-COLOR);
	backdrop-filter: blur(4px);
	z-index: 100;
	transition: all 0.5s;
`

const Modal = (props) => {
    const { closeFn } = props
    return (
        <Backdrop onClick={closeFn}>
            <StyledModal>
                { props.children }
            </StyledModal>
        </Backdrop>
    )
}

export default Modal