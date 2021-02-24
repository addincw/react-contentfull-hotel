import styled from "styled-components";

const RoomImage = styled.article`
    background-image: url(${props => props.image});
    background-size: cover;
    flex-basis: ${props => props.height ? props.height : 'auto'};
`

export default RoomImage