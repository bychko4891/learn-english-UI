import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/app/UserProvider";
import { useRouter } from 'next/navigation';
import {deleteAccessAndRefresh} from "@/app/(protected)/jwtSessionService/deleteAccessAndRefresh";

export const UserGroup = () => {

    const { user } = useUser();

    const { user: currentUser, updateUser } = useUser();

    const router = useRouter()

    const [shouldSignOut, setShouldSignOut] = useState(false);

    function signOut() {
        setShouldSignOut(true);
        deleteAccessAndRefresh();
    }

    useEffect(() => {
        if (shouldSignOut) {
            updateUser(null);
            router.push("/login");
        }
    }, [shouldSignOut]);


    useEffect(() => {
        import("./bootstrap.bundle.min").then((bootstrap) => {
        });
    }, []);

    const avatar = "/api/avatar/" + user?.userAvatar?.imageName || "/images/avatar-2.jpeg";

    return (

        <li className="dropdown ms-2 mb__1">
            <a className="rounded-circle" href="#!" role="button" id="dropdownUser" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar avatar-md avatar-indicators avatar-online">

                    <Image id="userAvatar"  src={avatar}  alt="User avatar" className="rounded-circle" width="40" height="40" />

                </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">

                <div className="px-4 pb-0 pt-2">
                    <div className="lh-1 ">
                        <h5 className="mb-1">{user?.name}</h5>
                        <Link href="/user/profile" className="text-inherit fs-6">View my profile</Link>
                    </div>
                    <div className=" dropdown-divider mt-3 mb-2"></div>
                </div>

                <ul className="list-unstyled">

                    <li>
                        <Link className="dropdown-item d-flex align-items-center" href="/user/edit">
                            <Image className="colored-svg reset-styles me-2" src="/images/edit-user.svg" alt="User edit profile"
                                 width="15" height="15"/>
                            Редагувати
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" href="/user/statistics">
                            <Image className="colored-svg reset-styles me-2" src="/images/statistics.svg"
                                 alt="User statistics" width="15" height="15"/>
                            Статистика
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" href="/user/settings">
                            <Image className="colored-svg reset-styles me-2" src="/images/settings.svg"
                                 alt="User statistics" width="15" height="15"/>
                            Налаштування
                        </Link>
                    </li>
                    <li>
                        {/*<Link className="dropdown-item d-flex align-items-center"  href="#">*/}
                        <Link className="dropdown-item d-flex align-items-center" onClick={signOut} href="#">
                            <Image className="colored-svg reset-styles me-2" src="/images/power-off.svg"
                                 alt="User statistics" width="15" height="15"/>
                            Вихід
                        </Link>
                    </li>
                </ul>

            </div>
        </li>
    )
}