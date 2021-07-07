import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCiEExmHVbf-2_zaHmfbn1I49KyeyIhG-c',
  authDomain: 'auth-production-3f32b.firebaseapp.com',
  projectId: 'auth-production-3f32b',
  storageBucket: 'auth-production-3f32b.appspot.com',
  messagingSenderId: '903259303439',
  appId: '1:903259303439:web:7b37bd22d12f540b38fd7a'
})
console.log(app)
export const auth = app.auth()
export default app
