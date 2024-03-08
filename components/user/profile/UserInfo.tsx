import Image from "next/image";
import {getUserAPI} from "@/app/(protected)/user/profile/getUserAPI";
import {UserGender} from "@/components/user/profile/UserGender";
import {formatDate} from "@/components/formatDate";

export const UserInfo = async () => {

    const user = await getUserAPI();
    const gender = user?.gender.at(1) || 'MALE';

    const date: string = await formatDate(user?.dateOfCreated!);


    return (
        <div className="col-md-6 col-12 text-justify">
            <span>@</span>
            <span>{user?.login}</span>
            <div className="row">
                <h3>{user?.name}</h3>
                <UserGender gender={gender} />
            </div>
            <div className="d-flex align-items-center ma-10-0">
                <Image className="colored-svg reset-styles me-1" src="/images/mail.svg" alt="profile" width="20" height="20"/>
                <span>{user?.email}</span>
            </div>
            <div className="d-flex align-items-center ma-10-0">
                <Image className="colored-svg reset-styles me-1" src="/images/date.svg" alt="profile" width="20" height="20"/>
                <span>{date}</span>
            </div>
            <div className="user-about">
                <p>{user?.about}</p>
            </div>
        </div>
    );
};