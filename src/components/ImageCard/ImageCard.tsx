import {Item} from './ImageCard.styled.js'
import {FC} from "react";
import {Results} from "../../utils/types";

interface IImageCardProps {
    cardData: Results
}

const ImageCard:FC<IImageCardProps> = ({cardData}) => {

    return <Item>
            <img src={cardData.urls.small} alt={cardData['alt_description']}/>
        </Item>

}

export default ImageCard;