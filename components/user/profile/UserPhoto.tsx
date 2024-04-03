import Image from "next/image";
import ProfileFon from "public/images/profile_fon.jpg"


export const UserPhoto = async ({avatarName}: {avatarName: string }) => {


    const userAvatar = `/api/avatar/${avatarName}` || "/images/avatar-2.jpeg";

    return (
        <div className="user-photo-block overflow-visible">
            <Image className="background-image" src={ProfileFon} alt="profile" />
            <Image className="user-avatar" src={userAvatar} alt="profile" width={200}  height={200} />
        </div>
    );
};