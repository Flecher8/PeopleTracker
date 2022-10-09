using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Data
{
    public partial class DBAtarkProjectContext : DbContext
    {
        public DBAtarkProjectContext()
        {
        }

        public DBAtarkProjectContext(DbContextOptions<DBAtarkProjectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Action> Actions { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Placement> Placements { get; set; } = null!;
        public virtual DbSet<Room> Rooms { get; set; } = null!;
        public virtual DbSet<Sensor> Sensors { get; set; } = null!;
        public virtual DbSet<SmartDevice> SmartDevices { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UsersSubscription> UsersSubscriptions { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=Desktop;Initial Catalog=DBAtarkProject;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Action>(entity =>
            {
                entity.Property(e => e.DateTime).HasColumnType("datetime");

                entity.HasOne(d => d.Placement)
                    .WithMany(p => p.Actions)
                    .HasForeignKey(d => d.PlacementId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Actions_Placements");

                entity.HasOne(d => d.RoomIn)
                    .WithMany(p => p.ActionRoomIns)
                    .HasForeignKey(d => d.RoomInId)
                    .HasConstraintName("FK_Actions_RoomInId_Rooms_Id");

                entity.HasOne(d => d.RoomOut)
                    .WithMany(p => p.ActionRoomOuts)
                    .HasForeignKey(d => d.RoomOutId)
                    .HasConstraintName("FK_Actions_RoomOutId_Rooms_Id");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(150);

                entity.Property(e => e.ReceivedMoneyAmount).HasColumnType("smallmoney");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Payments_Users");
            });

            modelBuilder.Entity<Placement>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Placements)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Placements_Users");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.Property(e => e.IsExit).HasColumnName("isExit");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.Placement)
                    .WithMany(p => p.Rooms)
                    .HasForeignKey(d => d.PlacementId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rooms_Placements");
            });

            modelBuilder.Entity<Sensor>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.LeftRoom)
                    .WithMany(p => p.SensorLeftRooms)
                    .HasForeignKey(d => d.LeftRoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sensors_LeftRoomId_Rooms_Id");

                entity.HasOne(d => d.RightRoom)
                    .WithMany(p => p.SensorRightRooms)
                    .HasForeignKey(d => d.RightRoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sensors_RightRoomId_Rooms_Id");
            });

            modelBuilder.Entity<SmartDevice>(entity =>
            {
                entity.HasOne(d => d.Placement)
                    .WithMany(p => p.SmartDevices)
                    .HasForeignKey(d => d.PlacementId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SmartDevices_Placements");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SmartDevices)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SmartDevices_Users");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.CompanyName).HasMaxLength(50);

                entity.Property(e => e.Email).HasMaxLength(150);

                entity.Property(e => e.Login).HasMaxLength(50);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.Type).HasMaxLength(50);
            });

            modelBuilder.Entity<UsersSubscription>(entity =>
            {
                entity.Property(e => e.EndDateTime).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersSubscriptions)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersSubscriptions_Users");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
