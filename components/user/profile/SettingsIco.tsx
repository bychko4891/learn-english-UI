import Image from "next/image";


export const SettingsIco = () => {
    return (
        <div className="ms-auto settings-ico" >
            <a className="btn btn-ghost btn-icon rounded-circle " href="/user/settings" role="button">
                <Image className="colored-svg reset-styles ms-auto" src="/images/settings.svg"
                       alt="profile" width="25" height="25"/>
            </a>
        </div>
    );
};