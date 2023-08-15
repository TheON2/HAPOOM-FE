import { ImageContainer } from '@/styles/write';
import React from 'react';
import Form from 'react-bootstrap/Form';

interface MusicSelectorProps {
  musicURL: string;
  setMusicURL: (url: string) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({
  musicURL,
  setMusicURL,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMusicURL(value);
  };

  return (
    <ImageContainer>
      <Form.Select
        aria-label="Default select example"
        onChange={handleChange}
        value={musicURL}
      >
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
      </Form.Select>
    </ImageContainer>
  );
};

export default MusicSelector;
