import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { FC, memo, useCallback } from 'react';
import { HeaderBar } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  textIcon?: string;
  icon?: string;
}

const Header: FC<Props> = ({ textIcon, icon }) => {
  const navigation = useNavigation();

  const onNavGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <HeaderBar
      left={
        <TouchableOpacity style={styles.left} onPress={onNavGoBack}>
          {icon ? <Ionicons name={icon} size={28} color={'#ffffff'} /> : <></>}
          {textIcon ? <Text style={styles.text}>{textIcon}</Text> : <></>}
        </TouchableOpacity>
      }
    />
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  left: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'Roboto-Bold',
  },
});
