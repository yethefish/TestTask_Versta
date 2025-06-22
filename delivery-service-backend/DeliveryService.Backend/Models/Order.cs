using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DeliveryService.Backend.Models
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string SenderCity { get; set; }
        [Required]
        public string SenderAddress { get; set; }
        [Required]
        public string RecipientCity { get; set; }
        [Required]
        public string RecipientAddress { get; set; }
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Вес груза должен быть больше нуля.")]
        public double Weight { get; set; }
        [Required]
        public DateTime PickupDate { get; set; }
    }
}