using System.Linq;
using API.DTOs;
using API.Entites;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto (this Basket basket) 
        {
              return new BasketDto //mapping code
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                PaymentIntentId = basket.PaymentIntentId,
                ClientSecret = basket.ClientSecret,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProizvodId = item.ProizvodId,
                    Ime = item.Proizvod.Ime,
                    Cena = item.Proizvod.Cena,
                    PictureUrl = item.Proizvod.PictureUrl,
                    Tip = item.Proizvod.Tip,
                    Brend = item.Proizvod.Brend,
                    Kolicina = item.Quantity
                }).ToList()
            };
        }

        public static IQueryable<Basket> RetriveBasketWithItems(this IQueryable<Basket> query, string buyerId) {
            return query.Include(i => i.Items)
                        .ThenInclude(p => p.Proizvod)
                        .Where(b => b.BuyerId == buyerId);
        }
    }
}