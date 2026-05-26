
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using ErrorOr;

namespace Portfolio.Api.Services.Storage;

public class AzureStorageService(IConfiguration config) : IStorageService
{
    private readonly string _connectionString = config["ConnectionStrings:AzureStorage"]!;
    public async Task<ErrorOr<string>> UploadAsync(IFormFile file, string containerName)
    {
        try
        {
            var containerClient = new BlobContainerClient(_connectionString, containerName);
            await containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var blobClient = containerClient.GetBlobClient(fileName);

            using var stream = file.OpenReadStream();
            await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = file.ContentType });
            return blobClient.Uri.ToString();
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
            var fileName = Path.GetFileName(uri.LocalPath);
            var containerClient = new BlobContainerClient(_connectionString, containerName);
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.DeleteIfExistsAsync();
            return Result.Deleted;
        }
        catch (Exception ex)
        {
            return Error.Failure("Storage.DeleteFailed", $"Error al eliminar la imagen: {ex.Message}");
        }
    }

}