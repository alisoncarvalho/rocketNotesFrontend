import {FiPlus , FiSearch} from "react-icons/fi"
import { Container , Brand , Menu , Search , Content, NewNote} from "./styles"
import {Header} from "../../components/Header"
import {ButtonText} from "../../components/ButtonText"
import { Input } from "../../components/Input"
import { Section } from "../../components/Section"
import { Note } from "../../components/Note"
import { useState , useEffect } from "react"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"


export function Home(){
    const [tags , setTags] = useState([])
    const [tagsSelected , setTagsSelected] = useState([])
    const [search , setSearch] = useState("")
    const [ notes , setNotes] = useState([])

    const navigate = useNavigate();

    
    function selectAllTags(){
        return setTagsSelected([])
    }

    function handleDetails(id){
        navigate(`/details/${id}`)
    }


    function handleTagSelected(tagName){
        

        if(tagName === "todos"){
            return setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName)

        

        if(alreadySelected){
            const filteredTags = tagsSelected.filter(tag=> tag!==tagName)
            setTagsSelected(filteredTags)
            
        } else{
            setTagsSelected(prevState => [...prevState ,tagName])
            }


        
    }

    useEffect(()=> {
        async function fetchTags(){
            const response = await api.get("/tags")
            setTags(response.data)
        }

        fetchTags();
    
    } , [])

    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes( response.data)
        }

        fetchNotes()

    }, [tagsSelected , search])

    
    return(
        <Container>
            <Brand>
            <h1>RocketNotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos"
                        onClick={()=> handleTagSelected("todos")} 
                        isActived={tagsSelected.length === 0}/>

                </li>
                
            {
                tags && tags.map(tag =>(
                    <li>
                        <ButtonText
                            key={String(tag.id)}
                            
                            title={tag.name}
                            onClick={()=>handleTagSelected(tag.name)}
                            isActived={tagsSelected.includes(tag.name)}
                        />
                    </li>
                ))
            }

            </Menu>

            <Search>
                <Input
                    placeholder="Pesquisar pelo título" 
                    icon={FiSearch} 
                    onClick={selectAllTags}
                    onChange={(e)=> setSearch(e.target.value) }
                    />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map( (note) => 
                        <Note key={note.id} data={note}
                        onClick={() => handleDetails(note.id)}
                        />
                        )
                    }
                </Section>
            </Content>

            <NewNote to="/New">
                <FiPlus/>
                Criar nota
            </NewNote>
        </Container>
    );
}