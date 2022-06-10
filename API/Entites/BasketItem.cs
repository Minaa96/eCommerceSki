using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entites
{
    [Table("BasketsItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        public int ProizvodId { get; set; }
        public Proizvod Proizvod { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}