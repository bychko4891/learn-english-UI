import Image from "next/image";

export const UserGender = ({gender}: {gender:string}) => {

    if(gender === "MALE") {
        return (
            <div>
                <Image unoptimized className="colored-svg reset-styles male" src="/images/male.svg" alt="profile" width="20" height="20"/>
            </div>
        );
    }

    return (
        <div>
            <Image unoptimized className="colored-svg reset-styles" src="/images/female.svg" alt="profile" width="20" height="20"/>
        </div>
    );

};