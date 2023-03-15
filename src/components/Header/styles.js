import { Link } from "react-router-dom";
import styled from "styled-components";


export const Container = styled.header`
grid-area: header;
height: 105px;
width: 100%;
border-bottom-width:1px;
border-bottom-style: solid ;
border-bottom-color: ${({theme}) => theme.COLORS.BACKGROUND_700} ;

display: flex;
justify-content: space-between;
padding: 0 80px;





`;


export const Profile = styled(Link)`
display: flex;
align-items: center;
gap: 16px;




> img{
    height: 56px;
    width: 56px;
    border-radius: 9999px;
}

>div{
    display: flex;
    flex-direction: column;
    line-height: 24px;

    span{
        font-size: 14px;
        color: ${({theme}) => theme.COLORS.GRAY_100};

    }

    strong{
        font-size: 18px;
        color: ${({theme}) => theme.COLORS.WHITE};

    }
}
`;

export const Logout = styled.button`
border: none;
background: none;

>svg{
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-size: 36px;

}


`;