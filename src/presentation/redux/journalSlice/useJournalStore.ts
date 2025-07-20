import { JournalDatasource, JournalRepository } from "../../../data";
import { CreateJournalDto, Journal, UpdateJournalDto } from "../../../domain";
import { fileUpload } from "../../helpers/fileUpload";
import { useAppDispatch } from "../reduxHooks";
import {
  createJournal,
  deleteJournal,
  setActiveJournal,
  setErrorMessage,
  setIsLoading,
  setJournals,
  updateJournal,
} from "./journalSlice";

const journalDatasource = new JournalDatasource();
const journalRepository = new JournalRepository(journalDatasource);

export const useJournalStore = () => {
  const dispatch = useAppDispatch();

  let photoUrls;

  function customSetTimeOut() {
    setTimeout(() => {
      dispatch(dispatch(setErrorMessage(null)));
    }, 3000);
  }

  const onUploadImagens = async (files: FileList) => {

    dispatch(setIsLoading(true));

    const filesUploadPromises = [];

    for (const file of files) {
      filesUploadPromises.push(fileUpload(file));
    }

    // hace peticiones simultaneas, o sea una peticion al mismo tiempo que la utra
    photoUrls = await Promise.all(filesUploadPromises);

    dispatch(setIsLoading(false));

    return photoUrls;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCreateJournal = async (object: { [key: string]: any }) => {

    const [error, journalDto] = CreateJournalDto.create(object);

    if (error) {
      
      dispatch(setIsLoading(false));

      dispatch(setErrorMessage(error));

      customSetTimeOut();

      return;
    }

    const journal = await journalRepository.createJournal(journalDto!);

    dispatch(createJournal(journal));
  };

  const onGetJournals = async (object: { [key: string]: string }) => {
    const { idUser, data } = object;

    dispatch(setIsLoading(true));

    const journals = await journalRepository.getJournals({ idUser, data });
    dispatch(setJournals(journals));
  };

  const onUpdateJournal = async (journal: Journal) => {
    dispatch(setIsLoading(true));
    const [error, journalDto] = UpdateJournalDto.create({ ...journal });

    if (error) {
      dispatch(setIsLoading(false));

      dispatch(setErrorMessage(error));

      customSetTimeOut();

      return;
    }

    const journalUpdated = await journalRepository.updateJournal(journalDto!);

    dispatch(updateJournal(journalUpdated));
  };

  const onSetActiveJournal = (journal: (Journal | null)) => {
    dispatch(setActiveJournal(journal));
  };

  const onDeleteJournal = async (id: string) => {
    dispatch(setIsLoading(true));
    const Journal = await journalRepository.deleteJournal(id);
    dispatch(deleteJournal(Journal));
  };

  return {
    onCreateJournal,
    onGetJournals,
    onUpdateJournal,
    onSetActiveJournal,
    onDeleteJournal,
    onUploadImagens
  };
};
