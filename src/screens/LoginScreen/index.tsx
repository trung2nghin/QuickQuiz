import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FireBaseAuth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { Container } from '../../components';
import { Header } from '../components/index';
import { RootStackParamList } from '../../navigation/RootStack';
import { setUser } from '../../redux/User/UserRedux';
import { setLoading } from '../../redux/Loading/LoadingRedux';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'LOGIN'>;

const LoginScreen: FC = () => {
  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<LoginScreenProp>();

  const loading = useSelector<RootState, boolean>(state => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(loading);
  }, [isLoading, loading]);

  const onNavSignUp = useCallback(() => {
    navigation.navigate('SIGN_UP');
  }, [navigation]);

  const onNavHome = useCallback(async () => {
    if (userName && password) {
      dispatch(setLoading(true));
      const firebaseAuth = await FireBaseAuth();
      await firebaseAuth.signInWithEmailAndPassword(userName, password);
      const getFirebaseAuth = await FireBaseAuth();
      const userAuth = getFirebaseAuth.currentUser;
      // console.log('userAuth', userAuth);
      if (userAuth) {
        const refreshToken = await userAuth.getIdToken();
        const user = {
          displayName: userAuth.displayName,
          userName,
          emailVerified: userAuth.emailVerified,
          isAnonymous: userAuth.isAnonymous,
          metadata: userAuth.metadata,
          phoneNumber: userAuth.phoneNumber,
          photoURL: userAuth.photoURL,
          providerId: userAuth.providerId,
          refreshToken,
          uid: userAuth.uid,
        };
        await dispatch(setUser(user));
      } else {
        dispatch(setLoading(false));
        throw new Error("Can't login!!!");
      }
      dispatch(setLoading(false));
    } else {
      Alert.alert('Please fill the infomation');
    }
  }, [userName, password, dispatch, navigation]);

  return (
    <Container header={<Header />}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.viewContainer}>
            <Text style={styles.txtWelcome}>Welcome back!</Text>
            <Text style={styles.txtRequest}>Sign in to your account</Text>
            <TextInput
              selectionColor={'#262626'}
              placeholder="Email"
              onChangeText={setUserName}
              style={styles.inputTxt}
            />
            <TextInput
              placeholder="Password"
              selectionColor={'#262626'}
              secureTextEntry={true}
              onChangeText={setPassword}
              style={styles.inputTxt}
            />
            <TouchableOpacity style={styles.btnForgotPassword}>
              <Text style={styles.txtForgotPassword}>Forgot password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContinue} onPress={onNavHome}>
              {isLoading ? (
                <ActivityIndicator size={36} color="#FFFFFF" />
              ) : (
                <Text style={styles.txtContinue}>Continue</Text>
              )}
            </TouchableOpacity>
            <View style={styles.viewFooter}>
              <Text style={styles.txtSignUp}>Don't have an account? </Text>
              <TouchableOpacity style={styles.btnSignUp} onPress={onNavSignUp}>
                <Text
                  style={[
                    styles.txtSignUp,
                    { color: '#333333', fontWeight: 'bold' },
                  ]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 96,
    marginHorizontal: 18,
  },
  inputTxt: {
    width: '100%',
    height: 56,
    backgroundColor: '#00000014',
    borderRadius: 5,
    marginTop: 16,
    paddingLeft: 20,
  },
  txtWelcome: {
    fontFamily: 'Roboto-Bold',
    fontSize: 38,
    color: '#000000',
  },
  txtRequest: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#000000',
  },
  btnForgotPassword: { alignSelf: 'flex-end', marginVertical: 14 },
  txtForgotPassword: { fontFamily: 'Roboto-Bold', fontSize: 16 },
  btnContinue: {
    height: 56,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtContinue: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  viewFooter: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnSignUp: { justifyContent: 'center' },
  txtSignUp: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  loadingAnimation: { height: '100%', justifyContent: 'center' },
});
