export class UploadFileDto {
  private constructor(public readonly formData: FormData) {}

  static create(object: FileList | File): [string?, UploadFileDto?] {

    const formData = new FormData();

    if (object === null)
      return ["You must select at least one image", undefined];

    if (typeof object !== "object")
      return ["The files selected are not corrects", undefined];

    const files = object as FileList;

    if(files.length > 0){
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const type = file?.type.split("/").at(0);
        if (type !== "image")
          return ["You have to select only image files", undefined];
  
        formData.append("upload_preset", "react-journal");
        formData.append("file", file!);
      }
    }
    else{

      const file = object as File;

      const type = file?.type.split("/").at(0);
      if (type !== "image")
        return ["You have to select only image files", undefined];

      formData.append("upload_preset", "react-journal");
      formData.append("file", file!);

    }

    return [undefined, new UploadFileDto(formData)];
  }
}
