namespace CarRegistrationApi.Models
{
    public class Car
    {
        public int Id { get; set; }
        public required string Make { get; set; }
        public required string Model { get; set; }
        public required string RegistrationNumber { get; set; }
        public DateTime RegistrationExpiryDate { get; set; }
    }
}