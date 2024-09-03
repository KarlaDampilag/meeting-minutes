'use client';
import React, { Component, createRef, RefObject } from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';
import { Button } from '@nextui-org/react';

import Text from '../atoms/Text';

interface State {
    trimmedDataURL: string | null;
    isLoading: boolean;
    errorMessage: string | null;
    isSuccess: boolean;
}

// use class because useRef doesn't work with react-signature-canvas
class SignatureCapture extends Component<{ onSubmit: (dataUrl: string) => Promise<boolean> }, State> {
    state: State = {
        trimmedDataURL: null,
        isLoading: false,
        errorMessage: null,
        isSuccess: false
    };

    ref: RefObject<ReactSignatureCanvas> = createRef<ReactSignatureCanvas>();

    clear = () => {
        this.ref.current?.clear();
    };

    submit = async () => {
        this.setState({ isLoading: true });
        const success = await this.props.onSubmit(this.ref.current?.toDataURL() as string)
        if (success) {
            // window.location.reload();
            this.setState({ isSuccess: true });
        } else {
            this.setState({ errorMessage: 'Something went wrong, please contact support' })
        }
        this.setState({ isLoading: false })
    }

    render() {
        return (
            <div className='flex flex-col gap-3 max-w-[500px] mx-auto'>
                {this.state.isSuccess ? (
                    <div>
                        <p>Thank you! Your signature has been saved.</p>
                        <Button radius='sm' color='primary' className='w-full' onClick={() => window.location.reload()}><Text localeParent='Common' localeKey='Continue' /></Button>
                    </div>
                ) : (
                    <>
                        <p className='mb-0'>Please sign inside the designated area.</p>
                        <p>Your signature will be used for signing digital documents generated on {process.env.NEXT_PUBLIC_APP_NAME}, including meeting minutes and more.</p>
                        <div className='w-fit mx-auto'>
                            <ReactSignatureCanvas
                                ref={this.ref}
                                canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
                            />
                        </div>
                        <div className='w-full flex flex-col items-center justify-center gap-6'>
                            <Button radius='sm' variant='bordered' onClick={this.clear} className='w-full' disabled={this.state.isLoading}>
                                Clear
                            </Button>
                            <Button radius='sm' variant='solid' color='primary' onClick={this.submit} className='w-full' disabled={this.state.isLoading} isLoading={this.state.isLoading}>
                                <Text localeParent='Common' localeKey='Submit' />
                            </Button>
                        </div>
                        {this.state.errorMessage && <p className='text-red-500 text-sm mb-0'>{this.state.errorMessage}</p>}
                    </>
                )}
            </div>
        );
    }
}

export default SignatureCapture;
