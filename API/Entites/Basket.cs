using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entites
{
    [Table("Baskets")]
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }

        public void AddItem(Proizvod proizvod, int quantity)
        {
            if (Items.All(item => item.ProizvodId != proizvod.Id))
            {
                Items.Add(new BasketItem{Proizvod = proizvod, Quantity = quantity});
            }
            var existingItem = Items.FirstOrDefault(item => item.ProizvodId == proizvod.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }
        public void RemoveItem(int proizvodId, int quantity) //za update db
        {
            var item = Items.FirstOrDefault(item => item.ProizvodId == proizvodId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item); //ukoliko je u kolicima 0, izbaci ga iz kolica 
        }
    }
}