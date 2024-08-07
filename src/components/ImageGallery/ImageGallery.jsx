import ImageCard from '../ImageCard/ImageCard.jsx';
import {List} from './ImageGallery.styled.js'
const ImageGallery = ({data, onImageClick}) => {
    return <List>
        {data.map((cardData) => (
            <li key={cardData.id} onClick={() => onImageClick(cardData)}>
            <ImageCard cardData={cardData}/>
            </li>
        ))}
    </List>
}

export default ImageGallery;