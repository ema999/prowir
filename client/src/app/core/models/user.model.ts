
export class UserModel {
    email;
    first_name;
    last_name;
    id;

    constructor(data){
      this.email = data.email;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.id = data.id;
    }

}
