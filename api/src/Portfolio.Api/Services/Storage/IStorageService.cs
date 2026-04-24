using ErrorOr;

namespace Portfolio.Api.Services.Storage;

public interface IStorageService
{
    Task<ErrorOr<string>> UploadAsync(IFormFile file, string containerName);
    Task<ErrorOr<Deleted>> DeleteAsync(string fileUrl, string containerName);
}