import {useState, useEffect} from 'react'
import {Container} from './App.styled.js'
import {getImages} from "../utils/unsplash-api-service.js";
import SearchBar from "./SearchBar/SearchBar.jsx";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "./Loader/Loader.jsx";
import ErrorMessage from "./ErrorMessage/ErrorMessage.jsx";
import ImageModal from "./ImageModal/ImageModal.jsx";
import toast, {Toaster} from 'react-hot-toast';
import 'izitoast/dist/css/iziToast.min.css';

// state machine = idle, pending, reject, resolve
const App = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [state, setState] = useState('idle')
    const [error, setError] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        if (query !== '' && page === 1) {
            setState('pending')
            setError(null);
            getImages(query, page).then((res) => {

                if (res.data.total === 0) {
                    throw Error(`images with name ${query} not found`);
                }
                setData(res.data.results);
                setState('resolve')
            }).catch(err => {
                setError(err.message)
                setState('reject')
                toast.error(err.message)
            });
        }

        if(page !== 1){
            setState('pending')
            setError(null);
            getImages(query, page).then((res) => {
                setData([...data, ...res.data.results])
                setState('resolve')
            }).catch(err => {
                    setError(err.message)
                    setState('reject')
                    toast.error(err.message)
                }
            )
        }
    }, [query, page]);

    const onSubmit = (values) => {
        if(values === ''){
            toast.error('Please fill out the form');
            return
        }
        setQuery(values);
        setPage(1)
    }

    const onLoadMoreClick = () => {
        setPage(prev => prev + 1);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const getModalImage = (image) => {
        setModalImage(image)
    }

    const onSmallImageClick = (cardData) => {
        openModal()

        getModalImage(cardData.urls.regular)
    }

    if (state === 'idle') {
        return <Container>
            <SearchBar onSubmit={onSubmit}/>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </Container>

    }

    if (state === 'pending' && query ===  '') {
        return <Container>
            <SearchBar onSubmit={onSubmit}/>
            <Loader/>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </Container>
    }

    if (state === 'resolve' || state === 'pending') {
        return <>
            <Container>
            <SearchBar onSubmit={onSubmit}/>
                {/* eslint-disable-next-line react/jsx-no-duplicate-props */}
            <ImageGallery data={data} onImageClick={openModal} getModalImage={getModalImage} onImageClick={onSmallImageClick}/>
                {state === 'pending' ? <Loader/> : <LoadMoreBtn onClick={onLoadMoreClick}/>}
            </Container>
            <ImageModal onRequestClose={closeModal} isOpen={modalIsOpen} image={modalImage}/>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    }

    if (state === 'reject') {
        return <Container>
            <SearchBar onSubmit={onSubmit}/>
            <ErrorMessage message={error}/>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </Container>
    }
}

export default App