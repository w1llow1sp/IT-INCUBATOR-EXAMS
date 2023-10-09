import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';

// Types
type PhotoType = {
    albumId: string
    id: string
    title: string
    url: string
}

type PayloadType = {
    title: string
    url?: string
}

// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const photoId = '637df6dc99fdc52af974a517'

const photosAPI = {
    getPhoto() {
        return instance.get<PhotoType>(`photos/${photoId}`)
    },
    updatePhoto(payload: PayloadType) {
        return instance.put<PhotoType>(`photos/${photoId}`, payload)
    }
}


// App
export const App = () => {

    const [photo, setPhoto] = useState<PhotoType | null>(null)

    useEffect(() => {
        photosAPI.getPhoto()
            .then((res) => {
                setPhoto(res.data)
            })
    }, [])

    const updatePhotoHandler = () => {
        // ❗ title и url указаны в качестве заглушки. Server сам сгенерирует новый title
        const payload = {
            title: 'Новый title',
            url: 'data:image/png;base64,iVBORw0FAKEADDRESSnwMZAABJRUrkJggg=='
        }
        photosAPI.updatePhoto(payload)
            .then((res) => {
                setPhoto(res.data)
            })
    };

    return (
        <>
            <h1>📸 Фото</h1>
            <div>
                <div style={{marginBottom: '15px'}}>
                    <h1>title: {photo?.title}</h1>
                    <div><img src={photo?.url} alt=""/></div>
                </div>
                <button style={{marginLeft: '15px'}}
                        onClick={updatePhotoHandler}>
                    Изменить title
                </button>
            </div>
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>)