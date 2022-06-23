namespace API.DTOs
{
    public class BasketItemDto
    {
        public int ProizvodId { get; set; }
        public string Ime { get; set; }
        public long Cena { get; set; }
        public string PictureUrl { get; set; }
        public string Brend { get; set; }
        public string Tip { get; set; }
        public int Kolicina { get; set; }
    }
}