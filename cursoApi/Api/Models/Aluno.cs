using System.ComponentModel.DataAnnotations;

namespace cursoApi.Models

{
    public class Aluno
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string Nome { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(80)]
        public string Email { get; set; }
        [Required]

        public int Idade { get; set; }
    }
}
