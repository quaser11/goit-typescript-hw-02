import {Item} from './ImageCard.styled.js'

const ImageCard = ({cardData}) => {

    return <Item>
            <img src={cardData.urls.raw} alt={cardData['alt_description']}/>
        </Item>

}

export default ImageCard;