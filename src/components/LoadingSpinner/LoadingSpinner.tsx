import * as React from 'react';
import { FadeLoader } from 'react-spinners';

function LoadingSpinner({loading}: {loading: boolean}) {
  return <FadeLoader height={15} width={5} color="hsl(0 0 0)" loading={loading} />;
}

export default LoadingSpinner;
