import { useState } from "react"
import  axios  from "axios"
import styles from "../styles/sign.module.css"
export const SignIn = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [rescode,setRescode] = useState(null)
    const [err,setErr] = useState(null)
    const baseurl="http://localhost:3030/"
    const handleClick = () =>{
        const body = {
            username: username,
            pass: password,
        }
        axios.post(baseurl + 'signin',body).then((res)=>{
            setErr("logged")
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
                    <h1>Welcome back</h1>
                    <div style={rescode ? {} : { display: 'none' }} >{err}</div>
                    <div className={styles.inputcontainer}>
                        <input onChange={(e)=>{
                            setUsername(e.target.value);
                          }} value={username} placeholder="Username" className={styles.inputfield} type="text"/>
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
                    <button onClick={handleClick}><span>Sign In</span></button>
                <p>Already have an account? <br/><a href="https://www.w3schools.com">Sign In </a></p>
                </div>
            </div>
        </div>
    )
}