import Link from "next/link";

export const LogoMobile = () => {
    return (
        <Link className="navbar-brand d-block d-md-none" href="/public">
            <div className="logo">
                <span>Learn</span><span className="danger">English</span>
            </div>
        </Link>
    );
};