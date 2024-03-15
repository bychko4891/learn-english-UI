import {UserPhoto} from "./UserPhoto";
import {SettingsIco} from "@/components/user/profile/SettingsIco";
import {UserInfo} from "@/components/user/profile/UserInfo";
import {UserNavigation} from "@/components/user/profile/UserNavigation";
import "./userstyles.css";
export const LeftBlock = async () => {


    return (
        <div className="col-md-8 col-12 main-content overflow-hidden p-0 col">
            <UserPhoto/>
            <div className="w-100 d-flex flex-column">

                <SettingsIco/>
                <div className="row profile-content">
                    <UserInfo />

                    <UserNavigation/>
                </div>
            </div>
        </div>
    );
};