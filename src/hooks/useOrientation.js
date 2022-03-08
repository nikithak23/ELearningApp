import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export default useOrientation = () => {
  const [screenDimension, setScreenDimension] = useState(
    Dimensions.get('screen'),
  );

  useEffect(() => {
    const onChange = dimension => {
      setScreenDimension(dimension.screen);
    };

    const subscribe = Dimensions.addEventListener('change', onChange);
    return () => subscribe.remove();
  }, []);
  return {
    ...screenDimension,
    isPortrait: screenDimension.height > screenDimension.width,
  };
};
