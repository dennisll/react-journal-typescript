export class CreateJournalDto {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly createdAt: string,
    public readonly nameClient: string,
    public readonly idUser: string,
    public readonly imageUrls?: string[]
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateJournalDto?] {

    const { title, description, nameClient, idUser, imageUrls = [] } =
      object;

    if (!title) return ["Title property is required", undefined];
    if (!description) return ["Description property is required", undefined];
    if (!nameClient) return ["NameClient property is required", undefined];
    if (!idUser) return ["IdUser property is required", undefined];
    if (!nameClient) return ["NameClient property is required", undefined];
    if(imageUrls.length > 0){
       if(typeof imageUrls[0] !== 'string') return ["Error durante la seleccion de los files", undefined];
    }

    const createdAt = new Date();

    return [
      undefined,
      new CreateJournalDto(
        title,
        description,
        createdAt.toISOString(),
        nameClient,
        idUser,
        imageUrls
      ),
    ];
  }
}
