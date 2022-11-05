import { Item } from "./item";

export class Client implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public lastName?: string,
    public firstName?: string,
    public email?: string,
    public phoneNumber?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this["@id"] = _id;
  }
}
