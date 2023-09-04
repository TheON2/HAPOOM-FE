import React from 'react';
import { useRouter } from 'next/router';
import Write from '../post/Write';

const Update = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || Array.isArray(id)) {
    return null;
  }

  return (
    <>
      <Write update={'2'} updateId={id} />
    </>
  );
};

export default Update;
