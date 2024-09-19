import {useState, useEffect, FC} from 'react'
import {Container} from './App.styled.js'
import {getImages} from "../utils/unsplash-api-service.ts";
import SearchBar from "./SearchBar/SearchBar.js";
import ImageGallery from "./ImageGallery/ImageGallery.js";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.js";
import Loader from "./Loader/Loader.js";
import ErrorMessage from "./ErrorMessage/ErrorMessage.jsx";
import ImageModal from "./ImageModal/ImageModal.js";
import toast, {Toaster} from 'react-hot-toast';
import 'izitoast/dist/css/iziToast.min.css';
import {results} from "../utils/types";

// state machine = idle, pending, reject, resolve
type StateMachine = "idle" | "pending" | "reject" | "resolve"

const App:FC = () => {
    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<results[]>([]);
    const [state, setState] = useState<StateMachine>('idle')
    const [error, setError] = useState<string | null>(null);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string>('');

    useEffect((): void => {
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

    const onSubmit:(values: string) => void = (values) => {
        if(values === ''){
            toast.error('Please fill out the form');
            return
        }
        setQuery(values);
        setPage(1)
    }

    const onLoadMoreClick:() => void = () => {
        setPage(prev => prev + 1);
    }

    const openModal: () => void = () => {
        setIsOpen(true);
    }

    const closeModal: () => void = () => {
        setIsOpen(false);
    }

    const getModalImage: (image:string) => void = (image) => {
        setModalImage(image)
    }

    const onSmallImageClick:(cardData:results) => void = (cardData) => {
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
            <ImageGallery data={data}  onImageClick={onSmallImageClick}/>
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