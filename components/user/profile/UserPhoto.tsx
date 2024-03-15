'use server';

import Image from "next/image";

export const UserPhoto = async () => {

    const userAvatar = "/api/avatar/no-avatar.png";

    return (
        <div className="user-photo-block overflow-visible">
            <img className="background-image" src="/images/profile_fone.jpg" alt="profile" />
            <Image className="user-avatar" src={userAvatar} alt="profile" width="200" height="200" />
        </div>
    );
};