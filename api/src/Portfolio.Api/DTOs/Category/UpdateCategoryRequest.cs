using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.DTOs.Category;
public record UpdateCategoryRequest( string? Icon)
{
};