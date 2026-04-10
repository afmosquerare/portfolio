namespace Portfolio.Api.Models;

public class Message : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email {get;set;} = string.Empty;
    public string Body { get; set; } = string.Empty;
    public bool isRead { get; set;}
}