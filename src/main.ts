import { login } from "./api";

const loginSection = document.getElementById('login-section') as HTMLElement;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginError = document.getElementById('login-error') as HTMLParagraphElement;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = (document.getElementById('email') as HTMLInputElement).value
    const password  = (document.getElementById('password') as HTMLInputElement).value

    try {
        loginError.classList.add('hidden')
        const data = await login(email, password)
        localStorage.setItem('api_key', data.API_KEY)
        alert("Du er pålogget! Wohoo!")
    } catch (error) {
        loginError.textContent = (error as Error).message
        loginError.classList.remove('hidden')
    }
})