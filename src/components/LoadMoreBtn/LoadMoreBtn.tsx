import {Button} from "./LoadMoreBtn.styled.js";
import {FC} from 'react'
interface ILoadMoreBtnProps {
    onClick: () => void
}

const LoadMoreBtn:FC<ILoadMoreBtnProps> = ({onClick}) => {
    return <Button type='button' onClick={onClick}>Load More</Button>
}

export default LoadMoreBtn