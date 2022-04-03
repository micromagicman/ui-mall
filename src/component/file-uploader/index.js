import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

import Label from '../text/label';

import './style.less';

export default ({fileConsumer, ...rest}) => {
    const onDrop = useCallback(files => {
        fileConsumer(files);
    }, []);
    const {getRootProps, getInputProps} = useDropzone({onDrop});
    return (
        <div className='ui__file-uploader'
             {...getRootProps()}
             {...rest}>
            <input {...getInputProps()} />
            <Label>Перетащите сюда файлы для загрузки</Label>
        </div>
    )
};
