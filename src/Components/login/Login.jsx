import React, {useState, useContext, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import ResumeContext from '../../Context/ResumeContext'
// import firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database"
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';


const Login = (props) => {
    const {themeData, setThemeData, signup, setSignup, setSignedin, setUser} = useContext(ResumeContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = (signup ? 'Register' : 'Login')+ ' | Resume Lab'
    }, [signup])

    function handleSubmit(e){
        e.preventDefault()
        if(signup){
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                userCredential.user.displayName = name
                setSignedin(true)
                setLoading(false)
                setThemeData({...themeData, personalData: {...themeData.personalData, name: name, email: email}})
                setUser({uid: user.uid,name: name, email: email, data_length: 0})
                const db = getDatabase();
                set(ref(db, 'users/' + user.uid), {
                    name: name,
                    email: email,
                    Data: [],
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
                setLoading(false)
                alert(errorMessage)
            });
        }else{
            setLoading(true)
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setUser({uid: user.uid,name: user.displayName, email: user.email, data_length: 0})
                setThemeData({...themeData, personalData: {...themeData.personalData, name: user.displayName, email: user.email}})
                const db = getDatabase();
                get(ref(db, 'users/' + user.uid)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUser({...user, data_length: snapshot.val().Data ? snapshot.val().Data.length : 0})
                    }
                }).catch((error) => {
                    console.error(error);
                });
                setSignedin(true)
                setLoading(false)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
                setLoading(false)
                alert(errorMessage)
            });
        }
        navigate('/')
    }

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
    
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    data_length: 0
                });
                setThemeData({
                    ...themeData,
                    personalData: { name: user.displayName, email: user.email }
                });
                const db = getDatabase();
                get(ref(db, 'users/' + user.uid))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            setUser({ ...user, data_length: snapshot.val().Data.length });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                setSignedin(true);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
                setLoading(false);
                alert(errorMessage);
                return;
            });
            navigate('/')
    };

    const handleForgotPassword = () => {
        const email = prompt('Enter your email address');
        if (email !== null) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Password reset email sent');
                })
                .catch((error) => {
                    console.error(error);
                    alert('An error occurred. Please try again');
                });
        }
    };
    

    return (
        <div className="container">
            <div className="row">
                {(
                    !signup && (
                        <div className="col-md-6 offset-md-3">
                            <h2 className="text-center">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>Login</button>
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <div className='text-center' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <p>Don't have an account? <Link to="/register" onClick={(e)=>{
                                        e.preventDefault()
                                        setSignup(true)
                                    }}>Register</Link></p>
                                    <p><Link to="/forgot-password" onClick={(e)=>{
                                        e.preventDefault()
                                        handleForgotPassword()
                                    }}>Forgot Password?</Link></p>
                                </div>
                            </form>
                        </div>
                    )
                )}
                {(
                    signup && (
                        <div className="col-md-6 offset-md-3">
                            <h2 className="text-center">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                                </div>
                            </form>
                            <div className="text-center">
                                {error && <p className="text-danger">{error}</p>}
                                <p>
                                    Already have an account? <Link to="/login" onClick={(e)=>{
                                        e.preventDefault()
                                        setSignup(false)
                                    }}>Login</Link>
                                </p>
                            </div>
                        </div>
                    )
                )}
                <button onClick={handleGoogleSignIn} >Google</button>
            </div>
        </div>
    )
}

export default Login