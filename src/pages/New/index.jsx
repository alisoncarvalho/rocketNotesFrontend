import { Container , Form } from "./styles";
import { Header } from "../../components/Header"
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { TextArea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../../components/Button";
import { Tag } from "../../components/Tag";
import {Link} from 'react-router-dom'
import { useState  } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ButtonText } from "../../components/ButtonText";
import { useAuth } from "../../hooks/auth";

export function New(){
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")

    const [links , setLinks] = useState([])
    const [newLink , setNewLink] = useState("")

    const [tags , setTags] = useState([])
    const [newTag , setNewTag] = useState("")

    const navigate = useNavigate();
    const {sendNewNOte} = useAuth()

    function handleAddLink(){
        setLinks(prevState => [...prevState , newLink])
        setNewLink("")
    }

    function handleBack(){
        return navigate(-1)
      }

    function handleAddTag(){
        
        setTags(prevState => [...prevState , newTag])
        setNewTag("")
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(link => link!==deleted))
    }

    async function handleNewNote(){
        if(!title){
            return alert("digite o titúlo da nota")
        }
        if(newLink){
            return alert("Você deixou um link não salvo")
        }
        if(newTag){
           return alert("Você deixou uma tag não salva")
        }


        await sendNewNOte(title , description , links , tags
        );

        alert("Nota criada com sucesso")
        navigate(-1)
    }




    return (
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        
                        <ButtonText title="Voltar"
                        onClick={handleBack}
                        />
                    </header>

                    <Input
                        placeholder="Título"
                        onChange={e =>setTitle(e.target.value)}
                        />
                    <TextArea
                        placeholder="Observações"
                        onChange={e =>setDescription(e.target.value)}
                        />

                    <Section  title="Links Úteis">
                        {
                            links.map((link , index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={link} 
                                    onClick={()=>handleRemoveLink(link)}
                                />
                            ))
                        }

                        <NoteItem
                            isNew 
                            placeholder="Novo link" 
                            value={newLink} 
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>
                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map(( tag , index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={()=> handleRemoveTag(tag)}
                                    />
                                ))
                                
                            }
                            <NoteItem
                                isNew
                                placeholder="Nova tag" 
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                                />
                        </div>
                    </Section>
                    <Button title="Salvar" onPress={handleNewNote}/>
                    
                </Form>
                

            </main>

        </Container>
    )
}