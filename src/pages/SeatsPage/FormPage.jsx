import styled from "styled-components";

export default function FormPage({ setName, setCpf, formSeats, name, cpf }) {

    return (
      <FormContainer>
        <form onSubmit={formSeats}>

          <label htmlFor="name">Nome do Comprador:</label>

          <input
            data-test="client-name"
            placeholder="Digite seu nome..."
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <label htmlFor="cpf">CPF do Comprador:</label>

          <input
            data-test="client-cpf"
            placeholder="Digite seu CPF..."
            id="cpf"
            type="text"
            pattern="\d{11}"
            required
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
     
            <button data-test="book-seat-btn" type="submit">
              Reservar Assento(s)
            </button>
          
        </form>
      </FormContainer>
    );
  }

  const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;

        &:hover{
            cursor: pointer;
            background-color: lightblue;
        }
    }

    input {
        width: calc(100vw - 60px);

        &:hover{
            cursor: pointer;
            background-color: lightblue;
        }
    }

    label {
        text-align: left;
        display: flex;
        align-items: center;
      }
`