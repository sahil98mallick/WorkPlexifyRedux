import React from 'react'
import { useAuth } from '../../AuthManager/AuthManager'
import { Link } from 'react-router-dom';

const EmptyPage = () => {
    const [auth] = useAuth();
    return (
        <>
            <main>
                <div className="container">
                    <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <h1>404</h1>
                        <h2>The page you are looking for doesn't exist.</h2>
                        {
                            auth?.user?.userType === "User" ? (
                                <><Link to='/UserDashboard' className="btn" href="index.html">Back to Dashboard</Link></>
                            ) : (
                                <>
                                    <Link className="btn" href="index.html">Back to Dashboard</Link>
                                </>
                            )
                        }
                        <img src="assets/img/not-found.svg" className="img-fluid py-5" alt="Page Not Found" />
                        <div className="credits">
                            Designed by <a href="#">Sahil Mallick</a>
                        </div>
                    </section>
                </div>
            </main>

        </>
    )
}

export default EmptyPage