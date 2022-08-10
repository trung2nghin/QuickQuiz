import { StyleSheet, View } from 'react-native';
import React, { Children, FC } from 'react';

interface Props {
  height: number;
  children?: React.ReactNode;
  bgColor?: string;
  borderR?: number;
  jCenter?: boolean;
}

const Card: FC<Props> = ({ height, children, bgColor, borderR, jCenter }) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: height,
          backgroundColor: bgColor,
          borderRadius: borderR,
          justifyContent: jCenter ? 'center' : 'flex-start',
        },
      ]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 14,
  },
});
