class User {
    id: number;
    uuid: string;
    email: string;
    name: string;
    login: string;
    about: string;
    userIp: string;
    enable: boolean;
    gender: string[];
    userAvatar: { imageName: string } ;
    userRole: string[];
    dateOfCreated: string;
    lastVisit: string;


    constructor(id: number, uuid: string, email: string, name: string, login: string, about:string, userIp: string, enable: boolean,  gender: string[] = [],
                userAvatar: { imageName: string },  userRole: string[] = [], dateOfCreated: string, lastVisit: string) {
        this.id = id;
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