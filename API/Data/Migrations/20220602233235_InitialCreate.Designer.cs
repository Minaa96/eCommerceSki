﻿// <auto-generated />
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Data.Migrations
{
    [DbContext(typeof(StoreContext))]
    [Migration("20220602233235_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.5");

            modelBuilder.Entity("API.Entites.Proizvod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Boja")
                        .HasColumnType("TEXT");

                    b.Property<string>("Brend")
                        .HasColumnType("TEXT");

                    b.Property<long>("Cena")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Ime")
                        .HasColumnType("TEXT");

                    b.Property<string>("KolicinaNaStanju")
                        .HasColumnType("TEXT");

                    b.Property<string>("Opis")
                        .HasColumnType("TEXT");

                    b.Property<string>("PictureUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("Tip")
                        .HasColumnType("TEXT");

                    b.Property<string>("Velicina")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Proizvodi");
                });
#pragma warning restore 612, 618
        }
    }
}
