using ErrorOr;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services.Interfaces;
public interface ICategoryService
{
    Task<ErrorOr<IEnumerable<CategoryResponse>>> GetAllAsync();
    Task<ErrorOr<CategoryResponse>> GetByIdAsync(int id);
    Task<ErrorOr<CategoryResponse>> AddAsync( CreateCategoryRequest req);
    Task<ErrorOr<CategoryResponse>> UpdateAsync(int id, UpdateCategoryRequest req);
    Task<ErrorOr<Deleted>> DeleteAsync( int id );
}
