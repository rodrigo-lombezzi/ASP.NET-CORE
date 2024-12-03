using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using cursoApi.Controllers;
using cursoApi.Models;
using cursoApi.Servives;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace cursoApi.Tests
{
    public class AlunosControllerTests
    {
        [Fact]
        public async Task GetAlunos_ReturnsOkResult()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            var mockAlunos = new List<Aluno>
            {
                new Aluno { Id = 1, Nome = "Lisa", Email = "lisa@example.com", Idade = 26 },
            };
            mockService.Setup(service => service.GetAlunos()).ReturnsAsync(mockAlunos);

            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.GetAlunos();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var alunos = Assert.IsAssignableFrom<IEnumerable<Aluno>>(okResult.Value);
            Assert.Equal(1, alunos.Count());
        }

        [Fact]
        public async Task GetAluno_ReturnNotFoundResult()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            mockService.Setup(service => service.GetAluno(It.IsAny<int>())).ReturnsAsync((Aluno)null);

            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.GetAluno(1);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("Não existe aluno com o id {id}", notFoundResult.Value); 
        }

        [Fact]
        public async Task GetAluno_ReturnsOkResult()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            var mockAluno = new Aluno 
            { 
                Id = 1, Nome = "Sara", Email = "sara@example.com", Idade = 27 
            };
            mockService.Setup(service => service.GetAluno(It.IsAny<int>())).ReturnsAsync(mockAluno); 

            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.GetAluno(1); 

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result); 
            var aluno = Assert.IsType<Aluno>(okResult.Value); 
            Assert.Equal("Sara", aluno.Nome);
        }
     

        [Fact]
        public async Task Create_ReturnsCreatedAtRoute()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            var mockAluno = new Aluno 
            { 
                Id = 1, Nome = "Lisa", Email = "lisa@example.com", Idade = 26 
            };

            mockService.Setup(service => service.CreateAluno(It.IsAny<Aluno>())).Returns(Task.CompletedTask); 

            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.Create(mockAluno);

            // Assert
            var createdResult = Assert.IsType<CreatedAtRouteResult>(result);
            Assert.Equal(mockAluno, createdResult.Value); 
        }

        [Fact]
        public async Task CreateAluno_ReturnsBadRequest_WhenModelIsInvalid()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.Create(null);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Request inválida", badRequestResult.Value); 
        }

        [Fact]
        public async Task Edit_ReturnsOkResult()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            var aluno = new Aluno 
            { 
                Id = 1, Nome = "Emilie", Email = "emilie@example.com", Idade = 29 
            };

            mockService.Setup(service => service.UpdateAluno(It.IsAny<Aluno>())).Returns(Task.CompletedTask);

            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.Edit(1, aluno);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("aluno alterado com successo id=1", okResult.Value);
        }
        [Fact]
        public async Task Edit_ReturnsBadRequest()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            var aluno = new Aluno 
            { 
                Id = 2, Nome = "Sara", Email = "sara@example.com", Idade = 27 
            };

            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.Edit(1, aluno);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Dados inconsistentes", badRequestResult.Value);
        }


        [Fact]
        public async Task Delete_ReturnsOkResult()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            var aluno = new Aluno 
            { 
                Id = 1, Nome = "", Email = "nilou@example.com", Idade = 19 
            };

            mockService.Setup(service => service.GetAluno(It.IsAny<int>())).ReturnsAsync(aluno);
            mockService.Setup(service => service.DeleteAluno(It.IsAny<Aluno>())).Returns(Task.CompletedTask);

            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.Delete(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Aluno com id=1 foi excluido com sucesso", okResult.Value);
        }
        [Fact]
        public async Task Delete_ReturnsNotFound()
        {
            // Arrange
            var mockService = new Mock<IAlunoService>();
            mockService.Setup(service => service.GetAluno(It.IsAny<int>())).ReturnsAsync((Aluno)null);

            var controller = new AlunosController(mockService.Object);

            // Act
            var result = await controller.Delete(999);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("aluno com id=999 não foi encontrado", notFoundResult.Value);
        }
    }
}
