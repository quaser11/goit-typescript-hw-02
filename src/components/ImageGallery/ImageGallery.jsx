import ImageCard from '../ImageCard/ImageCard.jsx';
import {List} from './ImageGallery.styled.js'
const ImageGallery = ({data, onImageClick, getModalImage}) => {

    const onHandleClick = (cardData) => {
       onImageClick()

        getModalImage(cardData.urls.full)
    }

    return <List>
        {data.map((cardData) => (
            <li key={cardData.id} onClick={(e) => onHandleClick(cardData)}>
            <ImageCard cardData={cardData}/>
            </li>
        ))}
    </List>
}

export default ImageGallery;