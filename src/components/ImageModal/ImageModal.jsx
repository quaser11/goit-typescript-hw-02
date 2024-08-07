import React from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#modal');

const ImageModal = ({image, onRequestClose, isOpen}) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width:'1000px',
            height:'auto',
            border:'none',
            background:'none',
            padding:'0',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
        },
        overlay: {
            backgroundColor: '#00000075',
        }
    }

    return <Modal style={customStyles} onRequestClose={onRequestClose} isOpen={isOpen}>
        <div>
            <img src={image} alt=""/>
        </div>
    </Modal>
}

export default ImageModal