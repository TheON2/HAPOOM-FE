import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Dropzone from 'react-dropzone';

// Dropzone에서 사용하는 외부 라이브러리나 모듈들을 모킹합니다.
jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn().mockReturnValue({
    getRootProps: jest.fn().mockReturnValue({}),
    getInputProps: jest.fn().mockReturnValue({}),
    isDragActive: false,
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<img />),
}));

describe('Dropzone component', () => {
  it('renders without crashing', () => {
    render(<Dropzone images={[]} setImages={jest.fn()} imageURLs={[]} setImageURLs={jest.fn()} />);
  });

  it('displays default instruction when no image is uploaded', () => {
    const { getByText } = render(
      <Dropzone images={[]} setImages={jest.fn()} imageURLs={[]} setImageURLs={jest.fn()} />
    );
    expect(getByText(/이미지 업로드/)).toBeInTheDocument();
  });

});

