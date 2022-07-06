namespace API.Entites.OrderAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        public long Cena { get; set; }
        public int Kolicina { get; set; }
    }
}