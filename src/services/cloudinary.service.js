import { v2 as cloudinary } from 'cloudinary'

const uploadImage = async (path, folder = 'test') => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(path, {
      folder: folder,
    })
    return { url: uploadedImage.secure_url, publicId: uploadedImage.public_id }
  } catch (err) {
    throw err
  }
}
export { uploadImage }
