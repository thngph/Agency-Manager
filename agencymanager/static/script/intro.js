const registerFooterBtn=document.querySelector(".register-footer-btn")
const loginFooterBtn=document.querySelector(".login-footer-btn")
const loginForm=document.querySelector(".login.auth-form")
const registerForm=document.querySelector(".register.auth-form")

registerFooterBtn.onclick=function()
{
    loginForm.classList.add("hidden")
    registerForm.classList.remove("hidden")
}

loginFooterBtn.onclick=function()
{
    loginForm.classList.remove("hidden")
    registerForm.classList.add("hidden")
}
