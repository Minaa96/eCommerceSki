using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entites;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if(context.Proizvodi.Any()) return;

            var proizvodi = new List<Proizvod>{
                new Proizvod {
                    Ime = "Skije",
                    Opis = "Skija za dubok sneg",
                    Velicina = "155cm",
                    Boja = "Ljubicasta",
                    Cena = 56000,
                    PictureUrl = "Images/proizvodi/elan-wildcat-82-c-ps.jpg",
                    Tip = "Freeride",
                    Brend = "Elan",
                    KolicinaNaStanju = "15"

                },
                 new Proizvod {
                    Ime = "Pancerice",
                    Opis = "Pancerica za dubok sneg",
                    Velicina = "295mm",
                    Boja = "Ljubicasta",
                    Cena = 60000,
                    PictureUrl = "Images/proizvodi/15430401_5.jpg",
                    Tip = "Freeride",
                    Brend = "Tecnica",
                    KolicinaNaStanju = "10"

                },
                new Proizvod {
                    Ime = "Stapovi",
                    Opis = "Stapovi za skijanje",
                    Velicina = "115cm",
                    Boja = "Plavi",
                    Cena = 10000,
                    PictureUrl = "Images/proizvodi/SKI-DH5060_1.webp",
                    Tip = "Skijanje",
                    Brend = "Rossingol",
                    KolicinaNaStanju = "10"

                },
                 new Proizvod {
                    Ime = "Westaplen zenski",
                    Opis = "Komplet za skijanje",
                    Velicina = "M",
                    Boja = "Plavi",
                    Cena = 130000,
                    PictureUrl = "Images/proizvodi/70212-WESTALPEN_3L_LIGHT_JACKET_W-M-01.jpg",
                    Tip = "Skijanje",
                    Brend = "Ortovox",
                    KolicinaNaStanju = "5"

                },
                 new Proizvod {
                    Ime = "Westaplen muski",
                    Opis = "Komplet za skijanje",
                    Velicina = "M",
                    Boja = "Zelena",
                    Cena = 130000,
                    PictureUrl = "Images/proizvodi/images.jpg",
                    Tip = "Skijanje",
                    Brend = "Ortovox",
                    KolicinaNaStanju = "5"

                }


            };

            foreach (var proizvod in proizvodi)
            {
                context.Proizvodi.Add(proizvod);
            }

            context.SaveChanges();
        }
        
    }
}