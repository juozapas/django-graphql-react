import * as React from 'react'
import { FormEvent } from 'react'

export default class LoginView extends React.Component {

    private form: HTMLFormElement | null

    async handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let data = new FormData(this.form!)
        const res = await fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            body: data,
        })

        const resultJson = await res.json()

        if (resultJson.token) {
            localStorage.setItem('token', resultJson.token)
            window.location.replace('/')
        }

    }

    render() {
        return (
            <div>
                <h1>LoginView</h1>
                <form
                    ref={ref => (this.form = ref)}
                    onSubmit={e => this.handleSubmit(e)}
                >
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}