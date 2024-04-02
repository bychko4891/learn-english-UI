import {UserPhoto} from "./UserPhoto";
import {SettingsIco} from "@/components/user/profile/SettingsIco";
import {UserInfo} from "@/components/user/profile/UserInfo";
import {UserNavigation} from "@/components/user/profile/UserNavigation";
import "./userstyles.css";
import {getUserAPI} from "@/app/(protected)/user/profile/getUserAPI";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
export const LeftBlock = async () => {

    const user = await getUserAPI();

  if(user) {

    return (
        <div className="col-md-8 col-12 main-content overflow-hidden p-0 col">
            <UserPhoto avatarName={user.userAvatar.imageName} />
            <div className="w-100 d-flex flex-column">

                <SettingsIco/>
                <div className="row profile-content">
                    <UserInfo user={user} />

                    <UserNavigation/>
                </div>
            </div>
        </div>
    );

} else {

    return (
        <>
            <DeleteJwtAccessToken/>
        </>
    );

}

};