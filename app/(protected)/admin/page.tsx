import Link from "next/link";

export default async function AdminMainPage() {


    return (
            <div className="app-content-area">
                <div className="w-100">
                    <div className="navigation-block row justify-content-between">
                        <Link href="/" >
                        <div>

                        </div>
                        </Link>
                    </div>

                </div>
                <h1>AdminMainPage</h1>
                {/*<Edit />*/}
            </div>
    );
}