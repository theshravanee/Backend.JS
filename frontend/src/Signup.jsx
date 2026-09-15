import { useState } from "react"

function Signup() {

    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [role, setRole] = useState("user")
    let [message, setMessage] = useState("")

    let handleSignup = async () => {

        let response = await fetch(
            "http://localhost:3000/signUp",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role
                })
            }
        )

        let data = await response.text()

        setMessage(data)
    }

    return (
        <div>

            <h1>Signup</h1>

            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <button onClick={handleSignup}>
                Signup
            </button>

            <p>{message}</p>

        </div>
    )
}

export default Signup