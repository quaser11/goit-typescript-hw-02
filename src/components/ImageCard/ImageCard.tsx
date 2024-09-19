import {Item} from './ImageCard.styled.js'
import {FC} from "react";
import {results} from "../../utils/types.js";

interface IImageCardProps {
    cardData: results
}

const ImageCard:FC<IImageCardProps> = ({cardData}) => {

    return <Item>
            <img src={cardData.urls.small} alt={cardData['alt_description']}/>
        </Item>

}

export default ImageCard;