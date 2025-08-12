export class CreateJournalDto {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly nameClient: string,
    public readonly idUser: string,
    public readonly imageUrls: FileList
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateJournalDto?] {
    const { title, description, nameClient, idUser, imageUrls = [] } = object;

    if (!title) return ["Title property is required", undefined];
    if (!description) return ["Description property is required", undefined];
    if (!nameClient) return ["NameClient property is required", undefined];
    if (!idUser) return ["IdUser property is required", undefined];
    if (!nameClient) return ["NameClient property is required", undefined];
    if (imageUrls === null)
      return ["You must select at least one image", undefined];
    if (imageUrls.length === 0)
      return ["You must select at least one image", undefined];

    /* for (let i = 0; i < imageUrls.length; i++) {
      const file = (imageUrls as FileList).item(i);
      const type = file?.type.split("/").at(0);
      if (type !== "image")
        return ["You have to select only image files", undefined];
    }
      */

    const createdAt = new Date(); 

    return [
      undefined,
      new CreateJournalDto(
        title,
        description,
        createdAt,
        nameClient,
        idUser,
        imageUrls
      ),
    ];
  }

  get values() {
    const returnObject: { [key: string]: any } = {};

    if (this.title) returnObject.title = this.title;
    if (this.description) returnObject.description = this.description;
    if (this.nameClient) returnObject.nameClient = this.nameClient;
    if (this.createdAt) returnObject.createdAt = this.createdAt;
    if (this.idUser) returnObject.idUser = this.idUser;
    if (this.imageUrls) returnObject.imageUrls = this.imageUrls;

    return returnObject;
  }
}
