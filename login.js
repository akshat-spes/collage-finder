const email = document.getElementById("email");
const pass = document.getElementById("password");
const status = document.getElementById("status");

document.getElementById("signupBtn").onclick = async () => {
  try {
    const userCred = await createUserWithEmailAndPassword(firebaseAuth, email.value, pass.value);
    await setDoc(doc(firebaseDB, "users", userCred.user.uid), {
      email: email.value,
      created: Date.now(),
      marks: null,
      interest: null,
      region: null
    });
    status.innerText = "✅ Account created!";
  } catch (error) {
    status.innerText = "❌ " + error.message;
  }
};

document.getElementById("loginBtn").onclick = async () => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email.value, pass.value);
    status.innerText = "✅ Logged in!";
    window.location.href = "index.html";
  } catch (error) {
    status.innerText = "❌ " + error.message;
  }
};

document.getElementById("googleBtn").onclick = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);

    // Save user if new
    const ref = doc(firebaseDB, "users", result.user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        email: result.user.email,
        name: result.user.displayName,
        created: Date.now(),
      });
    }

    status.innerText = "✅ Google Login Successful";
    window.location.href = "index.html";
  } catch (error) {
    status.innerText = "❌ " + error.message;
  }
};
