using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entites;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<Korisnik> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new Korisnik
                {
                    UserName = "min",
                    Email = "min@test.com"
                };
                
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");

            var admin = new Korisnik
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
            
            }

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
                    KolicinaNaStanju = 15
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
                    KolicinaNaStanju = 10

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
                    KolicinaNaStanju = 10

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
                    KolicinaNaStanju = 5

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
                    KolicinaNaStanju = 5

                },
                  new Proizvod {
                    Ime = "Hybrid zenski",
                    Opis = "Duks za planinarenje",
                    Velicina = "M",
                    Boja = "Ljubicasta",
                    Cena = 30000,
                    PictureUrl = "Images/proizvodi/hybrid.jpg",
                    Tip = "Skijanje",
                    Brend = "Ortovox",
                    KolicinaNaStanju = 5

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
                    KolicinaNaStanju = 15

                },
                 new Proizvod {
                    Ime = "Pancerice",
                    Opis = "Pancerica za svaki stil",
                    Velicina = "305mm",
                    Boja = "Narandzasta",
                    Cena = 60000,
                    PictureUrl = "Images/proizvodi/muskapanc.webp",
                    Tip = "Freeride",
                    Brend = "Tecnica",
                    KolicinaNaStanju = 10

                },
                 new Proizvod {
                    Ime = "Skije",
                    Opis = "Skija za pistu",
                    Velicina = "185cm",
                    Boja = "Crvena",
                    Cena = 150000,
                    PictureUrl = "Images/proizvodi/r.jpg",
                    Tip = "Piste",
                    Brend = "Rossignol",
                    KolicinaNaStanju = 10

                },
                 new Proizvod {
                    Ime = "Pantalone",
                    Opis = "Pantalone za skijanje i planinarenje zenske",
                    Velicina = "L",
                    Boja = "Zelena",
                    Cena = 55000,
                    PictureUrl = "Images/proizvodi/o.jpg",
                    Tip = "Skijanje",
                    Brend = "Ortovox",
                    KolicinaNaStanju = 10

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