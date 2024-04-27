class User {

    uuid: string;
    email: string;
    name: string;
    login: string;
    about: string;
    gender: string[];
    userAvatar: { imageName: string } ;
    userRole: string[];
    dateOfCreated: string;


    constructor(uuid: string, email: string, name: string, login: string, about:string, gender: string[] = [],
                userAvatar: { imageName: string },  userRole: string[] = [], dateOfCreated: string) {
        this.uuid = uuid;
        this.email = email;
        this.name = name;
        this.login = login;
        this.about = about;
        this.gender = gender;
        this.userAvatar = userAvatar;
        this.userRole = userRole;
        this.dateOfCreated = dateOfCreated;
    }
}

export default User;