import Image from 'next/image';
import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { FaImage, FaTimesCircle } from 'react-icons/fa';
import { Button } from '@nextui-org/react';

interface Properties {
    value: ImageListType;
    onChange: (imageList: ImageListType) => void;
}

const maxNumber = 1;

export default function ImageInput(props: Properties) {
    const { value, onChange } = props;
    const handleChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        onChange(imageList);
    };

    return (
        <div>
            <ImageUploading
                value={value}
                onChange={handleChange}
                dataURLKey='data_url'
                maxNumber={maxNumber}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageRemove,
                    dragProps,
                    errors
                }) => (
                    <div className=''>
                        <div className='flex items-center gap-2'>
                            <Button
                                onClick={onImageUpload}
                                {...dragProps}
                                startContent={<FaImage />}
                                radius='sm'
                                size='sm'
                                color='primary'
                                variant='bordered'
                            >

                                Choose File
                            </Button>

                            {imageList.length > 0 && (
                                <Button
                                    onClick={onImageRemoveAll}
                                    radius='sm'
                                    size='sm'
                                    color='danger'
                                    variant='bordered'
                                >
                                    <FaTimesCircle />
                                    Remove image
                                </Button>
                            )}
                        </div>

                        <div className='flex flex-col gap-4 mt-4 max-w-16'>
                            {imageList.map((image, index) => (
                                <div key={index} className='flex items-center gap-1 relative w-96 max-w-full'>
                                    <Image src={image['data_url'] || image['dataURL']} alt='' width={0} height={0} sizes='100vw' className='w-full h-auto rounded-md object-cover' />
                                </div>
                            ))}
                        </div>
                        {errors && (
                            <div>
                                {errors.maxNumber && <span className='text-sm'>Number of selected images exceed {maxNumber}.</span>}
                                {errors.acceptType && <span className='text-sm'>Your selected file type is not allowed.</span>}
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}