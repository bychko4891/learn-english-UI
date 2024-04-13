import Image from "next/image";
import {UserGender} from "@/components/user/profile/UserGender";
import {formatDate} from "@/components/formatDate";
import {SaveUserForContext} from "@/components/user/profile/SaveUserForContext";
import User from "@/user/User";

export const UserInfo = async ({user}: { user: User }) => {

    const gender = user?.gender[0] || 'MALE';

    const date: string = await formatDate(user?.dateOfCreated!);

    return (
        <>
            <SaveUserForContext user={user}/>
            <div className="col-md-6 col-12 text-justify">
                <span>@</span>
                <span>{user?.login}</span>
                <div className="row">
                    <h3>{user?.name}</h3>
                    <UserGender gender={gender}/>
                </div>
                <div className="d-flex align-items-center ma-10-0">
                    <Image unoptimized className="colored-svg reset-styles me-1" src="/images/mail.svg" alt="profile" width="20"
                           height="20"/>
                    <span>{user?.email}</span>
                </div>
                <div className="d-flex align-items-center ma-10-0">
                    <Image unoptimized className="colored-svg reset-styles me-1" src="/images/date.svg" alt="profile" width="20"
                           height="20"/>
                    <span>{date && date || ""}</span>
                </div>
                <div className="user-about">
                    <p>{user?.about}</p>
                </div>
            </div>
        </>
    );
};