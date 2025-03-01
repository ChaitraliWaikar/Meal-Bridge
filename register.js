console.log("Script loaded!"); // Check if the script is running

const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signUpContainer = document.getElementById('signup');
const signInContainer = document.getElementById('signIn');

console.log(signUpButton, signInButton, signUpContainer, signInContainer); // Check if elements are selected

signUpButton.addEventListener('click', () => {
    console.log("Sign Up button clicked!"); // Debugging
    signUpContainer.style.display = 'block';
    signInContainer.style.display = 'none';
});

signInButton.addEventListener('click', () => {
    console.log("Sign In button clicked!"); // Debugging
    signInContainer.style.display = 'block';
    signUpContainer.style.display = 'none';
});