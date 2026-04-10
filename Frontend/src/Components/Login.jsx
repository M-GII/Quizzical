import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
export default function Login({ setToken, token, setShowLoginPage, backendUrl , setShowQuestionsPage, previousPage }) {
    const [isLogin, setIsLogin] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (token) setShowLoginPage(false)
    }, [token])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (!isLogin) {
                const response = await axios.post(backendUrl + "/api/user/register", { name, email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token)
                    toast.success(response.data.message);
                    setShowLoginPage(false)
                    if (previousPage === "questions") {
                        setShowQuestionsPage(true)
                    } else {
                        setShowQuestionsPage(false)
                    }
                }
            } else {
                const response = await axios.post(backendUrl + "/api/user/login", { email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token)
                    toast.success(response.data.message);
                    setShowLoginPage(false)
                    if (previousPage === "questions") {
                        setShowQuestionsPage(true)
                    } else {
                        setShowQuestionsPage(false)
                    }
                }
            }
        } catch (error) {
            console.error(error?.response?.data?.message || "Error during authentication")
            toast.error(error?.response?.data?.message || "Error during authentication");
        }
    }

    return (
        <section className="login-page">
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <div className="login-divider"></div>
            <form onSubmit={onSubmitHandler} className="login-form">
                {!isLogin && (
                    <input type="text" placeholder="Name" value={name}
                        onChange={(e) => setName(e.target.value)} required />
                )}
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                <div className="login-toggle">
                    <span onClick={() => setIsLogin(prev => !prev)}>
                        {isLogin ? "Create Account" : "Login Here"}
                    </span>
                </div>
                <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
            </form>
        </section>
    )
}