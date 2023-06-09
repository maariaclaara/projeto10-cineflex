import styled from "styled-components"
import { Link } from "react-router-dom";

export default function SuccessPage({ data }) {

    const { name, cpf, seats, selected } = data;

  
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <div data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{seats.movie.title}</p>
                <p>{seats.day.date} - {seats.name}</p>
                </div>
            </TextContainer>

            <TextContainer>
                <div data-test="seats-info">
                <strong><p>Ingressos</p></strong>

                {selected.map((e) => (
                <p key={e.id}>Assento {e.name}</p>
                
        ))}
                </div>
            </TextContainer>

            <TextContainer>
                <div data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
                </div>
            </TextContainer>

            <Link to="/">
                <button data-test="go-home-btn">Voltar para Home</button>
            </Link>
            
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    
    button {
        margin-top: 50px;

        &:hover{
            cursor: pointer;
            background-color: lightblue;
        }
    }

    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`