import { useDispatch } from "react-redux"
import { ClientFirebaseDatasource, ClientRepository } from "../../../data";
import { CreateClientDto, UpdateClientDto } from "../../../domain";
import { deleteClient, setActiveClient, setClients, setLoadingClient, setMessage, setUpdateClient} from "./clientSlice";
import type { Client } from "../../../domain/entities/client";


const clientDatasource = new ClientFirebaseDatasource();
const clientRepository = new ClientRepository(clientDatasource);

export const useClientStore = () => {
  
    const dispatch = useDispatch();

    const onCreateClient = async (formData: {[key: string]: string}) => {

        dispatch(setLoadingClient(true));

        const [error, clientDto] = CreateClientDto.create(formData);

        if(error) {
            dispatch(setMessage(error));
            setTimeout(()=>{
                dispatch(setMessage(null));
            }, 3000);
            return;
        }

        await clientRepository.create(clientDto!);

        dispatch(setLoadingClient(false));
        //dispatch(setActiveClient(newClient));
    }

    const onUpdateClient = async (formData: {[key: string]: string}) => {

        dispatch(setLoadingClient(true));

        const [error, updateClientDto] = UpdateClientDto.create(formData);

        if(error) {
            dispatch(setMessage(error));
            return;
        } 

        const client = await clientRepository.update(updateClientDto!);

       dispatch(setUpdateClient(client));
    
    }

    const onActiveClient = (client: Client) => {

        dispatch(setActiveClient(client));
        
    }

    const onGetClients = async ()=>{

        dispatch(setLoadingClient(true));

        const clients = await clientRepository.getClients();

        dispatch(setClients(clients));
    }

    const onDeleteClient = async (client: Client) => {

        dispatch(setLoadingClient(true));

        await clientRepository.delete(client.id);

        dispatch(deleteClient(client));

    }


    return {
        onCreateClient,
        onGetClients,
        onUpdateClient,
        onActiveClient,
        onDeleteClient
    }
}
