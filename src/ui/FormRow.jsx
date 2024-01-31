import styled from "styled-components"

const StyledFormRow = styled.div`
    display: flex;
    justify-content: space-between;


  
`

const FormRow = ({ label, ...props }) => {

    return (
        <StyledFormRow>
            {props.children}
        </StyledFormRow>
    )
}
export default FormRow;