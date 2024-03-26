importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = {
  apiKey: "AIzaSyB8gNp2YGhfHdWSQgEImaFrWCsJB2EF688",
  authDomain: "testtopic-ec4b8.firebaseapp.com",
  projectId: "testtopic-ec4b8",
  storageBucket: "testtopic-ec4b8.appspot.com",
  messagingSenderId: "423944180806",
  appId: "1:423944180806:web:772f2fe8d1bcb361696647"
  
  };

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon,
      data: { click_action: payload.data.click_action },
      //actions: [{action: "readmore", title: payload.data.readmoretext}],
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  
    const clickAction = event.notification.data.click_action;
  
    // Open the specified URL or perform other actions
    return clients.openWindow(clickAction);
  });
  
self.addEventListener('install', (e) => {
    self.skipWaiting(); //Force activation si MAJ
});
