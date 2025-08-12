import Grid from "@mui/material/Grid";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useGetRegistersQuery } from "../../../redux/services/registerApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useHandledError } from "../../../hooks/useHandledError";
import { Checking } from "../../../shared/components/Checking";
import { useEffect, useState } from "react";

const titles = ["Date", "Time", "Lat", "Long"];

export const RegisterSearchView = () => {

  const params = new URLSearchParams(location.search);
  const idUser = params.get("idUser") ? (params.get("idUser") as string) : "";
  //const date = params.get("data") ? (params.get("data") as string) : "";

  const { data, isError, isSuccess, isLoading, error } = useGetRegistersQuery({
    idUser,
  });

  const { handledError, errorMessage } = useHandledError();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isError) {
      const typeError = error as FetchBaseQueryError;
      handledError({ error: typeError });
    }
  }, [isError]);

  return (
    <Grid>
      {isLoading ? <Checking /> : null}

      {isSuccess ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {titles.map((title) => (
                    <TableCell key={title} align="center">
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((register) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={register.id}
                      >
                        <TableCell align="center">
                          {register.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(register.createdAt).toLocaleTimeString(
                            "en-US"
                          )}
                        </TableCell>
                        <TableCell align="center">{register.lat}</TableCell>
                        <TableCell align="center">{register.long}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data!.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : null}

      {isError && errorMessage.length > 2 ? (
        <Grid sx={{ mt: 2 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
      ) : null}
    </Grid>
  );
};
