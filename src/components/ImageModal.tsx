import ReactModal from 'react-modal';

const ImageModal = ({ isOpen, onClose, imageSrc, prompt }: any) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Image Modal"
            className="relative p-4 bg-white max-w-lg mx-auto my-10 rounded shadow-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
            <button
                onClick={onClose}
                className="absolute top-0 right-0 mt-2 mr-2 text-black text-3xl font-bold"
            >
                &times;
            </button>
            <img src={imageSrc} alt="Enlarged" className="max-w-full max-h-96 mx-auto" />
            <div className="text-black text-center mt-4">{prompt}</div>
        </ReactModal>
    );
};

export default ImageModal;
