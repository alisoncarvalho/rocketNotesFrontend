import { Container , Form , Avatar} from "./styles";
import { Input } from "../../components/Input";
import {FiLogIn , FiMail , FiLock , FiUser , FiArrowLeft , FiCamera} from "react-icons/fi"
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { api } from "../../services/api";
import { ButtonText } from "../../components/ButtonText";
import { useNavigate } from "react-router-dom";


export function Profile(){
    const {user , updateProfile} = useAuth(); 
    const navigate = useNavigate()

    const [name , setName] = useState(user.name);
    const [email , setEmail] = useState(user.email);    
    const [ passwordOld, setPasswordOld] = useState();
    const [ passwordNew , setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}`: avatarPlaceholder 
    const [avatar , setAvatar] = useState(avatarUrl);
    const [avatarFile , setAvatarFile] = useState(null);


    async function handleUpdate(){
        const updated = {
          name,email, password :passwordNew, old_password:passwordOld 
        }
        const userUpdated = Object.assign(user , updated )
        await updateProfile({user: userUpdated , avatarFile});
    } 

    function handleBack(){
        return navigate(-1)
      }
    

    function handleChangeAvatar(e){
        const file = e.target.files[0];
        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview)
    }



    return(
        <Container>
            <header>
                
                <ButtonText title={<FiArrowLeft/>} onClick={handleBack}/>
            </header>
            <Form>
                <Avatar>
                    <img src={avatar} alt="Foto do usuário" />
                    <label htmlFor="avatar">
                        <FiCamera/>
                        <input id="avatar" type="file" onChange={handleChangeAvatar}/>
                    </label>
                </Avatar>
                <Input placeholder="Name" type="text" icon={FiUser} value= {name} onChange = {e => setName(e.target.value)}/>
                <Input placeholder="E-mail" type="text" icon={FiMail} value = {email} onChange = {e => setEmail(e.target.value)}/>
                <Input placeholder="Senha atual" type="password" icon={FiLock} onChange = {e => setPasswordOld(e.target.value)}/>
                <Input placeholder="Nova senha" type="password" icon={FiLock} onChange = {e => setPasswordNew(e.target.value)}/>
                <Button title="Salvar" onPress={handleUpdate} />
            </Form>
            
        </Container>
    );
}