using System.Linq;
using API.DTOs;
using API.Entites;

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
    }
}