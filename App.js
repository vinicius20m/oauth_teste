import React, { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { authorize, logout } from 'react-native-app-auth';
// import Auth0 from 'react-native-auth0';

// var credentials = { domain: 'dev-21zaq-bt.us.auth0.com', clientId: 'bnV4bO668uhtaBNMpYw9pPOoWaLpp95Q' };
// var credentials = { domain: 'https://app.teste.virtuozo.com.br/oauth/authorize', clientId: 'bnV4bO668uhtaBNMpYw9pPOoWaLpp95Q' };
// const auth0 = new Auth0(credentials);

const config = {
  redirectUrl: 'com.oauth://oauthredirect',
  clientId: '602c0be896859c3f5b9e',
  clientSecret: '4ea5f87a20014cc457bdfc1aefc4b1a50ad230f2',
  scopes: ['identity'],
  additionalHeaders: { 'Accept': 'application/json' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/602c0be896859c3f5b9e'
  }
};

const App = () => {

    let [accessToken, setAccessToken] = useState(null);

    const onLogin = async () => {

      try {
        const result = await authorize(config);
        // result includes accessToken, accessTokenExpirationDate and refreshToken
        setAccessToken(result.accessToken) ;
        Alert.alert('AccessToken: ' + result.accessToken);
        console.log(result)
      } catch (error) {
        console.log(error);
      }

      // AUTH0 AUTH FUNCTION ->

      // auth0.webAuth
      //   .authorize({
      //     scope: 'openid profile email'
      //   })
      //   .then(credentials => {
      //     Alert.alert('AccessToken: ' + credentials.accessToken);
      //     setAccessToken(credentials.accessToken);
      //   })
      //   .catch(error => console.log(error));
    };

    const onLogout = () => {

      Alert.alert('logOut') ;

      // AUTH0 LOGOUT FUNCTION ->

      // auth0.webAuth
      //   .clearSession({})
      //   .then(success => {
      //     Alert.alert('Você saiu da conta!');
      //     setAccessToken(null);
      //   })
      //   .catch(error => {
      //     console.log('Saida Cancelada');
      //   });
    };

    let loggedIn = accessToken !== null;
    return (
      <View>
          <Text> OAuth - Login </Text>
          <Text>Você{loggedIn ? ' ' : ' ainda não '}entrou com sua conta. </Text>
          <Button onPress={loggedIn ? onLogout : onLogin}
            title={loggedIn ? 'Sair' : 'Entrar'} />
      </View >
    );
}

export default App;