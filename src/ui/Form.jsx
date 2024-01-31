import styled from "styled-components";
import { motion } from "framer-motion"


const Form = styled.form`
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
  max-height: 800px;
  
  @media (min-width: 600px) {
    font-size: 28px;
  }
`



export default Form;