export class UpdateRegisterDto {
  private constructor(
    public readonly id: string,
    public readonly idUser: string,
    public readonly createdAt?: string,
    public readonly lat?: string,
    public readonly long?: string,
    public readonly imageUrl?: string
  ) {}

  get values() {

    const returnObject: { [key: string]: string } = {};

    if (this.lat) returnObject.lat = this.lat;
    if (this.long) returnObject.long = this.long;
    if (this.imageUrl) returnObject.imageUrl = this.imageUrl;
    if (this.createdAt) returnObject.createdAt = this.createdAt;

    return returnObject;
  }

  static create(object: {
    [key: string]: string
  }): [string?, UpdateRegisterDto?] {

    const { id, idUser, lat, long, imageUrl, createdAt } = object;

    let newCreatedAt = new Date();

    if (!id) return ["Id property is required", undefined];
    if (!idUser) return ["IdUser property is required", undefined];

    if(createdAt){

      newCreatedAt = new Date(createdAt);
      if (newCreatedAt.toString() === "Invalid Date")
        return ["CreatedAt must be a valid date"];
    }
    

    return [
      undefined,
      new UpdateRegisterDto(id, idUser, newCreatedAt.toISOString(), lat, long, imageUrl),
    ];
  }
}
