import React, { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Input, Layout, Text, Spinner } from '@ui-kitten/components';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import CustomInput from '../components/TextInput';
import CustomImageView from '../components/ImageView';
import CustomButton from '../components/Button';
import { registerUser } from '../services/ApiService';
import { Routes, AuthRoutes } from '../navigation/RouteEnums';

//const emailRef = useRef<Input>(null);

interface RegisterScreenProps {
  navigation: any; // Adjust the type based on navigation prop type
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Show loading indicator
      setLoading(true);
      const response = await registerUser(data.name, data.email, data.password);

      if (response.message) {
        Alert.alert('Registration Successful', response.message);
      } else {
        Alert.alert('Registration Failed', response.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert(
        'Registration Failed',
        'An error occurred during registration'
      );
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
    console.log(data);
  };

  const navigateToLogin = () => {
    navigation.navigate(Routes.AuthRoute, {
      screen: AuthRoutes.LoginPage,
    });
  };

  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  return (
    <Layout level="1">
      <Layout level="2" style={styles.registerForm}>
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
          rules={{ pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ }}
          control={control}
          render={({ field }) => (
            <CustomInput
              styles={{
                marginTop: 30,
                marginVertical: 10,
              }}
              keyboardType={'default'}
              returnKeyType={'next'}
              onSubmitValue={() => emailRef.current?.focus()}
              placeholder="Nom"
              value={field.value}
              onValueChange={(text) => field.onChange(text)}
            />
          )}
          name="name"
          defaultValue=""
        />

        <Controller
          rules={{
            minLength: 10,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          }}
          control={control}
          render={({ field }) => (
            <CustomInput
              inputRef={emailRef}
              keyboardType={'email-address'}
              returnKeyType={'next'}
              styles={{
                marginVertical: 10,
              }}
              error={!!errors.email}
              errorText={errors.email ? 'Invalid email format' : ''}
              onSubmitValue={() => passwordRef.current?.focus()}
              placeholder="Email"
              value={field.value}
              onValueChange={(text) => field.onChange(text)}
            />
          )}
          name="email"
          defaultValue=""
        />

        <Controller
          rules={{
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
          }}
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
              error={!!errors.password}
              errorText={
                errors.password
                  ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.'
                  : ''
              }
              onValueChange={(text) => field.onChange(text)}
            />
          )}
          name="password"
          defaultValue=""
        />

        <CustomButton
          onPress={handleSubmit(onSubmit)}
          title="S'inscrire"
          buttonStyle={{ marginTop: 20 }}
        />

        <Text style={styles.haveAccountText}>Vous avez déjà un compte?</Text>
        <Pressable onPress={navigateToLogin}>
          <Text style={styles.loginLink}>Connectez-vous ici!</Text>
        </Pressable>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  haveAccountText: {
    marginTop: 10,
    fontSize: 16,
  },
  loginLink: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
