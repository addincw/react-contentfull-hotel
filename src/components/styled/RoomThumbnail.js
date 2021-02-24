import styled from "styled-components";

import DefaultBackground from '../../images/dummy.jpg'

const RoomThumbnail = styled.section`
    background-image: url(${props => props.thumbnail ? props.thumbnail : DefaultBackground});
    background-size: cover
`

export default RoomThumbnail