// auth.js
// depends on firebase (v8 namespaced), and firebase-config.js must be included before this file

// Signup: create user & save profile doc
async function signupUser(fullname, email, phone, password, role = 'pengguna', gender = '') {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const uid = res.user.uid;

    await db.collection('users').doc(uid).set({
        fullname,
        email,
        phone,
        password, // simpan password dalam Firestore (not recommended for production)
        role,      // role ikut email
        gender,    // gender ikut input
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return res;
}


// Login email/password
async function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// Google Sign-In popup
async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const res = await auth.signInWithPopup(provider);
  // ensure user doc exists
  const user = res.user;
  const docRef = db.collection('users').doc(user.uid);
  const doc = await docRef.get();
  if (!doc.exists) {
    await docRef.set({
      fullname: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  return res;
}

// Send password reset email
async function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}

// Sign out
async function signOutUser() {
  return auth.signOut();
}

// Listen auth state
function onAuthChange(callback) {
  return auth.onAuthStateChanged(callback); // returns unsubscribe
}

// Get current user doc
async function getCurrentUserDoc() {
  const user = auth.currentUser;
  if (!user) return null;
  const doc = await db.collection('users').doc(user.uid).get();
  return { uid: user.uid, auth: user, data: doc.exists ? doc.data() : null };
}

// Update profile (in Firestore)
async function updateProfileDoc(uid, updates) {
  return db.collection('users').doc(uid).update(updates);
}


