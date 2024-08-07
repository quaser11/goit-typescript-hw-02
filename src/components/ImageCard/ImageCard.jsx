import {Item} from './ImageCard.styled.js'

const ImageCard = ({cardData}) => {

    return <Item>
            <img src={cardData.urls.small} alt={cardData['alt_description']}/>
        </Item>

}

export default ImageCard;