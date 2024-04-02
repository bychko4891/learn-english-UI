import Image from "next/image";

export const UserPhoto = async ({avatarName}: {avatarName: string }) => {


    const userAvatar = `/api/avatar/${avatarName}` || "/images/avatar-2.jpeg";

    return (
        <div className="user-photo-block overflow-visible">
            <Image className="background-image" src="/images/profile_fone.jpg" alt="profile" width={1080} height={200} />
            <Image className="user-avatar" src={userAvatar} alt="profile" width={200}  height={200} />
        </div>
    );
};