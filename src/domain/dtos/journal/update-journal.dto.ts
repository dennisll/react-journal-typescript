export class UpdateJournalDto {
  private constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly idUser: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly nameClient?: string,
    public readonly imageUrls?: string[]
  ) {}

  get values(){

    const returnObject: {[key:string]: any} = {}

    //if ( this.id ) returnObject.id = this.id;
    if ( this.title ) returnObject.title = this.title;
    if ( this.description ) returnObject.description = this.description;
    if ( this.nameClient ) returnObject.nameClient = this.nameClient;
    if ( this.createdAt ) returnObject.createdAt = this.createdAt;
    if ( this.idUser ) returnObject.idUser = this.idUser;
    if ( this.imageUrls ) returnObject.imageUrls = this.imageUrls;

    return returnObject;
}

  static create(object: {
    [key: string]: any;
  }): [string?, UpdateJournalDto?] {

    const { id, title, description, nameClient, idUser, createdAt, imageUrls = [] } =
      object;

    if (!title) return ["Title property is required", undefined];
    if (!description) return ["Description property is required", undefined];
    if (!nameClient) return ["NameClient property is required", undefined];
    if (!idUser) return ["IdUser property is required", undefined];
    if (!nameClient) return ["NameClient property is required", undefined];
    if(imageUrls.length > 0){
       if(typeof imageUrls[0] !== 'string') return ["Error durante la seleccion de los files", undefined];
    }
    if (createdAt.toString() === "Invalid Date")
      return ["CreatedAt must be a valid date"];

    const updatedAt = new Date();

    return [
      undefined,
      new UpdateJournalDto(
        id,
        createdAt,
        updatedAt,
        idUser,
        title,
        description,
        nameClient,
        imageUrls
      ),
    ];
  }
}
