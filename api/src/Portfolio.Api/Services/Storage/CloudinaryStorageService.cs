using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using ErrorOr;
using Error = ErrorOr.Error;

namespace Portfolio.Api.Services.Storage;

public class CloudinaryStorageService : IStorageService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryStorageService(IConfiguration config)
    {
        var cloudinaryUrl = config["ConnectionStrings:CloudinaryUrl"];
        if (string.IsNullOrEmpty(cloudinaryUrl))
        {
            throw new ArgumentNullException("ConnectionStrings:CloudinaryUrl", "La URL de Cloudinary no está configurada.");
        }
        _cloudinary = new Cloudinary(cloudinaryUrl);
        _cloudinary.Api.Secure = true;
    }

    public async Task<ErrorOr<string>> UploadAsync(IFormFile file, string containerName)
    {
        try
        {
            if (file == null || file.Length == 0)
                return Error.Validation("Storage.FileEmpty", "El archivo está vacío.");

            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = containerName
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
                return Error.Failure("Storage.UploadFailed", $"Cloudinary error: {uploadResult.Error.Message}");

            return uploadResult.SecureUrl.ToString();
        }
        catch (Exception ex)
        {
            return Error.Failure("Storage.UploadFailed", $"Error al subir la imagen: {ex.Message}");
        }
    }

    public async Task<ErrorOr<Deleted>> DeleteAsync(string fileUrl, string containerName)
    {
        try
        {
            var uri = new Uri(fileUrl);
            var segments = uri.Segments;
            var fileNameWithExtension = segments.Last();
            var fileName = Path.GetFileNameWithoutExtension(fileNameWithExtension);
            
            var publicId = string.IsNullOrEmpty(containerName) ? fileName : $"{containerName}/{fileName}";

            var deletionParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deletionParams);

            if (result.Result == "ok" || result.Result == "not found")
            {
                return Result.Deleted;
            }

            return Error.Failure("Storage.DeleteFailed", $"Cloudinary error: {result.Error?.Message ?? result.Result}");
        }
        catch (Exception ex)
        {
            return Error.Failure("Storage.DeleteFailed", $"Error al eliminar la imagen: {ex.Message}");
        }
    }
}
