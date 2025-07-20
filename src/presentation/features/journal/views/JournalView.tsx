import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useAppSelector } from "../../../redux/reduxHooks";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const JournalView = () => {
  const journal = useAppSelector((state) => state.journal.active);

  /* useEffect(() => {
        onGetJournal(id);
      }, []);
 */

  return (
    <>
      <Toolbar>
        <Typography sx={{ mr: 2 }}>{journal!.createdAt}</Typography>
        <Typography sx={{ mr: 2 }}>{journal!.title}</Typography>
        <Typography sx={{ mr: 2 }}>{journal!.description}</Typography>
        <Typography sx={{ mr: 2 }}>{journal!.idClient}</Typography>
      </Toolbar>
      <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
        {journal!.imageUrls.map((image) => (
          <ImageListItem key={image} sx={{ mt: 1 }}>
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Imagen de la nota"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
