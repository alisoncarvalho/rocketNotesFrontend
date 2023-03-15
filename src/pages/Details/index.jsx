import { Container , Links , Content} from "./styles"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { useParams , useNavigate } from "react-router-dom"
import { useEffect , useState } from "react"
import { api } from "../../services/api"

export function Details() {
  const [data , setData] = useState(null)

  const params = useParams();

  const navigate = useNavigate()

  function handleBack(){
    return navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm("Realmente deseja excluir esta nota?")

    if(confirm){
      await api.delete(`/notes/${params.id}`)
      handleBack()
    }
  }

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNotes()
  }, [])
 

  return (
    <Container>
      <Header/>

      {
        data && 
        <main>
        <Content>

        
          <ButtonText 
          title="Excluir nota"
          onClick={handleRemove}
          />

          <h1>{data.title}</h1>

          <p>{data.description}</p>

          {
            data.links && 
            <Section title="Links Úteis">
              <Links>
              { 
              data.links.map(link => (
              <li key={String(link.id)}><a href="link.url" target="_blank">{link.url}</a></li>
              ))
              }
              </Links>
          
            </Section>
          }

          {
            data.tags &&
            <Section title= "Marcadores">
              {
                data.tags.map(tag => (
                <Tag key={String(tag.id)} title={tag.name}/>
                ))
              }
            </Section>
          }

          <Button title="Voltar" onPress={handleBack}/>

        </Content>
        </main>
      }
      
    </Container>
  )
}