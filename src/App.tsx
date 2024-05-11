import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { requestImages } from "./services/api";
import { Images } from "./components/types";

const App = () => {
  const [images, setImages] = useState<(Images | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [modalImg, setModalImg] = useState<Images | null>(null);
  const [openCloseModal, setOpenCloseModal] = useState<boolean>(false);

  useEffect(() => {
    if (!query.length) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const data = await requestImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    setImages([]);
    setPage(1);
    fetchImages();
  }, [query, page]);

  const onSetSearchQuery = (searchQuery: string): void => {
    setQuery(searchQuery);
    setPage(1);
  };

  const onAddPage = (): void => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (id: string): void => {
    const imageModal = images.find((image) => image && image.id === id) || null;
    setModalImg(imageModal);
    setOpenCloseModal(true);
  };
  const closeModal = (): void => setOpenCloseModal(false);

  return (
    <>
      <Toaster
        containerStyle={{
          top: 50,
        }}
        // toastOptions={{
        //   duration: 2500,
        //   position: "top-center",
        //   reverseOrder: {false},
        //   style: {
        //     background: "red",
        //     color: "#fff",
        //   },
        // }}
        position="top-center"
        reverseOrder={false}
      />
      <SearchBar onSubmit={onSetSearchQuery} />
      {Array.isArray(images) && (
        <ImageGallery
          images={images.filter((image) => image !== null) as Images[]}
          openModal={openModal}
        />
      )}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {images && images.length !== 0 && <LoadMoreBtn onAddPage={onAddPage} />}
      <ImageModal
        modalImg={modalImg}
        isOpen={openCloseModal}
        onCloseModal={closeModal}
      />
    </>
  );
};

export default App;
