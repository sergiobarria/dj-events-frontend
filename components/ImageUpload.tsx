import { useState } from 'react';
import { API_URL } from '../config/index';

import styles from '@/styles/Form.module.css';

interface IImageUploadProps {
  evtId: number;
  imageUploaded: () => void;
  token: string;
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  evtId,
  imageUploaded,
  token,
}) => {
  const [image, setImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (image) {
      const formData = new FormData();
      formData.append('files', image);
      formData.append('ref', 'events');
      formData.append('refId', evtId.toString());
      formData.append('field', 'image');

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        imageUploaded();
      }
    }

    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>

        <input type='submit' value='Upload' className='btn' />
        {isLoading ? <p>File uploading...</p> : null}
      </form>
    </div>
  );
};

export default ImageUpload;
