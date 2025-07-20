

export class Client{

    constructor(  
      public id: string,
      public name: string,
      public address: string,
      public description: string,
    ) {}

    static getClientFromObject( object: {[key:string]: any}): Client{

      const {id, name, description, address} = object;

      if(!id) throw "Missing id, this property is required";
      if(!name) throw "Missing name, this property is required";
      if(!description) throw "Missing description, this property is required";
      if(!address) throw "Missing address, this property is required";

      return new Client(id, name, address, description)
    }
}