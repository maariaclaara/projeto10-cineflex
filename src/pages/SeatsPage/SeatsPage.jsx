import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Loading from "../../components/Loading";
import FormPage from "./FormPage";


export default function SeatsPage({ setData }) {

    const [seats, setSeats] = useState([]);
    const [selected, setSelected] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const {idSession} = useParams();
    const changePage = useNavigate();
    

    useEffect( () => {

        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`;
        const promiseSeats = axios.get(URL);
        
        promiseSeats.then(response => {
            setSeats(response.data)
        })
        
        promiseSeats.catch(error => {
            setSeats(error.response.data)
        })

    }, [idSession]);



    if (seats.length === 0){
        return (
            <Loading />
        )
    }


    function selectSeats(seats){

        if (seats.isAvailable === false){
            alert("Esse assento não está disponível!");

    } else if (!selected.includes(seats)){
        const newArray = [...selected, seats];
        setSelected(newArray);

    } else {
        const newFilter = selected.filter( (seat) => !(seat.id === seats.id) );
        setSelected([...newFilter]);
    }
}


function formSeats(e) {

    e.preventDefault();

    if (selected.length === 0) {
      alert("Por favor, selecione um assento!");
      return;
    }

    const sucessPage = { ids: selected.map((e) => e.id), name, cpf };
    const URL = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
    const promiseSucess = axios.post(URL, sucessPage);

    promiseSucess.then((response) => {
      const data = { name, cpf, seats, selected };
      setData(data);
      changePage("/sucesso");
    });

    promiseSucess.catch((error) =>
      console.log(error.response.data.message)
    );
  }


    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer >
                {seats.seats.map((seats) => ( 

                    <SeatItem
                    key={seats.id}
                    data-test="seat"
                    onClick={() => selectSeats(seats)}
                    changeColor={
                        selected.includes(seats)
                        ?'#1AAE9E'
                        :(!seats.isAvailable ?  '#FBE192' :  '#C3CFD9')
                    }
                    borderColor={
                        selected.includes(seats)
                        ?'#0E7D71'
                        :(!seats.isAvailable ? '#F7C52B' : '#7B8B99')
                    }>
                        {seats.name}

                    </SeatItem> 
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color="#1AAE9E" border="#0E7D71" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#C3CFD9" border="#7B8B99"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#FBE192" border="#F7C52B" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormPage setName={setName} setCpf={setCpf} formSeats={formSeats}/>

            <FooterContainer>
                <div data-test="footer">
                    <img src={seats.movie.posterURL} alt={seats.movie.title} />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday} - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(props) => props.border};         
    background-color: ${(props) => props.color};    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${(props) => props.borderColor};
    background-color: ${(props) => props.changeColor};  
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

    &:hover{
        cursor: pointer;
        background-color: lightblue;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`