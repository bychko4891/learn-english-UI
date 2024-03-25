import Link from "next/link";
import Image from "next/image";

export const ButtonBack = ({backURL}: { backURL:string }) => {
    return (
        <>
            <Link href={backURL} className="left back-arrow">
                <Image src="/images/arrow-left-bold.svg" width="25" height="25" alt="" className="back-arrow-color" />
            </Link>
        </>
    );
};