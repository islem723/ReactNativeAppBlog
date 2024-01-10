import React, { useRef } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import CustomInput from '../components/TextInput';
import CustomImageView from '../components/ImageView';
import CustomButton from '../components/Button';
import { loginUser } from '../services/ApiService';
import { AuthRoutes, HomeRoutes, Routes } from '../navigation/RouteEnums';
//import { loginUser } from '../services/ApiService';

interface LoginScreenProps {
  navigation: any; // Adjust the type based on your navigation prop type
}

interface FormData {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      // Call your login API or authentication function
      const response = await loginUser(data.email, data.password);

      if (!response.error) {
        Alert.alert('Login Successful');
        navigation.navigate(Routes.HomeRoute, {
          screen: HomeRoutes.HomeScreen,
        });
      } else {
        console.error(response);
        Alert.alert('Login Failed', response.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login Failed', 'An error occurred during login');
    }
    console.log(data);
  }

  const navigateToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const passwordRef = useRef<Input>(null);

  return (
    <Layout level="1">
      <Layout level="2" style={styles.loginForm}>
        <CustomImageView
          imageUrl={require('../assets/bloglogo.png')}
          styles={{
            marginTop: 55,
            width: 250,
            height: 170,
            marginVertical: 10,
          }}
        />

        <Controller
          rules={{
            minLength: 10,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          }}
          control={control}
          render={({ field }) => (
            <CustomInput
              keyboardType={'email-address'}
              returnKeyType={'next'}
              styles={{
                marginTop: 30,
              }}
              onSubmitValue={() => passwordRef.current?.focus()}
              placeholder="Email"
              value={field.value}
              onValueChange={(text) => field.onChange(text)}
            />
          )}
          name="email"
          defaultValue=""
        />

        {errors.email && <Text>Your email is invalid!</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              inputRef={passwordRef}
              placeholder="Mot de passe"
              secureTextEntry={true}
              returnKeyType={'done'}
              value={field.value}
              styles={{
                marginVertical: 10,
              }}
              onValueChange={(text) => field.onChange(text)}
            />
          )}
          name="password"
          defaultValue=""
        />

        <CustomButton
          onPress={handleSubmit(onSubmit)}
          title="Se connecter"
          buttonStyle={{ marginTop: 20 }}
        />
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newAccountText: {
    marginTop: 10,
    fontSize: 16,
  },
  registerLink: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
