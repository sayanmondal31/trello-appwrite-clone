import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUpload = await storage.createFile(
    "649051c20ac7bf024d33",
    ID.unique(),
    file
  );

  return fileUpload;
};

export default uploadImage;
