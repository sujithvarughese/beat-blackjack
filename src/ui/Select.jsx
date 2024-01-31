import styled from "styled-components"

const StyledSelect = styled.select`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--COLOR-DARK);
  border-radius: var(--BORDER-RADIUS-SM);
  background-color: var(--COLOR-LIGHTER);
  font-weight: 500;
  box-shadow: var(--SHADOW-SM);
  width: 100%;
`

const Select = ({ options, ...props }) => {
    return (
        <StyledSelect {...props}>
            {options.map((option, index) =>
                <option value={option.value || option} key={index}>
                    {option.label || option}
                </option>
            )}

        </StyledSelect>
    )
}
export default Select;