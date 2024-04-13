import Image from "next/image";
import ProfileFon from "public/images/profile_fon.jpg"


export const UserPhoto = async ({avatarName}: {avatarName: string }) => {


    const userAvatar = `/api/avatar/${avatarName}` || "/images/avatar-2.jpeg";

    return (
        <div className="user-photo-block overflow-visible">
            <Image unoptimized className="background-image" src={ProfileFon} alt="profile" />
            <Image unoptimized className="user-avatar" src={userAvatar} alt="profile" width={200}  height={200} />
        </div>
    );
};