export class UpdateJournalDto {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly createdAt: string,
    public readonly idClient: string,
    public readonly idUser: string,
    public readonly idWorkers?: string[],
    public readonly imageUrls?: string[]
  ) {}

  get values() {
    const returnObject: { [key: string]: unknown } = {};

    if (this.title) returnObject.title = this.title;
    if (this.description) returnObject.description = this.description;
    if (this.idClient) returnObject.idClient = this.idClient;
    if (this.idUser) returnObject.idUser = this.idUser;
    if (this.createdAt) returnObject.createdAt = this.createdAt;
    if (this.idWorkers) returnObject.createdAt = this.createdAt;
    if (this.imageUrls) returnObject.createdAt = this.createdAt;

    return returnObject;
  }

  static create(object: {
    [key: string]: any;
  }): [string?, UpdateJournalDto?] {
    const {
      id,
      title,
      description,
      createdAt,
      idClient,
      idUser,
      idWorkers,
      imageUrls,
    } = object;

    if (!id) return ["Id property is required", undefined];
    if (!title) return ["Title property is required", undefined];
    if (!description) return ["Description property is required", undefined];
    if (!createdAt) return ["CreatedAt property is required", undefined];
    if (!idClient) return ["IdClient property is required", undefined];
    if (!idUser) return ["IdClient property is required", undefined];
    const newCreatedAt = new Date(createdAt);
    if (newCreatedAt.toString() === "Invalid Date")
      return ["CreatedAt must be a valid date"];

    return [
      undefined,
      new UpdateJournalDto(
        id,
        title,
        description,
        newCreatedAt.toISOString(),
        idClient,
        idUser,
        idWorkers,
        imageUrls
      ),
    ];
  }
}
