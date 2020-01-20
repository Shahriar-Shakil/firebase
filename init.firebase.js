console.log(firebase.app().name);

// Use the shorthand notation to access the default project's Firebase services

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BNT1oniBSFAICvrun7ILIHjm8XUiUGinGkDPD7ZXQjzHne0cRYGSr-TAv_Z_aveEHyaes5BNDNqGuabWbZcNV5I");

console.log(Notification.requestPermission())

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
  } else {
    console.log('Unable to get permission to notify.');
  }
});

console.log(messaging.getToken())
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
  if (currentToken) {
    sendTokenToServer(currentToken);
    updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    updateUIForPushPermissionRequired();
    setTokenSentToServer(false);
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
})

