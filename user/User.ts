class User {
    user_id: number;
    uuid: string;
    email: string;
    name?: string;
    login?: string;
    about?: string;
    userIp?: string;
    enable: boolean;
    gender?: "male" | "female";
    userAvatar: { imageName: string } ;
    userRole: "ADMIN" | "USER";
    dateOfCreated?: string;
    lastVisit?: string;


    constructor(user_id: number, uuid: string, email: string, name: string, login: string, about:string, userIp: string, enable: boolean,  gender: "male" | "female",
                userAvatar: { imageName: string },  userRole: "ADMIN" | "USER", dateOfCreated: string, lastVisit: string) {
        this.user_id = user_id;
        this.uuid = uuid;
        this.email = email;
        this.name = name;
        this.login = login;
        this.about = about;
        this.userIp = userIp;
        this.enable = enable;
        this.gender = gender;
        this.userAvatar = userAvatar;
        this.userRole = userRole;
        this.dateOfCreated = dateOfCreated;
        this.lastVisit = lastVisit;
    }
}

export default User;