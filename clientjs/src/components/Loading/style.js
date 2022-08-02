import styled, { keyframes } from 'styled-components'

export const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  25% { 
    margin-bottom: 20px;
  }

  50% { 
    margin-bottom: 0;
  }

  75% { 
    margin-bottom: 20px;
  }

  100% { 
    margin-bottom: 0;
  }
`

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Dot = styled.div`
  background-color: #5ECE7B;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 4px;
  animation: ${BounceAnimation} 2s linear infinite;
  animation-delay: ${(props) => props.delay};
`