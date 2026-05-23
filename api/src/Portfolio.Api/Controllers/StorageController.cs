using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Services.Storage;

namespace Portfolio.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/storage")]
public class StorageController(IStorageService storageService) : ApiController
{
    private const string _commonContainer = "project-images";
    [HttpPost]
    public async Task<IActionResult> Upload(IFormFile file, [FromQuery] string container = _commonContainer)
        => HandleResult(await storageService.UploadAsync(file, container));

    [HttpDelete]
    public async Task<IActionResult> Delete(string fileUrl, [FromQuery] string container = _commonContainer)
        => HandleDeletedResult(await storageService.DeleteAsync(fileUrl, container));
}