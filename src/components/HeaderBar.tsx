import {StyleSheet, Text, View} from 'react-native';
import React, {FC, memo} from 'react';
import Metrics from '../assets/Metrics';

interface Props {
  backgroundColor?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
}

const HeaderBar: FC<Props> = ({backgroundColor, title, left, right}) => (
  <View
    style={[styles.container, {backgroundColor: backgroundColor || '#000000'}]}>
    {left || <View />}
    {title}
    {right || <View />}
  </View>
);

export default memo<Props>(HeaderBar);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignSelf: 'center',
    height: 50,
    paddingHorizontal: Metrics.isSmallPhone ? 16 : 20,
  },
});
