import React, { useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, Layout, Spinner } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../components/TextInput';
import CustomImageView from '../components/ImageView';
import CustomButton from '../components/Button';
import { loginUser } from '../services/ApiService';
import { AuthRoutes, HomeRoutes, Routes } from '../navigation/RouteEnums';

interface LoginScreenProps {
  navigation: any; // Adjust the type based on navigation prop type
}

interface FormData {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const passwordRef = useRef<Input>(null);

  async function onSubmit(data: FormData) {
    Keyboard.dismiss();
    try {
      // Show loading indicator
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      // authentication function
      const response = await loginUser(data.email, data.password);
      setLoading(false);
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
      setLoading(false);
      console.error('Error during login:', error);
      Alert.alert('Login Failed', 'An error occurred during login');
    }
  }

  function navigateToRegister() {
    navigation.navigate(Routes.AuthRoute, {
      screen: AuthRoutes.RegisterPage,
    });
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView enabled={true}>
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
              control={control}
              rules={{}}
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

            {loading && <Spinner size="medium" />}

            <Layout
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.missingAccountText}>
                Vouz navez pas de compte?
              </Text>
              <Pressable onPress={navigateToRegister}>
                <Text style={styles.registerLink}>Créer un compte ici!</Text>
              </Pressable>
            </Layout>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  missingAccountText: {
    marginTop: 10,
    fontSize: 16,
  },
});
