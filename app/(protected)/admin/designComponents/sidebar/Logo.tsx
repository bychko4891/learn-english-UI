import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
    return (
        <Link className="navbar-brand" href="/public" >
            <Image unoptimized src="/images/logo.png" alt="Learn English" width={32.4} height={30} />
            <div className="logo">
                <span>Learn</span><span className="danger">English</span>
            </div>
        </Link>
    );
};