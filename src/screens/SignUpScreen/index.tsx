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
} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FireBaseAuth from '@react-native-firebase/auth';

import {Container} from '../../components';
import {Header} from '../components/index';
import {RootStackParamList} from '../../navigation/RootStack';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/User/UserRedux';

type SignUpScreenProp = StackNavigationProp<RootStackParamList, 'SIGN_UP'>;

const SignUpScreen: FC = () => {
  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const navigation = useNavigation<SignUpScreenProp>();

  const onNavHome = useCallback(async () => {
    if (userName && password) {
      const firebaseAuth = await FireBaseAuth();
      await firebaseAuth.createUserWithEmailAndPassword(userName, password);
      const getFirebaseAuth = await FireBaseAuth();
      const userAuth = getFirebaseAuth.currentUser;
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
        await dispatch(setUser({user}));
        // console.log(user);
      } else {
        throw new Error("Can't login!!!");
      }
    }
  }, [userName, password, confirmPassword, dispatch, navigation]);

  const onNavSignUp = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container header={<Header icon="chevron-back-outline" />}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.viewContainer}>
            <Text style={styles.txtWelcome}>Sign Up</Text>
            <Text style={styles.txtRequest}>
              Create an account so you can answer{'\n'}interesting question
            </Text>
            <TextInput
              selectionColor={'#262626'}
              placeholder="Email"
              onChangeText={setUserName}
              style={styles.inputTxt}
            />
            <TextInput
              placeholder="Password"
              selectionColor={'#262626'}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.inputTxt}
            />
            <TextInput
              placeholder="Confirm password"
              selectionColor={'#262626'}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              style={styles.inputTxt}
            />
            <TouchableOpacity style={styles.btnForgotPassword}>
              <Text style={styles.txtForgotPassword}>Forgot password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContinue} onPress={onNavHome}>
              <Text style={styles.txtContinue}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.viewFooter}>
              <Text style={styles.txtSignUp}>Already have an account? </Text>
              <TouchableOpacity style={styles.btnSignUp} onPress={onNavSignUp}>
                <Text
                  style={[
                    styles.txtSignUp,
                    {color: '#333333', fontWeight: 'bold'},
                  ]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 72,
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
  btnForgotPassword: {alignSelf: 'flex-end', marginVertical: 14},
  txtForgotPassword: {fontFamily: 'Roboto-Bold', fontSize: 16},
  btnContinue: {
    height: 56,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 6,
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
  btnSignUp: {justifyContent: 'center'},
  txtSignUp: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
});
