import ImageCard from '../ImageCard/ImageCard';
import {List} from './ImageGallery.styled.js'
import {Results} from "../../utils/types";
import {FC} from 'react'


interface IImageGalleryProps {
    data:Results[],
    onImageClick: (cardData:Results) => void
}
const ImageGallery:FC<IImageGalleryProps> = ({data, onImageClick}) => {
    return <List>
        {data.map((cardData) => (
            <li key={cardData.id} onClick={() => onImageClick(cardData)}>
            <ImageCard cardData={cardData}/>
            </li>
        ))}
    </List>
}

export default ImageGallery;