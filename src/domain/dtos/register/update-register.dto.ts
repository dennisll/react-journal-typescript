export class UpdateRegisterDto {
  private constructor(
    public readonly createdAt: Date,
    public readonly lat: string,
    public readonly long: string,
    public readonly imageUrl: string
  ) {}

  get values() {

    const returnObject: { [key: string]: unknown } = {};

    if (this.lat) returnObject.lat = this.lat;
    if (this.long) returnObject.long = this.long;
    if (this.imageUrl) returnObject.imageUrl = this.imageUrl;
    if (this.createdAt) returnObject.createdAt = this.createdAt;

    return returnObject;
  }

  static create(object: {
    [key: string]: string;
  }): [string?, UpdateRegisterDto?] {
    const { lat, long, imageUrl, createdAt } = object;

    if (!lat) return ["Lat property is required", undefined];
    if (!long) return ["Long property is required", undefined];
    if (!imageUrl) return ["IdClient property is required", undefined];

    const newCreatedAt = new Date(createdAt);
    if (newCreatedAt.toString() === "Invalid Date")
      return ["CreatedAt must be a valid date"];

    return [
      undefined,
      new UpdateRegisterDto(newCreatedAt, lat, long, imageUrl),
    ];
  }
}
