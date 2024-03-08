import Link from "next/link";

export const Logo = () => {
    return (
        <Link className="navbar-brand" href="/" >
            <img src="/images/logo.png" alt="Learn English" />
            <div className="logo">
                <span>Learn</span><span className="danger">English</span>
            </div>
        </Link>
    );
};