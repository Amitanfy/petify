import { useState } from "react"
import  axios  from "axios"
import styles from "../styles/sign.module.css"
export const SignUp = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [rescode,setRescode] = useState(null)
    const [err,setErr] = useState(null)

    const baseurl="http://localhost:3030/"
    const handleClick = () =>{
        const body = {
            username: username,
            pass: password,
            email: email
        }
        axios.post(baseurl + 'signup',body).then((res)=>{
            setErr("Verify your email")
            setRescode(200)
        }).catch((err)=>{
            setRescode(err.response.status)
            setErr(err.response.data.messege)
        })
        
    }
    return(
        <div className={styles.frame}>
            <div className={styles.main}>
                <div className={styles.pic}></div>
                <div className={styles.inp}>
                    <h1>Create your new account</h1>
                    <div style={rescode ? {} : { display: 'none' }} >{err}</div>
                    <div className={styles.inputcontainer}>
                        <input onChange={(e)=>{
                            setEmail(e.target.value);
                        }} value={email} placeholder="Email" className={styles.inputfield} type="text"/>
                        <label for="inputfield" className={styles.inputlabel}>Enter email</label>
                        <span className={styles.inputhighlight}></span>
                    </div>

                    <div className={styles.inputcontainer}>
                        <input onChange={(e)=>{
                            setUsername(e.target.value);
                          }} value={username}  placeholder="Username" className={styles.inputfield} type="text"/>
                        <label for="inputfield" className={styles.inputlabel}>Enter username</label>
                        <span className={styles.inputhighlight}></span>
                    </div>

                    <div className={styles.inputcontainer}>
                        <input onChange={(e)=>{
                            setPassword(e.target.value);
                          }} value={password} placeholder="Password" className={styles.inputfield} type="text"/>
                        <label for="inputfield" className={styles.inputlabel}>Enter password</label>
                        <span className={styles.inputhighlight}></span>
                    </div>
                <button onClick={handleClick}><span>Sign Up!</span></button>
                <p>Already have an account? <br/><a href="https://www.w3schools.com">Sign In </a></p>
                </div>
            </div>
        </div>
    )
}