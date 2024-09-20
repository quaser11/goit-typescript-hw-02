import ImageCard from '../ImageCard/ImageCard';
import {List} from './ImageGallery.styled.js'
import {results} from "../../utils/types";
import {FC} from 'react'


interface IImageGalleryProps {
    data:results[],
    onImageClick: (cardData:results) => void
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