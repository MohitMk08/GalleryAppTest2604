import React, { useState, useEffect, useCallback } from 'react';
import './InfiniteGallery.css';

const InfiniteGallery = ({ searchQuery }) => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State for modal

    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.unsplash.com/photos?page=${page}&per_page=10&query=${searchQuery}&client_id=10bs8GPKff2Gfa3DVCQEw5_wEyoe-kXkvTzjcRCnICM`
            );
            const data = await response.json();
            setImages((prevImages) => [...prevImages, ...data]);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    }, [page, searchQuery]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            <div className="gallery">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="gallery-item"
                        style={{
                            gridRowEnd: `span ${Math.ceil(Math.random() * 2 + 1)}`,
                        }}
                        onClick={() => openModal(image)}
                    >
                        <img src={image.urls.small} alt={image.alt_description} />
                        <div className="image-details">
                            <p>{image.alt_description || 'No description available'}</p>
                            <p>By: {image.user.name}</p>
                        </div>
                    </div>
                ))}
                {loading && <p>Loading...</p>}
            </div>

            {selectedImage && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
                        <p>{selectedImage.alt_description || 'No description available'}</p>
                        <p>By: {selectedImage.user.name}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfiniteGallery;