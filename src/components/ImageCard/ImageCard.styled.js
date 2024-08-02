import styled from "@emotion/styled";

export const Item = styled.div`
    width:300px;
    height:200px;
    transition:all 250ms ease-in-out;
    cursor: pointer;
    
    &:hover{
        transform: scaleX(1.03) scaleY(1.03);
    }
`